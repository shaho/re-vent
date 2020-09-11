import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { FormField, List, Input, Label } from "semantic-ui-react";

import axios from "axios";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2lyd2FuYWZpZmkiLCJhIjoiY2s2aWNoeHI4MDM2ajNubm5vMWpobmJzZCJ9.aiSS4MTpgbvpKH_fhOj39A";

export default function MyPlaceInput({ onSelect, ...props }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [field, meta] = useField(props);

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
    console.log(place.geometry.coordinates[0], place.geometry.coordinates[1]);
  };

  return (
    <div>
      <FormField error={meta.touched && !!meta.error}>
        <Input
          {...field}
          {...props}
          loading={loading && search ? loading : null}
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        {meta.touched && meta.error ? (
          <Label basic color="red" pointing>
            {meta.error}
          </Label>
        ) : null}
      </FormField>
      {results.length > 0 && (
        <List selection verticalAlign="middle">
          {results.map((place) => (
            <List.Item key={place.id} onClick={() => handleItemClicked(place)}>
              {place.place_name}
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
