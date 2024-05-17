import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CreateEventDialog } from "./CreateEventDialog";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  margin: "0 auto",
  marginTop: theme.spacing(3),
}));

const PaperElement = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ButtonElement = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface Props {}

export const CreateEventPanel: React.FC<Props> = () => {
  const { isOpen, handleOpen, handleClose } = useOpenCloseToggle();

  return (
    <>
      <Root>
        <PaperElement elevation={3}>
          <Typography variant="h5" component="h3">
            Create Event
          </Typography>
          <Typography component="p">
            Create a new event by clicking the button below.
          </Typography>
          <ButtonElement
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Create Event
          </ButtonElement>
        </PaperElement>
      </Root>
      <CreateEventDialog isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
