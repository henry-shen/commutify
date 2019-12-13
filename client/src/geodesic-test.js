import React, { useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react';

import routeShape from './data/routes/metro/route_shape.json';

function map() {
 
  console.log(routeShape)

  let routeCoord = [];
  
  routeShape.forEach((el) => {
    routeCoord.push({ lat: el.shape_pt_lat, lng: el.shape_pt_lon} )
  })

  console.log(routeCoord)
  
  const sydney = {
    center: {
      lat: -35.31,
      lng: 149.19
    },
    zoom: 11
  };

  const renderRoutes = (map, maps) => {
    renderPolylines(map, maps)
  }

  const renderPolylines = (map, maps) => {
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: [ sydney.center, { lat:49, lng: 2.548 }],
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 6
    })
    geodesicPolyline.setMap(map)
  }
  
  return (
    <div style={{ height: '80%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCtVH97gRbNoNCnYdsMU3Z50tX5wiynUZ4" }}
        defaultCenter={{
            lat: -33.8,
            lng: 151.05
          }
        } defaultZoom={ 11 }
        onGoogleApiLoaded={ ({map, maps}) => renderRoutes(map, maps)}
      >


      </GoogleMapReact>
    </div>
  )
}

export default map;