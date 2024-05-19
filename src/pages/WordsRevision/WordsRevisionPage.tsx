import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WordsApi } from "@api/wordsApi";
import { Word, WordGroup, WordTrainingSession } from "@typings/word";
import { UploadButton } from "@components/UploadButton";
import { WordCard } from "./WordCard";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Keyboard } from "swiper/modules";
import { KeyboardBackspace } from "@mui/icons-material";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { WordGroupChartsSection } from "./WordGroupChartsSection";
import { sortGroups } from "./utils";

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

const randomWordAmountOptions = [10, 15, 20, 25];

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
      <Container>
        <TopContainer>
          <Typography variant="h4">Choose word group</Typography>
          <UploadButton
            inputProps={{
              name: "words_csv",
              id: "file-input",
              accept: ".csv",
            }}
            uploadRequest={(files, onUploadProgress, onDownloadProgress) =>
              WordsApi.uploadWords(
                files[0],
                onUploadProgress,
                onDownloadProgress
              )
            }
            onUploadSuccess={onUploadSuccess}
          />
        </TopContainer>
        <Grid spacing={2} container>
          <Grid container item xs={12} alignItems="flex-end">
            <Grid item xs={2}>
              <Button
                onClick={chooseRandom}
                variant="contained"
                color="warning"
              >
                Random
              </Button>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="random-amount-label">
                  How many random words
                </InputLabel>
                <Select
                  labelId="random-amount-label"
                  value={String(randomModeWordsAmount)}
                  onChange={onRandomWordsSelectChange}
                  label="How many random words"
                >
                  {randomWordAmountOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {sortGroups(groups).map((group) => (
            <Grid xs={12} md={6} item key={group._id}>
              <Button variant="contained" onClick={() => chooseGroup(group)}>
                {group.title}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid mt={5} item xs={12}>
          {groups.length > 0 && <WordGroupChartsSection wordGroups={groups} />}
        </Grid>
      </Container>
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
          spaceBetween={isMobile ? 10 : 30}
          centeredSlides
          autoHeight
          initialSlide={currentWordIndex}
          navigation
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
