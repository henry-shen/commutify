const express = require('express');
const bodyParser = require('body-parser');
//const router = require('./router.js');
const PORT = 3001;
const app = express();

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var moment = require('moment');
const fetch = require('node-fetch');
var request = require('request');

app.use(express.static(`localhost:${PORT}`));
app.use(bodyParser.json());
//app.use(router);

app.listen(PORT, () => {
  console.log(`🚀  Server running on localhost:${PORT}`);
});

// app.get('/', function(req, res, next) {
//   console.log("requesting API")
var requestSettings = {
  method: 'GET',
  url: 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/metro',
  encoding: null,
  headers: {
    "Authorization": "apikey P65zJQwAIstI3vDCLd5r0L4Ag7dG8GFfTGDx"
  }
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response.statusCode)
    let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    let date = moment(Date.now()).format('h:mm:ss a')
    console.log('Last updated at ' + date) 
    console.log(feed)
  }
})

// try {
//   fetchData();
// }
// catch (error) {
//   console.log(err);
// }

// async function fetchData () {
//   const response = await fetch('https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/metro', requestSettings);
//   console.log(response.json())

//   let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response.json());
//   console.log(feed);
//       //   let date = moment(Date.now()).format('h:mm:ss a')
//       //   console.log('Last updated at ' + date) 
//       //   console.log(feed)
//       //   // feed.entity.forEach(function(entity) {
//       //   //   if (entity.trip_update) {
//       //   //     console.log(entity.trip_update);
//       //   //   }
//       //   //   if (entity.vehicle) {
//       //   //     console.log(entity.vehicle);
//       //   //   }
// }





// request(requestSettings, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(response.statusCode)

//   }
// });