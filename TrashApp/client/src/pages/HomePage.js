import React, { useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';

export const HomePage = () => {

  const [viewport, setViewPort] = useState({
    latitude: 32.6549967,
    longitude: -79.9406093,
    zoom: 10
  });

  const [markers, setMarkers] = useState([]); /* PIN STUFF */

  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat
    setMarkers([...markers, { id: new Date().getTime(), longitude: lng, latitude: lat }])
  }

  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <div>
      <NavigationBar />

      <div className="Container" style={{ width: "68vw", height: "90vh", alignContent: "center" }}>
        <ReactMapGL
          onClick={handleClick}
          width="100%"
          height="100%"
          mapboxAccessToken={mapKey}
          {...viewport}
          onMove={evt => setViewPort(evt.viewport)}
          transitionDurations="200"
          mapStyle={"mapbox://styles/mapbox/streets-v9"}
        >

          {/* WE MAKING PINS */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-20}
              offsetTop={-10}
              color="red"
            >
            </Marker>
          ))}

          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <GeolocateControl />
        </ReactMapGL>
      </div>
    </div>
  );
}
