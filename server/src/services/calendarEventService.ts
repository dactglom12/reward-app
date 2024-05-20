import { CalendarEventModel, CalendarEvent } from "@models/calendarEventModel";

interface GetAllEventsParams {
  startDate?: Date;
  endDate?: Date;
}

class CalendarEventService {
  static async createEvent(eventData: Partial<CalendarEvent>) {
    try {
      const event = new CalendarEventModel(eventData);
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

      const events = await CalendarEventModel.find(params);

      return events;
    } catch (err) {
      throw new Error(`Failed to get all events: ${err}`);
    }
  }

  static async updateEvent(id: string, updatedFields: Partial<CalendarEvent>) {
    try {
      const updatedEvent = await CalendarEventModel.findByIdAndUpdate(
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

export { CalendarEventService };
