import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { Segment, Header, Button, FormField } from "semantic-ui-react";
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
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="ui form">
          <FormField>
            <Field name="title" placeholder="Event title" />
          </FormField>
          <FormField>
            <Field name="category" placeholder="Category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="Description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="City" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="Venue" />
          </FormField>
          <FormField>
            <Field name="date" placeholder="Date" type="date" />
          </FormField>
          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/events"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
