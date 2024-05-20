import * as React from "react";
import { CalendarEvent } from "@typings/event";

export const useEventsManager = () => {
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);

  const getEvent = React.useCallback(
    (id: CalendarEvent["_id"]) => events.find((event) => event._id === id),
    [events]
  );

  const updateEvent = React.useCallback(
    (id: CalendarEvent["_id"], updatedFields: Partial<CalendarEvent>) => {
      setEvents((currentEvents) =>
        currentEvents.map((currentEvent) => {
          if (currentEvent._id === id)
            return { ...currentEvent, ...updatedFields };

          return currentEvent;
        })
      );
    },
    []
  );

  const addEvents = React.useCallback((events: CalendarEvent[]) => {
    setEvents((currentEvents) => {
      const newEvents = events.filter((event) => {
        return !Boolean(
          currentEvents.find((currentEvent) => currentEvent._id === event._id)
        );
      });

      return [...currentEvents, ...newEvents];
    });
  }, []);

  return {
    updateEvent,
    addEvents,
    events,
    getEvent,
  };
};
