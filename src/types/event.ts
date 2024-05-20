import { WithDBId, WithTimestamps, WithUserId } from "./shared";

export enum CalendarEventTypes {
  WORD_TRAINING_SESSION = "word_training_session",
  REGULAR = "regular",
}

export type CalendarEvent = {
  date?: Date;
  title: string;
  color: string;
  content?: string;
  eventType: CalendarEventTypes;
} & WithTimestamps &
  WithDBId &
  WithUserId;

export type CalendarEventDto = Pick<
  CalendarEvent,
  "date" | "title" | "color" | "content" | "eventType"
>;
