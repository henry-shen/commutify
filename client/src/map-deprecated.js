import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';

import Routes from './routes'
import Stations from './stations'
import StationMarker from './metro-station'

function GoogleMap() {
  
  const sydney = {
    center: {
      lat: -33.85,
      lng: 151.04
    }
  }

  const [MapSt8, setMapSt8] = useState({ loaded: false });

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <div style={{ height: '80%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCtVH97gRbNoNCnYdsMU3Z50tX5wiynUZ4" }}
        defaultCenter={ { lat:-33.7771, lng: 151.115 }} defaultZoom={ 13 }
        onGoogleApiLoaded={ ({ map, maps }) => {
          console.log('on api load', map, maps)
          setMapSt8({ map: map, methods: maps, loaded: true })
        }}
      > 
      { MapSt8.loaded ? <Routes map={MapSt8.map} methods={MapSt8.methods} /> : null }

      { MapSt8.loaded ? <Stations map={MapSt8.map} methods={MapSt8.methods} /> : null }
        
      {/* <StationMarker lat={-33.85} lng={151.04} text="A" /> */}

      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap;