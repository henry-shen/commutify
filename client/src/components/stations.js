import React from 'react'
import ReactDOMServer from 'react-dom/server';

import metroStops from '../data/stations/metro/stops.json';


function Stations ({ map, updateStationInfo, zoom }) {

  let metroStations = metroStops.filter( (el) => {
    return !el.stop_name.includes('Platform')
  })
  metroStations.forEach( (elStation) => {
    elStation.platforms = metroStops.filter((elPlatform) => {
      return elPlatform.stop_name.includes(elStation.stop_name + ' Platform')
    })
  })
  console.log('Metro stations:', metroStations)

  const renderMetroStations = () => {
    // console.log(zoom)
    if (zoom < 12) return true
    metroStations.forEach(el => {
      return renderStations(el)
    });
    return true
  }

  const renderStations = (el) => {
    const size = 18
    let icon = {
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Sydney_Metro_station_symbol.png', // url
      scaledSize: new window.google.maps.Size(size, size), // scaled size
      origin: new window.google.maps.Point(0, 0), // origin
      anchor: new window.google.maps.Point(10, 5) // anchor
    }
    let station = new window.google.maps.Marker({
      position: { lat: el.stop_lat, lng: el.stop_lon },
      map,
      title: 'Hello World!',
      icon: icon
    })

    station.setMap(map)
    map.addListener('zoom_changed', function() {
      station.setMap(null)
    })

    station.addListener('click', function() {
      updateStationInfo(el)
    });
  };

  return ( renderMetroStations() )
}

export default Stations