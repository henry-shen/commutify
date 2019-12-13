import React, { useEffect, useState } from 'react'
import moment from 'moment'

import ApiService from './api-service'

import Routes from './components/routes'
import Stations from './components/stations'
import Vehicles from './components/vehicles'
import StationInfoDisp from './components/station-info'

function GoogleMap () {

  const [MapSt8, setMapSt8] = useState({ loaded: false });
  const [VehPos, setVehPos] = useState({ metro: [], trains: [], loaded: false });
  const [TripUpdates, setTripUpdates] = useState({ loaded: false });
  const [Zoom, setZoom] = useState();
  const [StationInfo, setStationInfo] = useState();
  
  let googleMapRef = React.createRef()
  let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

  // const sydney = {
  //   center: { lat: -33.84, lng: 151.15 }
  // }
  const epping = {
    center: { lat: -33.7727151, lng: 151.0798608 }
  }
  

  useEffect(() => {
    console.log('useEffect triggered')
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
    window.document.body.appendChild(googleScript)
    googleScript.addEventListener('load', (() => createGoogleMap()) )
    getData()
  }, [])

  const createGoogleMap = () => {
    console.log(window.google.maps)
    let map =  new window.google.maps.Map(googleMapRef.current, {
      zoom: 12,
      center: epping.center,
      mapTypeControl: false,
      mapTypeId: 'terrain'
    })
    setMapSt8({ map: map, loaded: true })
    // googleScript.addEventListener('zoom_changed', (() => createGoogleMap()) )
    // map.addListener('zoom_changed', (() => setMapSt8({ counter: setMapSt8.counter + 1}) ) )
    getLocation(map)
    map.addListener('zoom_changed', function() {
      console.log('zoom changed')
      setZoom(map.getZoom())
    })
  }

  async function getData() {
    let data = await ApiService.getVehiclePositions()
    console.log('Vehicle positions metros:', data.entity)
    // await setVehPos({ ...VehPos, metro: data.entity})

    let data4 = await ApiService.getVehiclePositionsTrains()
    console.log('Vehicle positions trains:', data4.entity)
    await setVehPos({ ...VehPos, metro: data.entity, trains: data4.entity, loaded: true })

    let data2 = await ApiService.getTripUpdates()
    console.log('Trip updates:', data2.entity)
    // await setTripUpdates({ ...TripUpdates, metro: data2.entity})

    let data3 = await ApiService.getTripUpdatesTrains()
    console.log('Trip updates trains:', data3.entity)
    await setTripUpdates({ ...TripUpdates, metro: data2.entity, trains: data3.entity, loaded: true })
  } 

  const getLocation = (map) => {
    
    let marker = new window.google.maps.Marker;
    let infoWindow = new window.google.maps.InfoWindow;
      // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const fakeLoc = true
        var pos = {
          lat: fakeLoc ? -33.817842 : position.coords.latitude,
          lng: fakeLoc ? 151.132455 : position.coords.longitude
        };
        
        marker.setPosition(pos);
        infoWindow.setContent('Current Location');
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
        marker.setMap(map)
        // map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  }

  const updateStationInfo = (stationInfo) => {
    setStationInfo(stationInfo)
  }

  return (
    
    <div>
      <div id="google-map" ref={googleMapRef} style={{ height: "450px", width: "100%vh" }} >

        { MapSt8.loaded ? <Routes map={MapSt8.map} methods={MapSt8.methods} /> : null }
      
        { MapSt8.loaded ? <Stations map={MapSt8.map} updateStationInfo={updateStationInfo} zoom={Zoom} /> : null }

        { MapSt8.loaded && VehPos.loaded && TripUpdates.loaded ? <Vehicles map={MapSt8.map} dataTripUpdates={TripUpdates} dataVehPos={VehPos} /> : null }
      </div>
      <div>
        { TripUpdates.loaded ? `Last Updated Sydney Time: ${moment(Date.now() + (10*60*60*1000)).format('dddd, HH:mm:ss')}` : null}
      </div>
      <div>
        { TripUpdates.loaded ? <StationInfoDisp TripUpdates={TripUpdates} StationInfo={StationInfo} /> : null }
      </div>
    </div>
  )
}

export default GoogleMap