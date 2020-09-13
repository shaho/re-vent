import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { FormField, List, Input, Label, Segment } from "semantic-ui-react";

import axios from "axios";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2lyd2FuYWZpZmkiLCJhIjoiY2s2aWNoeHI4MDM2ajNubm5vMWpobmJzZCJ9.aiSS4MTpgbvpKH_fhOj39A";

export default function MyPlaceInput({ onSelect, ...props }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [field, meta, helpers] = useField(props);

  let timer;
  useEffect(() => {
    setResults([]);
    // eslint-disable-next-line
    timer = setTimeout(() => {
      search && performeSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setLoading(true);
  }

  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.lat && !field.value.lang) {
      helpers.setValue({ address: "", lat: null, lang: null });
    }
  }

  const performeSearch = async (searchTerm) => {
    if (results.length === 0) {
      const url = `${BASE_URL}/${searchTerm}.json?access_token=${MAPBOX_TOKEN}`;
      const response = await axios.get(url);
      setResults(response.data.features);
      setLoading(false);
    }
  };

  const handleItemClicked = (place) => {
    onSelect(place);
    setSearch(place.place_name);
    helpers.setValue({
      address: place.place_name,
      lat: place.geometry.coordinates[1],
      lang: place.geometry.coordinates[0],
    });
  };

  return (
    <div>
      <FormField error={meta.touched && !!meta.error}>
        <Input
          {...field}
          {...props}
          onBlur={(e) => handleBlur(e)}
          loading={loading && search ? loading : null}
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        {meta.touched && meta.error ? (
          <Label basic color="red" pointing>
            {meta.error["address"]}
          </Label>
        ) : null}
      </FormField>
      {results.length > 0 && (
        <Segment>
          <List selection verticalAlign="middle">
            {results.map((place) => (
              <List.Item
                key={place.id}
                onClick={() => handleItemClicked(place)}
              >
                <List.Header>{place.place_name}</List.Header>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </div>
  );
}
