import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import cuid from "cuid";

import { createEvent, updateEvent } from "../eventActions";

export default function EventForm({ match, history }) {
  // Select Event
  const selectedEvent = useSelector((state) =>
    state.event.events.find((event) => {
      return event.id === match.params.id;
    })
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleFormSubmit() {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            hostPhotoURL: "/assets/user.png",
            attendees: [],
          })
        );
    history.push("/events");
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit the Event" : "Create new event"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            name="title"
            value={values.title}
            placeholder="Event title"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="category"
            value={values.category}
            type="text"
            placeholder="Category"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="description"
            value={values.description}
            type="text"
            placeholder="Description"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="city"
            value={values.city}
            type="text"
            placeholder="City"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="venue"
            value={values.venue}
            type="text"
            placeholder="Venue"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="date"
            value={values.date}
            type="date"
            placeholder="Date"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          as={Link}
          to="/events"
          type="submit"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
