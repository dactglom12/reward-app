import { Calendar } from "@components/Calendar";
import { DroppableWrapper } from "@components/DroppableWrapper";
import { EventManagerContext } from "@contexts/EventManagerContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { ItemTypes } from "@typings/dragAndDrop";
import * as React from "react";
import { Views } from "react-big-calendar";
import { DropTargetMonitor } from "react-dnd";
import { CalendarEvent, CalendarEventTypes } from "@typings/event";
import { useDateRangeManager } from "@hooks/useDateRangeManager";
import { DraggableWrapper } from "@components/DraggableWrapper";
import { getAssignedEvents, transform } from "@utilities/eventUtils";
import { startOfMonth, endOfMonth } from "date-fns";
import { CalendarApi } from "@api/calendarApi";
import { DateCellContainer } from "@components/Calendar/calendar.styles";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";

const DROPPABLE_CLASSNAME = `droppable-day-wrapper`;

export const RightPanel: React.FC = () => {
  const { updateEvent, events, addEvents } =
    React.useContext(EventManagerContext);
  const { startDate: currentDate, handleStartDateChange: handleDateChange } =
    useDateRangeManager();
  const {
    isOpen: isSelectedEventDialogOpen,
    handleOpen,
    handleClose,
  } = useOpenCloseToggle();
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent>();

  React.useEffect(() => {
    CalendarApi.getAllEvents({
      startDate: startOfMonth(currentDate),
      endDate: endOfMonth(currentDate),
    })
      .then((response) => {
        addEvents(response.data.events);
      })
      .catch(console.log);
  }, [currentDate, addEvents]);

  const handleDropAppEvent = (
    item: unknown,
    monitor: DropTargetMonitor<unknown, unknown>
  ) => {
    const offset = monitor.getClientOffset();

    if (!offset) return;

    const { x, y } = offset;

    const elements = document.elementsFromPoint(x, y);

    const dayWrapper = elements.find((el) =>
      el.classList.contains(DROPPABLE_CLASSNAME)
    );

    if (!dayWrapper) return;

    const dateAttribute = dayWrapper.getAttribute("data-value");

    if (!dateAttribute) return;

    const eventItem = item as CalendarEvent;

    const newEventDate = new Date(dateAttribute);

    CalendarApi.updateEvent(eventItem._id, { date: newEventDate })
      .then((response) => {
        updateEvent(eventItem._id, response.data.updatedEvent);
      })
      .catch((err) => {
        // tODO: handle error
        console.log(err);
      });
  };

  // TODO: bring typing
  const onSelectEvent: any = (event: { entity: CalendarEvent }) => {
    setSelectedEvent(event.entity);
    handleOpen();
  };

  return (
    <>
      <Grid item>
        <DroppableWrapper
          onDrop={handleDropAppEvent}
          acceptItemType={ItemTypes.EVENT}
        >
          <Calendar
            style={{
              minHeight: "80vh",
            }}
            date={currentDate}
            onNavigate={(newDate) => {
              handleDateChange(newDate);
            }}
            views={[Views.MONTH]}
            eventPropGetter={(event) => {
              return {
                style: {
                  backgroundColor: (event as any).entity.color,
                },
              };
            }}
            onSelectEvent={onSelectEvent}
            components={{
              dateCellWrapper: ({ children, value }) => {
                return (
                  <DateCellContainer
                    data-value={value}
                    style={{
                      width: "calc(100% / 7)",
                    }}
                    className={`${DROPPABLE_CLASSNAME}`}
                  >
                    {children}
                  </DateCellContainer>
                );
              },

              eventWrapper: (props) => {
                if (
                  (props.event as { entity: CalendarEvent }).entity
                    .eventType === CalendarEventTypes.WORD_TRAINING_SESSION
                )
                  return <div {...props} />;

                return (
                  <DraggableWrapper
                    item={(props.event as any).entity}
                    itemType={ItemTypes.EVENT}
                  >
                    <div {...props} />
                  </DraggableWrapper>
                );
              },
            }}
            events={transform(getAssignedEvents(events))}
          />
        </DroppableWrapper>
      </Grid>
      <Dialog
        PaperProps={{
          sx: {
            padding: 1,
          },
        }}
        open={isSelectedEventDialogOpen}
        onClose={handleClose}
      >
        <DialogTitle>Event information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedEvent?.title}</Typography>
          {selectedEvent?.content && (
            <Typography variant="body1">{selectedEvent?.content}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="info" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
