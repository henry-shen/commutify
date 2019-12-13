import React, { useEffect }from 'react'
import moment from 'moment'

import Trips from '../data/trips/trips.json'
// import '../App.css';

function StationInfoTrip({ TripInfo, StationInfo }) {
  console.log('---------------------------------------------------------------')
  console.log('Trip',TripInfo)

  moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'A few secs',
        ss : '%d seconds',
        m:  "1 min",
        mm: "%d mins",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
  })

  moment.relativeTimeThreshold('s', 60);
  moment.relativeTimeThreshold('m', 90);
  moment.relativeTimeThreshold('h', 20);
  moment.relativeTimeThreshold('d', 25);
  moment.relativeTimeThreshold('M', 10);

  // useEffect(() => {
  //   if (TripInfo) {
  //     renderTime()
  //   }
  // }, [TripInfo])

  // const renderTime = () => {
   
  let timeTillDep = TripInfo.RTDepTime[0] - (Date.now())
  // console.log(timeTillDep)
  let timeTillDepDisp = ''
  
  if (timeTillDep > 60000) timeTillDepDisp = moment(TripInfo.RTDepTime[0]).toNow(true)
  else if (timeTillDep > 30000) timeTillDepDisp = '30 seconds'
  else if (timeTillDep > -30000) timeTillDepDisp = 'Now'
  else if (timeTillDep > -60000) timeTillDepDisp = 'Just departed'
  else timeTillDepDisp = moment(TripInfo.RTDepTime[0]).fromNow(true) + ' ago'

  let destination = Trips.find(el => {
    return el.trip_id === TripInfo.scheduledTrip.trip_id
  }) 
 
  // console.log(TripInfo.realtimeTrip)
  let platform = StationInfo.platforms.find(el => {
    // console.log(el.stop_id.toString(), TripInfo.realtimeTrip.stopId)
    return (el.stop_id.toString() === TripInfo.realtimeTrip.stopId)
  })
  // console.log(platform)

  let depTime = moment(TripInfo.RTDepTime[0]).format('h:mm:ss a')
  let delayDisp
  let delayTime = TripInfo.realtimeTrip.departure.delay
  if (delayTime > 400) delayDisp = '🔴 ' + moment(Date.now()-(delayTime*1000)).fromNow(true) + ' late'
  else if (delayTime > 44) delayDisp = '🔶 ' + moment(Date.now()-(delayTime*1000)).fromNow(true) + ' late'
  else if (delayTime < -20) delayDisp = '🔵 ' + moment(Date.now()+(delayTime+20)*1000).fromNow(true) + ' early'
  else delayDisp = '✔️ On Time' 
  

  return (
    <div className="TripList">
      <div style={{ width: '120px' }}>{ timeTillDepDisp ? timeTillDepDisp : null }</div>
      <div style={{ width: '250px' }}>Towards { TripInfo ? destination.trip_headsign : null }</div>
      <div style={{ width: '120px' }}>{ TripInfo ? ( platform ? `Platform ${platform.platform_code}` : 'No platform data, please check at the station.') : null }</div>
      <div style={{ width: '200px' }}>{ TripInfo ? delayDisp : null }</div>
      {/* <div>Towards {VehiclePos.vehicle.label.toUpperCase().split(' - ')[1]}</div>
      <div>{delayTime}</div>
      <div>{delayDisp}</div> */}
    </div>
  )
}

export default StationInfoTrip;