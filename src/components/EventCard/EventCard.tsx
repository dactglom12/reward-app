import { styled, Typography, useTheme } from "@mui/material";
import { Event } from "@typings/event";
import * as React from "react";
import { EventNote } from "@mui/icons-material";
import { isColorBright } from "@utilities/eventUtils";

interface EventCardProps {
  event: Event;
}

const Wrapper = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  display: "flex",
  alignItems: "center",
}));

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const theme = useTheme();
  const contentColor = isColorBright(event.color) ? "#000" : "#fff";

  return (
    <Wrapper style={{ backgroundColor: event.color }}>
      <EventNote style={{ color: contentColor }} />
      <Typography style={{ color: contentColor, marginLeft: theme.spacing(1) }}>
        {event.title}
      </Typography>
    </Wrapper>
  );
};
