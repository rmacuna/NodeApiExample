const router = require('express').Router();
const hotels = require('./hotels/routes');
const reservations = require('./reservaciones/routes');

router.use('/hotels', hotels);
router.use('hotels/reservations', reservations);


module.exports = router;