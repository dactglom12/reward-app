import { WithDBId, WithTimestamps } from "./shared";

export type Event = {
  date?: Date;
  title: string;
  color: string;
} & WithTimestamps &
  WithDBId;

export type EventDto = Pick<Event, "date" | "title" | "color">;
