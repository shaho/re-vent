import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { Segment, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import * as Yup from "yup";

import { createEvent, updateEvent } from "../eventActions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import { categoryData } from "../../../app/api/categoryOptions";

export default function EventForm({ match, history }) {
  // Select Event
  const selectedEvent = useSelector((state) =>
    state.event.events.find((event) => {
      return event.id === match.params.id;
    })
  );

  const [place, setPlace] = useState(null);
  const handleSelect = (place) => {
    setPlace({ place });
  };

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      lat: null,
      lang: null,
    },
    venue: "",
    date: "",
  };

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
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
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Event Category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <Header sub color="teal" content="Event Location Details" />
            {/* <MyTextInput name="city" placeholder="City" /> */}
            <MyTextInput name="venue" placeholder="Venue" />
            <MyPlaceInput
              name="city"
              placeholder="City"
              place={place}
              onSelect={handleSelect}
            />
            <MyDateInput
              name="date"
              placeholderText="Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
