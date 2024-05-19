import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  SelectChangeEvent,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WordsApi } from "@api/wordsApi";
import { Word, WordGroup, WordTrainingSession } from "@typings/word";
import { WordCard } from "./WordCard";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Keyboard } from "swiper/modules";
import { KeyboardBackspace } from "@mui/icons-material";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { randomWordAmountOptions } from "./constants";
import { WordGroupChoice } from "./WordGroupChoice";

const TopContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const SceneContainer = styled(Box)({
  marginTop: "200px",
});

const LoaderContentContainer = styled(Container)({
  minHeight: "90vh",
  height: "100%",
});

const LoaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const WordsRevisionPage: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordGroup, setWordGroup] = useState<WordGroup>();
  const [groups, setGroups] = useState<WordGroup[]>([]);
  const [isWordsLoading, setIsWordsLoading] = useState(false);
  const {
    handleClose,
    handleOpen,
    isOpen: isGroupFinishPopupOpen,
  } = useOpenCloseToggle();
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [randomModeWordsAmount, setRandomModeWordsAmount] = useState<number>(
    randomWordAmountOptions[0]
  );
  const [trainingSessionHash, setTrainingSessionHash] = useState<
    Record<string, boolean>
  >({});
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  const correctWords = useMemo(
    () =>
      words
        .map((word) => {
          if (typeof trainingSessionHash[word._id] === "undefined")
            return false;

          return trainingSessionHash[word._id];
        })
        .filter((val) => val),
    [trainingSessionHash, words]
  );

  const loadWordGroups = async () => {
    const groupsResponse = await WordsApi.getAllWordGroups();

    setGroups(groupsResponse.data.groups);
  };

  useEffect(() => {
    void loadWordGroups();
  }, []);

  useEffect(() => {
    if (!wordGroup && !isRandomMode) return;

    const loadWords = async () => {
      try {
        setIsWordsLoading(true);

        const payload = isRandomMode
          ? { isRandom: true, amount: randomModeWordsAmount }
          : { group: wordGroup?.title };

        const wordsResponse = await WordsApi.getAll(payload);

        setWords(wordsResponse.data.words);
      } catch (error) {
        console.error(error);
      } finally {
        setIsWordsLoading(false);
      }
    };

    void loadWords();
  }, [wordGroup, isRandomMode, randomModeWordsAmount]);

  const onActiveIndexChange = (event: SwiperClass) => {
    setCurrentWordIndex(event.activeIndex);
  };

  const chooseGroup = (group: WordGroup) => {
    setWordGroup(group);
  };

  const onUploadSuccess = () => {
    loadWordGroups();
  };

  const resetPageState = () => {
    setWordGroup(undefined);
    setWords([]);
    setCurrentWordIndex(0);
    handleClose();
    setIsRandomMode(false);
    setRandomModeWordsAmount(randomWordAmountOptions[0]);
    setTrainingSessionHash({});
  };

  const onGuessChoice = useCallback(
    (word: Word, isRightGuess: boolean) => {
      setTrainingSessionHash((currentHash) => {
        const updatedHash = {
          ...currentHash,
          [word._id]: isRightGuess,
        };

        if (Object.keys(updatedHash).length === words.length) {
          handleOpen();
        }

        return updatedHash;
      });
    },
    [handleOpen, words]
  );

  const onSessionFinish = async () => {
    if (isRandomMode) return resetPageState();
    if (!wordGroup) return;

    try {
      const trainingSession: Pick<
        WordTrainingSession,
        "correctAnswersCount" | "wordsCount" | "group"
      > = {
        group: wordGroup,
        correctAnswersCount: correctWords.length,
        wordsCount: words.length,
      };

      await WordsApi.recordSession(trainingSession);

      resetPageState();
    } catch (error) {
      console.error(error);
    }
  };

  const chooseRandom = () => setIsRandomMode(true);

  const onRandomWordsSelectChange = (event: SelectChangeEvent) => {
    setRandomModeWordsAmount(Number(event.target.value));
  };

  if (!wordGroup && !isRandomMode)
    return (
      <WordGroupChoice
        chooseGroup={chooseGroup}
        chooseRandom={chooseRandom}
        groups={groups}
        onRandomWordsSelectChange={onRandomWordsSelectChange}
        onUploadSuccess={onUploadSuccess}
        randomModeWordsAmount={randomModeWordsAmount}
      />
    );

  if (isWordsLoading)
    return (
      <LoaderContentContainer>
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      </LoaderContentContainer>
    );

  return (
    <Container>
      <TopContainer>
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardBackspace />}
          onClick={resetPageState}
        >
          Back
        </Button>
      </TopContainer>
      <SceneContainer>
        <Swiper
          grabCursor
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={isMobile ? 50 : 30}
          centeredSlides
          autoHeight
          initialSlide={currentWordIndex}
          navigation={!isMobile}
          keyboard
          modules={[Navigation, Keyboard]}
          onActiveIndexChange={onActiveIndexChange}
        >
          {words.map((word) => (
            <SwiperSlide key={word._id}>
              {() => {
                return <WordCard word={word} onGuessChoice={onGuessChoice} />;
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </SceneContainer>
      <Dialog open={isGroupFinishPopupOpen}>
        <DialogContent>
          <Typography variant="h6">Congratulations!</Typography>
          {wordGroup && (
            <Typography variant="body1">
              You have successfully finished the following topic -{" "}
              {wordGroup.title}
            </Typography>
          )}
          {!wordGroup && (
            <Typography variant="body1">
              You have successfully finished this random set
            </Typography>
          )}
          <Typography variant="body2">
            You got
            <Typography
              component="span"
              fontWeight="bold"
              variant="caption"
              mx={2}
            >
              {correctWords.length}/{words.length}
            </Typography>{" "}
            right
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSessionFinish} variant="contained" color="primary">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
