import React, { InputHTMLAttributes, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AxiosProgressEvent } from "axios";

interface UploadButtonProps {
  uploadRequest: (
    files: FileList,
    onUploadProgress: (event: AxiosProgressEvent) => void,
    onDownloadProgress: (event: AxiosProgressEvent) => void
  ) => Promise<unknown>;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  onUploadSuccess: () => void;
}

const SNACKBAR_DURATION_MS = 3500;

export const UploadButton: React.FC<UploadButtonProps> = ({
  uploadRequest,
  inputProps,
  onUploadSuccess,
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const [requestProgress, setRequestProgress] = useState(0);
  const [uploadState, setUploadState] = useState<
    "idle" | "in-progress" | "success" | "failure"
  >("idle");
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [isFailureSnackbarOpen, setIsFailureSnackbarOpen] = useState(false);

  const closeSuccessSnackbar = () => setIsSuccessSnackbarOpen(false);
  const closeFailureSnackbar = () => setIsFailureSnackbarOpen(false);

  const handleUploadProgress = (event: AxiosProgressEvent) => {
    if (!event.total) return;

    // first half
    const percentCompleted = Math.round((event.loaded / event.total) * 50);

    setRequestProgress(percentCompleted);
  };

  const handleDownloadProgress = (event: AxiosProgressEvent) => {
    if (!event.total) return;

    // full first half + second half
    const percentCompleted = Math.round((event.loaded / event.total) * 50) + 50;

    setRequestProgress(percentCompleted);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.files);

    if (!event.target.files || event.target.files.length === 0) return;
    setUploadState("in-progress");

    try {
      await uploadRequest(
        event.target.files,
        handleUploadProgress,
        handleDownloadProgress
      );

      event.target.value = "";
      setIsSuccessSnackbarOpen(true);
      setUploadState("success");
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      setIsFailureSnackbarOpen(true);
      setUploadState("failure");
    }
  };

  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={
          isMobile
            ? {
                ".MuiButton-icon": {
                  marginRight: "0",
                },
              }
            : {}
        }
      >
        {!isMobile && "Upload"}
        <input
          {...inputProps}
          style={{ display: "none" }}
          type="file"
          onChange={handleFileUpload}
        />
      </Button>
      {uploadState === "in-progress" && (
        <LinearProgress value={requestProgress} />
      )}

      <Snackbar
        open={isSuccessSnackbarOpen}
        onClose={closeSuccessSnackbar}
        autoHideDuration={SNACKBAR_DURATION_MS}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message="Uploaded successfully"
      />
      <Snackbar
        open={isFailureSnackbarOpen}
        onClose={closeFailureSnackbar}
        autoHideDuration={SNACKBAR_DURATION_MS}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message="Upload failed"
      />
    </Box>
  );
};
