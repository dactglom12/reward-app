import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { Event } from "@typings/event";
import * as React from "react";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { isColorBright } from "@utilities/eventUtils";

interface EventCardProps {
  event: Event;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderRadius: `${theme.spacing(1)}px`,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    display: "flex",
    alignItems: "center",
  },
}));

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const classes = useStyles();
  const theme = useTheme();
  const contentColor = isColorBright(event.color) ? "#000" : "#fff";

  return (
    <div className={classes.wrapper} style={{ backgroundColor: event.color }}>
      <EventNoteIcon style={{ color: contentColor }} />
      <Typography style={{ color: contentColor, marginLeft: theme.spacing(1) }}>
        {event.title}
      </Typography>
    </div>
  );
};
