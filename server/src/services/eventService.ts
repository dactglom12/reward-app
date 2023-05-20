import { Event, EventModel } from "@models/eventModel";

interface GetAllEventsParams {
  startDate?: Date;
  endDate?: Date;
}

class EventService {
  static async createEvent(eventData: Partial<Event>) {
    try {
      const event = new EventModel(eventData);
      const savedEvent = await event.save({});
      return savedEvent;
    } catch (err) {
      throw new Error(`Failed to create event: ${err}`);
    }
  }

  static async getAllEvents({ startDate, endDate }: GetAllEventsParams) {
    try {
      const params =
        startDate && endDate
          ? { date: { $gte: startDate, $lte: endDate } }
          : { date: null };

      const events = await EventModel.find(params);

      return events;
    } catch (err) {
      throw new Error(`Failed to get all events: ${err}`);
    }
  }

  static async updateEvent(id: string, updatedFields: Partial<Event>) {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(
        id,
        updatedFields,
        {
          new: true,
        }
      );

      return updatedEvent;
    } catch (err) {
      throw new Error(`Failed to update event: ${err}`);
    }
  }
}

export { EventService };
