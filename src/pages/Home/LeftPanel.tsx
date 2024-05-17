import { CreateEventPanel } from "@components/CreateEventPanel";
import { DraggableWrapper } from "@components/DraggableWrapper";
import { EventCard } from "@components/EventCard";
import { EventManagerContext } from "@contexts/EventManagerContext";
import { Box, Grid, List } from "@mui/material";
import { ItemTypes } from "@typings/dragAndDrop";
import { getUnassignedEvents } from "@utilities/eventUtils";
import * as React from "react";
import { EventsApi } from "@api/eventsApi";

export const LeftPanel: React.FC = () => {
  const { events, addEvents } = React.useContext(EventManagerContext);

  React.useEffect(() => {
    EventsApi.getAllEvents({})
      .then((response) => {
        addEvents(response.data.events);
      })
      // TODO: handle error
      .catch(console.log);
  }, [addEvents]);

  return (
    <Grid item container md={4}>
      <Box sx={{ border: "1px solid #000", borderRadius: "10px" }}>
        <CreateEventPanel />
        <List>
          {getUnassignedEvents(events).map((event) => (
            <DraggableWrapper
              itemType={ItemTypes.EVENT}
              key={event._id}
              item={event}
            >
              <EventCard event={event} />
            </DraggableWrapper>
          ))}
        </List>
      </Box>
    </Grid>
  );
};
