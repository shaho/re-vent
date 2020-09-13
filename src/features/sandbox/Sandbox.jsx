import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function Sandbox() {
  const [viewport, setViewport] = useState({
    latitude: 51.50722,
    langitude: -0.1275,
    zoom: 10,
  });
  return (
    <>
      <h1>Testing 123</h1>
      <ReactMapGL
        {...viewport}
        width={600}
        height={600}
        mapboxApiAccessToken="pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg"
        mapStyle="mapbox://styles/cryptoshaho/ckezl5l531uwk19mgq71j9b6r"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {/* <Marker latitude={51.50722} langitude={-0.1275}>
          <Pin />
        </Marker> */}
      </ReactMapGL>
    </>
  );
}

export function Pin() {
  return <div>test</div>;
}
