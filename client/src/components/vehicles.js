import React from 'react'
import ReactDOMServer from 'react-dom/server';
import VehicleInfo from './vehicle-info'

function Vehicles({ map, dataTripUpdates, dataVehPos }) {

  console.log(dataVehPos)

  const renderMetroTrains = (dataTripUpdates, dataVehPos) => {
    if (!dataVehPos) {
      console.log('No real time metros')
      return null
    }
    dataVehPos.forEach(elVeh => {
      // console.log('vehicle', elVeh.vehicle)
      let TripInfo = dataTripUpdates.filter( (elTrip) => elTrip.tripUpdate.trip.tripId === elVeh.vehicle.trip.tripId )
      // console.log('trip', TripInfo[0].tripUpdate)
      renderVehicles(map, elVeh.vehicle, TripInfo[0].tripUpdate)
    })
    return true
  }

  const renderTrains = (dataTripUpdates, dataVehPos) => {
    let T9Trains = dataVehPos.filter( (el) => {
      let VehId = el.vehicle.trip.routeId
      return VehId === 'NTH_1a' || VehId === 'NTH_1b' || VehId === 'NTH_2a'
    })
    console.log('T9 Trains', T9Trains)
    T9Trains.forEach(elVeh => {
      // console.log('vehicle', elVeh.vehicle)
      let TripInfo = dataTripUpdates.filter( (elTrip) => elTrip.tripUpdate.trip.tripId === elVeh.vehicle.trip.tripId )[0]
      // console.log('T9 trip', TripInfo[0].tripUpdate)
      renderVehicles(map, elVeh.vehicle, TripInfo.tripUpdate)
    })
    return true
  }

  const renderVehicles = (map, VehiclePos, TripUpdate) => {
    if ( !VehiclePos.position ) return console.log('Vehicles position data missing')
    // console.log(map.zoom)
    let size = (icon) => {
      if (map.zoom < 12) return 0
      else return 28
    }
    
    let iconVehicle = {
      url: 'https://image.flaticon.com/icons/png/512/1183/1183363.png', // url
      scaledSize: new window.google.maps.Size(size(), size()), // scaled size
      origin: new window.google.maps.Point(0, 0), // origin
      anchor: new window.google.maps.Point(12, 12), // anchor
      labelOrigin: new window.google.maps.Point(10, 30)
    }

    // let iconArrow = {
    //   path: 'M 7 7 L 21 7 L 14 21 z', // url
    //   fillColor: 'black', // origin
    //   rotation: VehiclePos.position.bearing+180
    // }

    let label = VehiclePos.vehicle.label.toUpperCase().split(' - ')[1]
    // let shortLabel = ''
    // if (label.length > 6) shortLabel = label[0] + label[1] + label[2] + label[label.length-1]
    // else shortLabel = label
    let vehicle = new window.google.maps.Marker({
      position: { lat: VehiclePos.position.latitude, lng: VehiclePos.position.longitude },
      map,
      title: 'Hello World!',
      icon: iconVehicle,
      zIndex: 9999,
      label: label
    })

    // let arrow = new window.google.maps.Marker({
    //   position: { lat: el.vehicle.position.latitude, lng: el.vehicle.position.longitude },
    //   map,
    //   title: 'Hello World!',
    //   icon: iconArrow
    // })

    let InfoWindowContent =  <VehicleInfo VehiclePos={VehiclePos} TripUpdate={TripUpdate} />
    // dataTripUpdates={dataTripUpdates} dataVehPos={dataVehPos}
    let infowindow = new window.google.maps.InfoWindow({
      content: ''
    });
    vehicle.addListener('click', function() {
      const content = ReactDOMServer.renderToString(InfoWindowContent);
      infowindow.setContent(content);
      infowindow.open(map, vehicle);
    });
 
    vehicle.setMap(map)
    // arrow.setMap(map)
    return true;
  }

  return (
    <div>
      { renderMetroTrains(dataTripUpdates.metro, dataVehPos.metro) }
      { renderTrains(dataTripUpdates.trains, dataVehPos.trains) }
    </div>
  )
}

export default Vehicles;