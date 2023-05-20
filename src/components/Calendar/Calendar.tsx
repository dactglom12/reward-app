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
  return <BigCalendar {...props} localizer={localizer} />;
};
