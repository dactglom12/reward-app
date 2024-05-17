import { FlippableCard } from "@components/FlippableCard";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Word } from "@typings/word";
import React, { useMemo, useState } from "react";
import { VolumeUp } from "@mui/icons-material";
import { Colors } from "constants/styles";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface WordCardProps {
  word: Word;
  onGuessChoice: (word: Word, isRightGuess: boolean) => void;
}

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  backgroundImage:
    "url(https://media.istockphoto.com/id/1294801881/vector/english-language-seamless-pattern.jpg?s=612x612&w=0&k=20&c=p6iuaoZYHCEbgTPoCWjXYlrodt0E5ijhXCHJJKnZ2fA=)",
  backgroundSize: "cover",
  padding: theme.spacing(2),
  boxSizing: "border-box",
  transition: "transform 0.3s ease-in",
}));

const WordElement = styled(Typography)({
  fontStyle: "italic",
  marginRight: "8px",
});

const Image = styled("div")(({ theme }) => ({
  width: "100%",
  height: "60%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: theme.spacing(1),
  backgroundPosition: "top center",
}));

const TranslationInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

const TextContentInner = styled(TranslationInner)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 16px",
  backgroundColor: Colors.WHITE,
  borderRadius: theme.spacing(1),
  border: `2px solid ${Colors.DARK_BLUE}`,
  marginBottom: theme.spacing(1),
}));

const CardWrapper = styled(Box)({
  marginTop: "22.5px",
});

export const WordCard: React.FC<WordCardProps> = ({ word, onGuessChoice }) => {
  const [isRightGuess, setIsRightGuess] = useState<boolean>();

  const audio = useMemo(() => {
    return new Audio(`data:audio/ogg;base64,${word.audio}`);
  }, [word]);

  const handleSoundClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  };

  const isRight = () => typeof isRightGuess === "boolean" && isRightGuess;
  const isWrong = () => typeof isRightGuess === "boolean" && !isRightGuess;

  const makeWrong = () => {
    onGuessChoice(word, false);
    setIsRightGuess(false);
  };
  const makeRight = () => {
    onGuessChoice(word, true);
    setIsRightGuess(true);
  };

  return (
    <CardWrapper>
      <FlippableCard
        key={word._id}
        frontContent={
          <CardContent>
            <TextContentInner>
              <WordElement variant="h4">{word.translation}</WordElement>
            </TextContentInner>
          </CardContent>
        }
        backContent={
          <CardContent>
            <Image style={{ backgroundImage: `url(${word.image})` }} />
            <TextContentInner>
              <WordElement variant="h4">{word.native}</WordElement>
              <IconButton onClick={handleSoundClick}>
                <VolumeUp />
              </IconButton>
            </TextContentInner>
            <ButtonGroup onClick={(event) => event.stopPropagation()}>
              <Button
                color={isWrong() ? "error" : "info"}
                variant="contained"
                endIcon={<CloseIcon />}
                onClick={makeWrong}
              >
                Wrong
              </Button>
              <Button
                color={isRight() ? "success" : "info"}
                variant="contained"
                endIcon={<CheckIcon />}
                onClick={makeRight}
              >
                Right
              </Button>
            </ButtonGroup>
          </CardContent>
        }
      />
    </CardWrapper>
  );
};
