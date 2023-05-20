import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";

type Event = {
  date?: Date;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
} & WithDBId &
  WithTimestamps;

const eventSchema = new mongoose.Schema<Event>(
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
  },
  { timestamps: true }
);

const EventModel = mongoose.model<Event>("Event", eventSchema);

export { EventModel, Event };
