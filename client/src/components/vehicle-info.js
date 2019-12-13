import React from 'react'

import moment from 'moment'

function VehicleInfo({ VehiclePos, TripUpdate }) {

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

  let delayNextStop = VehiclePos.currentStopSequence ? TripUpdate.stopTimeUpdate[VehiclePos.currentStopSequence-1] : null
  let delayTime = delayNextStop ? delayNextStop.departure ? delayNextStop.departure.delay : delayNextStop.arrival.delay : null
  let delayDisp = ''
  if (delayTime > 400) delayDisp = '🔴 ' + moment(Date.now()-(delayTime*1000)).fromNow(true) + ' late'
  else if (delayTime > 44) delayDisp = '🔶 ' + moment(Date.now()-(delayTime*1000)).fromNow(true) + ' late'
  else if (delayTime < -20) delayDisp = '🔵 ' + moment(Date.now()+(delayTime+20)*1000).fromNow(true) + ' early'
  else delayDisp = '✔️ On Time' 

  
  return (
    
    <div>
      <div>Vehicle ID: {VehiclePos.vehicle.id}</div>
      <div>Towards {VehiclePos.vehicle.label.toUpperCase().split(' - ')[1]}</div>
      <div>{delayTime}</div>
      <div>{delayDisp}</div>
    </div>
     
  )
}

export default VehicleInfo;