import React from "react";
import { Segment } from "semantic-ui-react";
import ReactMapGL from "react-map-gl";

export default function EventDetailedMap({ latitude, longitude }) {
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ width: "100%", height: 300 }}>
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg"
          mapStyle="mapbox://styles/cryptoshaho/ckezl5l531uwk19mgq71j9b6r"
          latitude={latitude}
          longitude={longitude}
          width="100%"
          height={300}
          zoom={10}

          // onViewportChange={(viewport) => setViewport(viewport)}
        >
          {/* <Marker latitude={51.50722} langitude={-0.1275}>
          <Pin />
        </Marker> */}
        </ReactMapGL>
      </div>
    </Segment>
  );
}
