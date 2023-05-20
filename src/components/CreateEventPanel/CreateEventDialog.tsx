import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { WithOpenClosedState } from "@typings/shared";
import { EventsApi } from "@api/index";
import { EventManagerContext } from "@contexts/EventManagerContext";
import { ColorResult, TwitterPicker } from "react-color";
import { eventColors } from "@utilities/eventUtils";
import { EventCard } from "@components/EventCard";

interface CreateEventDialogProps extends WithOpenClosedState {}

export const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = React.useState("");
  const [color, setColor] = React.useState(eventColors[7]);
  const { addEvents } = React.useContext(EventManagerContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleColorChange = (result: ColorResult) => {
    setColor(result.hex);
  };

  const handleSave = () => {
    // Do something with the form data
    EventsApi.createEvent({
      color,
      title,
    })
      .then((response) => {
        addEvents([response.data.event]);
        onClose();
      })
      .catch((err) => {
        // TODO: handle error
        console.log(err);
      });
  };

  const contentHeight = `calc(45vh)`;

  return (
    <Dialog maxWidth="xs" fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>Add a new item</DialogTitle>
      <DialogContent style={{ height: contentHeight }}>
        <Box>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <TwitterPicker
            color={color}
            onChange={handleColorChange}
            colors={eventColors}
            styles={{
              default: {
                card: { width: "100%" },
                triangle: { display: "none" },
                triangleShadow: { display: "none" },
              },
            }}
          />
        </Box>
        <Box>
          <Typography variant="body1">Preview:</Typography>
          <EventCard
            event={{
              _id: "mock_id",
              color: color,
              title: title,
              createdAt: "",
              updatedAt: "",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
