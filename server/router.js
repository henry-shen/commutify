const router = require('express').Router();
const ctrl = require('./controller');

router.get('/veh-pos', ctrl.getVehPos);
router.get('/veh-pos/trains', ctrl.getVehPosTrains);
router.get('/trip-updates', ctrl.getTripUpdates);
router.get('/trip-updates/trains', ctrl.getTripUpdatesTrains);

router.get('/*', (req, res) => {
  res.status(404);
  res.send('404 Path not found.'); // Catch all for not found
});

module.exports = router;