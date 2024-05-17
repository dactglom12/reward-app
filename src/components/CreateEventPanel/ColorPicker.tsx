import React from "react";
import { SketchPicker, ColorResult } from "react-color";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (newColor: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  setColor,
}) => {
  const { isOpen, handleClose, handleOpen } = useOpenCloseToggle();

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor={`${label}-label`}>{label}</label>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            ml: "10px",
            bgcolor: color,
          }}
          onClick={handleOpen}
        >
          SELECT COLOR
        </Box>
      </Box>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Choose a color</DialogTitle>
        <DialogContent>
          <SketchPicker color={color} onChange={handleColorChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
