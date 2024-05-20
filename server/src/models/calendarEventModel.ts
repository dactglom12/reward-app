import { WithDBId, WithTimestamps, WithUserId } from "@typings/common";
import mongoose from "mongoose";

enum CalendarEventTypes {
  WORD_TRAINING_SESSION = "word_training_session",
}

type CalendarEvent = {
  date?: Date;
  title: string;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  eventType: string;
} & WithDBId &
  WithTimestamps &
  WithUserId;

const calendarEventSchema = new mongoose.Schema<CalendarEvent>(
  {
    date: Date,
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    eventType: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CalendarEventModel = mongoose.model<Event>(
  "CalendarEvent",
  calendarEventSchema
);

export { CalendarEventModel, CalendarEvent, CalendarEventTypes };
