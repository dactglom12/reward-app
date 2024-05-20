import { CalendarEvent, CalendarEventDto } from "@typings/event";
import { getApiCompatibleDate } from "@utilities/dateUtils";
import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/calendar";

interface GetAllEventsParams {
  startDate?: Date;
  endDate?: Date;
}

export class CalendarApi {
  static async createEvent(
    dto: CalendarEventDto
  ): Promise<AxiosResponse<{ event: CalendarEvent }>> {
    return baseAxiosClient.post(`${subroute}/`, dto);
  }

  static async getAllEvents({
    startDate,
    endDate,
  }: GetAllEventsParams): Promise<AxiosResponse<{ events: CalendarEvent[] }>> {
    let start, end;

    if (startDate) {
      start = getApiCompatibleDate(startDate);
    }

    if (endDate) {
      end = getApiCompatibleDate(endDate);
    }

    let queryString = "";

    if (start || end) {
      queryString = "?";

      if (start) {
        queryString += `start-date=${start}&`;
      }

      if (end) {
        queryString += `end-date=${end}`;
      }
    }

    return baseAxiosClient.get(`${subroute}${queryString}`);
  }

  static async updateEvent(
    id: string,
    updatedFields: Partial<CalendarEventDto>
  ): Promise<AxiosResponse<{ updatedEvent: CalendarEvent }>> {
    return baseAxiosClient.put(`${subroute}/${id}`, updatedFields);
  }
}
