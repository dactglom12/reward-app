import { FlippableCard } from "@components/FlippableCard";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Word } from "@typings/word";
import React, { useState } from "react";
import { VolumeUp } from "@mui/icons-material";
import { Colors } from "constants/styles";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { WordsApi } from "@api/wordsApi";
import EditIcon from "@mui/icons-material/Edit";

interface WordCardProps {
  word: Word;
  onGuessChoice: (word: Word, isRightGuess: boolean) => void;
  onWordUpdate: (updatedWord: Word) => void;
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

export const WordCard: React.FC<WordCardProps> = ({
  word,
  onGuessChoice,
  onWordUpdate,
}) => {
  const [isRightGuess, setIsRightGuess] = useState<boolean>();
  const {
    isOpen: isSuggestionsDialogOpen,
    handleOpen,
    handleClose,
  } = useOpenCloseToggle();
  const [updatedTranslation, setUpdatedTranslation] = useState("");

  const handleSoundClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    const audio = new Audio(`data:audio/ogg;base64,${word.audio}`);
    audio.currentTime = 0;
    audio.play().catch((error) => {
      alert(`Error playing audio: ${error} ${error.message}`);
      console.error("Error playing audio:", error);
    });
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
  const closeDialog = () => {
    setUpdatedTranslation("");
    handleClose();
  };
  const onEditButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    handleOpen();
  };

  const updateWord = async () => {
    try {
      const response = await WordsApi.updateWord({
        _id: word._id,
        translation: updatedTranslation,
      });

      onWordUpdate(response.data.word);
      closeDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const onTranslationTextFieldChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setUpdatedTranslation(event.target.value);
  };

  return (
    <>
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
              <Button
                startIcon={<EditIcon sx={{ width: 24, height: 24 }} />}
                variant="contained"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  ".MuiButton-icon": {
                    marginRight: 0,
                  },
                  width: "48px",
                  height: "48px",
                  borderRadius: "48px",
                  padding: 0,
                  minWidth: "unset",
                }}
                onClick={onEditButtonClick}
              />
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
      <Dialog
        maxWidth="xs"
        fullWidth
        open={isSuggestionsDialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle>Suggest a change</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Suggested translation..."
            value={updatedTranslation}
            onChange={onTranslationTextFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            disabled={updatedTranslation.length === 0}
            onClick={updateWord}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
