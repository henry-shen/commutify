import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'

import stopTimesSch from '../data/stations/metro/stop_times'
import StationInfoTrip from './station-info-trip'

function StationInfo({ TripUpdates, StationInfo }) {

  // console.log(StationInfo)

  const [RTStationData, setRTStationData] = useState();

  useEffect(() => {
    if (StationInfo) {
      renderTrips(TripUpdates.metro)
    }
  }, [StationInfo])

  const renderTrips = (TripUpdates) => {

    if (!TripUpdates) return false

    let platStops = []
    StationInfo.platforms.forEach(el => platStops.push(el.stop_id))
    console.log(platStops)

    TripUpdates.forEach(el => {
      el.scheduledTrip = stopTimesSch.filter(elSch => el.tripUpdate.trip.tripId === elSch.trip_id)
    })

    TripUpdates.forEach(elTop => {
      elTop.scheduledTrip.forEach(el => {
        platStops.forEach(elPlat => {
          if (elPlat === el.stop_id) {
            console.log('first if')
            elTop.scheduledTrip = el
            elTop.scheduledTrip.departureTS = convTimeSyd(el.departure_time)
            elTop.realtimeTrip = elTop.tripUpdate.stopTimeUpdate.filter(elRT => elRT.stopId === el.stop_id.toString())[0]
          }
        })
      })
    })

    TripUpdates.forEach(el => {
      if (!el.realtimeTrip) return console.log('Error')
      if (!el.realtimeTrip.departure) return console.log('Error')
      let RealTimeDeparture = Number(moment(el.scheduledTrip.departureTS).format('x')) + (el.realtimeTrip.departure.delay * 1000)
      console.log('RealTimeDeparture',RealTimeDeparture)
      el.RTDepTime = [RealTimeDeparture, moment(RealTimeDeparture).tz("Australia/Sydney").format()]
    })
    // console.log('Trip List', TripUpdates)

    TripUpdates.sort(function (a, b) {
      return a.RTDepTime[0] - b.RTDepTime[0]
    })
    

    setRTStationData(TripUpdates)
    return true
  }

  const convTimeSyd = (input) => {
    let dateSyd = moment().tz("Australia/Sydney").format().slice(0, 11)
    if (input.length === 7) return dateSyd + '0' + input + '+11:00'
    else return dateSyd + input + '+11:00'
  }
  console.log('Sorted trips', TripUpdates)

  return (
    <div>
      <div>{ StationInfo ? (TripUpdates ? `Trips at ${StationInfo.stop_name}:`
        : 'No trips to display. Please check back later.' ) : 'Please select a stop to view trip infomation.' }
      </div>
      <div style={{ height: '250px', width: '100%', overflow: 'scroll' }}>
        { RTStationData ? 
        RTStationData.map((el, key) => {
          console.log(el)
          return <StationInfoTrip TripInfo={ el } StationInfo={StationInfo}
          // key={key}
          />
        })
         : null}
      </div>
    </div>
  )
}

export default StationInfo;