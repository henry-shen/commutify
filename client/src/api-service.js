const BASE_URL = 'http://localhost:3001'

export default { 
  getVehiclePositions: () => {
    console.log('Updating vehicle positions')
    return fetchRequest(BASE_URL + `/veh-pos`);
  },

  getVehiclePositionsTrains: () => {
    console.log('Updating vehicle positions')
    return fetchRequest(BASE_URL + `/veh-pos/trains`);
  },

  getTripUpdates: () => {
    console.log('Getting trip updates')
    return fetchRequest(BASE_URL + `/trip-updates`);
  },

  getTripUpdatesTrains: () => {
    console.log('Getting trip updates')
    return fetchRequest(BASE_URL + `/trip-updates/trains`);
  },

  // postEvent: (title, venue, date) => {
  //   const data = {
  //     title: title,
  //     venue: venue,
  //     date: date
  //   }
  //   return fetchRequest(BASE_URL + `/events`, {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(data)
  //   })
  // }
}

const fetchRequest = (url, options) => {
  return fetch(url, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
}