import * as React from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  CalendarProps as BigCalendarProps,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarContainer,
  MonthHeaderContainer,
  MonthHeaderLabel,
  ToolbarButtonsContainer,
  ToolbarContainer,
  ToolbarLabel,
} from "./calendar.styles";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, CalendarToday } from "@mui/icons-material";

interface CalendarProps extends Omit<BigCalendarProps, "localizer"> {}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const Calendar: React.FC<CalendarProps> = (props) => {
  return (
    <CalendarContainer>
      <BigCalendar
        {...props}
        components={{
          ...props.components,
          toolbar: ({ label, onNavigate }) => {
            return (
              <ToolbarContainer>
                <ToolbarLabel>{label}</ToolbarLabel>
                <ToolbarButtonsContainer>
                  <IconButton
                    onClick={() => onNavigate("PREV")}
                    size="medium"
                    aria-label="previous"
                  >
                    <ChevronLeft />
                  </IconButton>

                  <IconButton
                    onClick={() => onNavigate("NEXT")}
                    size="medium"
                    aria-label="next"
                  >
                    <ChevronRight />
                  </IconButton>

                  <IconButton
                    onClick={() => onNavigate("TODAY")}
                    size="medium"
                    aria-label="today"
                  >
                    <CalendarToday />
                  </IconButton>
                </ToolbarButtonsContainer>
              </ToolbarContainer>
            );
          },
          month: {
            header: ({ label }) => {
              return (
                <MonthHeaderContainer>
                  <MonthHeaderLabel>{label.slice(0, 3)}</MonthHeaderLabel>
                </MonthHeaderContainer>
              );
            },
          },
        }}
        style={{ ...props.style }}
        localizer={localizer}
      />
    </CalendarContainer>
  );
};
