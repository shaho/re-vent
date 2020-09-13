import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import { format } from "date-fns";

import EventDetailedMap from "./EventDetailedMap";

export default function EventDetailedInfo({ event }) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, "MMMM d, yyyy h:mm a")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => setMapOpen(!mapOpen)}
              color="teal"
              size="tiny"
              content={mapOpen ? "Hide Map" : "Show Map "}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && (
        <EventDetailedMap
          latitude={event.city.lat}
          longitude={event.city.lng}
        />
      )}
    </Segment.Group>
  );
}
