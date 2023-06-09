import { Request, Response } from "express";
import { EventService } from "@services/eventService";

type ErrorLike = {
  message: string;
};

const isValidDate = (d: Date) => !isNaN(d.getTime());

class EventController {
  static async create(req: Request, res: Response) {
    try {
      const { date, title, color } = req.body;

      const savedEvent = await EventService.createEvent({ date, title, color });

      return res.json({ event: savedEvent });
    } catch (err) {
      const typedErr = err as ErrorLike;

      return res.json({ error: typedErr.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const startDate = new Date(req.query["start-date"] as string);
      const endDate = new Date(req.query["end-date"] as string);

      const events = await EventService.getAllEvents({
        endDate: isValidDate(endDate) ? endDate : undefined,
        startDate: isValidDate(startDate) ? startDate : undefined,
      });

      return res.json({ events });
    } catch (err) {
      const typedErr = err as ErrorLike;

      return res.json({ error: typedErr.message });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updatedEvent = await EventService.updateEvent(id, req.body);

      return res.json({ updatedEvent });
    } catch (err) {
      const typedErr = err as ErrorLike;

      return res.json({ error: typedErr.message });
    }
  }
}

export { EventController };
