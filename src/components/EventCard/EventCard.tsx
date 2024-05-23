import { Grid, styled, Typography } from "@mui/material";
import { CalendarEvent, CalendarEventTypes } from "@typings/event";
import * as React from "react";
import { EventNote } from "@mui/icons-material";
import { isColorBright } from "@utilities/eventUtils";
import { Colors } from "constants/styles";

interface EventCardProps {
  event: CalendarEvent;
}

const Wrapper = styled(Grid)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  display: "flex",
  alignItems: "center",
}));

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const contentColor =
    event.eventType === CalendarEventTypes.WORD_TRAINING_SESSION
      ? Colors.WHITE
      : isColorBright(event.color)
      ? Colors.BLACK
      : Colors.WHITE;

  return (
    <Wrapper container sx={{ backgroundColor: event.color }}>
      <Grid item xs={2}>
        <EventNote
          sx={{ color: contentColor, verticalAlign: "center" }}
          fontSize="large"
        />
      </Grid>
      <Grid item container xs={10}>
        <Grid item xs={12}>
          <Typography sx={{ color: contentColor }} variant="h6">
            {event.title}
          </Typography>
        </Grid>
        {event.content && (
          <Grid item sx={{ color: contentColor }} xs={12}>
            <Typography>{event.content}</Typography>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
};
