import { WordsApi } from "@api/wordsApi";
import { UploadButton } from "@components/UploadButton";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { sortGroups } from "./utils";
import { WordGroupChartsSection } from "./WordGroupChartsSection";
import { WordGroup } from "@typings/word";
import { randomWordAmountOptions } from "./constants";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";

interface WordGroupChoiceProps {
  chooseRandom: () => void;
  onUploadSuccess: () => void;
  onRandomWordsSelectChange: (event: SelectChangeEvent) => void;
  chooseGroup: (group: WordGroup) => void;
  groups: WordGroup[];
  randomModeWordsAmount: number;
}

export const WordGroupChoice: React.FC<WordGroupChoiceProps> = ({
  chooseGroup,
  chooseRandom,
  onRandomWordsSelectChange,
  onUploadSuccess,
  randomModeWordsAmount,
  groups,
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const {
    isOpen: isRandomModeDialogOpen,
    handleClose,
    handleOpen,
  } = useOpenCloseToggle();

  return (
    <Container>
      <Grid mb={2} container spacing={isMobile ? 2 : 0}>
        <Grid item md={11} xs={6}>
          <Typography variant={isMobile ? "h5" : "h4"}>
            Choose word group
          </Typography>
        </Grid>
        <Grid item md={1} xs={6} justifyContent="flex-end" display="flex">
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
        </Grid>
      </Grid>
      <Grid spacing={2} container>
        <Grid container item xs={12}>
          <Button
            onClick={handleOpen}
            fullWidth={isMobile}
            variant="contained"
            color="warning"
          >
            Random
          </Button>
        </Grid>
        {sortGroups(groups).map((group) => (
          <Grid xs={12} md={6} item key={group._id}>
            <Button
              variant="contained"
              fullWidth={isMobile}
              onClick={() => chooseGroup(group)}
            >
              {group.title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid mt={5} item xs={12}>
        {groups.length > 0 && <WordGroupChartsSection wordGroups={groups} />}
      </Grid>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={isRandomModeDialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: 2,
          },
        }}
      >
        <DialogTitle>Random mode configuration</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 2 }} fullWidth>
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={chooseRandom}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
