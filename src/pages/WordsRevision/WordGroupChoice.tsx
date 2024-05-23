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
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { sortGroups } from "./utils";
import { WordGroupChartsSection } from "./WordGroupChartsSection";
import { WordGroup } from "@typings/word";
import { randomWordAmountOptions } from "./constants";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { Title } from "@components/styled";
import { useRequest } from "@hooks/useRequest";

interface WordGroupChoiceProps {
  chooseRandom: () => void;
  onRandomWordsSelectChange: (event: SelectChangeEvent) => void;
  chooseGroup: (group: WordGroup) => void;
  randomModeWordsAmount: number;
}

const LOADING_BLOCKS_NUMBER = 12;

export const WordGroupChoice: React.FC<WordGroupChoiceProps> = ({
  chooseGroup,
  chooseRandom,
  onRandomWordsSelectChange,
  randomModeWordsAmount,
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const {
    isOpen: isRandomModeDialogOpen,
    handleClose,
    handleOpen,
  } = useOpenCloseToggle();
  const { sendRequest, data, error, isLoading } = useRequest(
    WordsApi.getAllWordGroups
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const onUploadSuccess = () => {
    sendRequest();
  };

  if (isLoading || !data)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item md={11} xs={10}>
            <Title>Select group</Title>
          </Grid>
          {new Array(LOADING_BLOCKS_NUMBER).fill(0).map((_, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Skeleton animation="wave" variant="rounded" height={40} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Skeleton animation="wave" variant="rounded" height={400} />
          </Grid>
        </Grid>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Typography variant="h5">Couldn't load word groups...</Typography>
        <Typography variant="body2">Please, reload page</Typography>
      </Container>
    );

  return (
    <Container>
      <Grid mb={2} container spacing={isMobile ? 2 : 0}>
        <Grid item md={11} xs={10}>
          <Title>Select group</Title>
        </Grid>
        <Grid
          item
          md={1}
          xs={2}
          justifyContent="flex-end"
          alignItems="center"
          display="flex"
        >
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
        {sortGroups(data.groups).map((group) => (
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
        {data.groups.length > 0 && (
          <WordGroupChartsSection wordGroups={data.groups} />
        )}
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
