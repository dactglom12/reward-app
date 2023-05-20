import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { CreateEventDialog } from "./CreateEventDialog";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      margin: "0 auto",
      marginTop: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    button: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {}

export const CreateEventPanel: React.FC<Props> = () => {
  const classes = useStyles();
  const { isOpen, handleOpen, handleClose } = useOpenCloseToggle();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5" component="h3">
            Create Event
          </Typography>
          <Typography component="p">
            Create a new event by clicking the button below.
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Create Event
          </Button>
        </Paper>
      </div>
      <CreateEventDialog isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
