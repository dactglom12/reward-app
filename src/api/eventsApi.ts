import { Event, EventDto } from "@typings/event";
import { getApiCompatibleDate } from "@utilities/dateUtils";
import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/events";

interface GetAllEventsParams {
  startDate?: Date;
  endDate?: Date;
}

export class EventsApi {
  static async createEvent(
    dto: EventDto
  ): Promise<AxiosResponse<{ event: Event }>> {
    return baseAxiosClient.post(`${subroute}/`, dto);
  }

  static async getAllEvents({
    startDate,
    endDate,
  }: GetAllEventsParams): Promise<AxiosResponse<{ events: Event[] }>> {
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
    updatedFields: Partial<EventDto>
  ): Promise<AxiosResponse<{ updatedEvent: Event }>> {
    return baseAxiosClient.put(`${subroute}/${id}`, updatedFields);
  }
}
