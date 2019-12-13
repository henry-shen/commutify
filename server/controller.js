var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var moment = require('moment');
var request = require('request');

API_KEY = 'apikey P65zJQwAIstI3vDCLd5r0L4Ag7dG8GFfTGDx'
URL_VEH_POS = 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos'
URL_TRIP_UPDATE = 'https://api.transport.nsw.gov.au/v1/gtfs/realtime'

exports.getVehPos = (req, res, next) => {
  console.log('fetching vehicle positions')
  fetchAPI(`${URL_VEH_POS}/metro`, API_KEY, res);
}

exports.getVehPosTrains = (req, res, next) => {
  console.log('fetching vehicle positions')
  fetchAPI(`${URL_VEH_POS}/sydneytrains`, API_KEY, res);
}

exports.getTripUpdates = (req, res, next) => {
  console.log('fetching trip updates')
  fetchAPI(`${URL_TRIP_UPDATE}/metro`, API_KEY, res);
}

exports.getTripUpdatesTrains = (req, res, next) => {
  console.log('fetching train trip updates')
  fetchAPI(`${URL_TRIP_UPDATE}/sydneytrains`, API_KEY, res);
}


function fetchAPI(URL, API_KEY, res) {
  request({
    method: 'GET', encoding: null,
    url: URL,
    headers: { "Authorization": API_KEY }
    },
  function (error, response, body) {
    try {
      if (error) {
        console.log('1', error)
      } else {
        console.log(!!res)
        console.log(response.statusCode)
        console.log(body)
        let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
        let date = moment(Date.now()).format('h:mm:ss a')
        console.log('Last updated at ' + date) 
        console.log(response.statusCode, feed)
        res.send(feed)
      }
    }
    catch(err) {
      console.log('2', err)
    }
  }) 
}