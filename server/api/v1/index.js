const router = require('express').Router();
const hotels = require('./hotels/routes');
const reservations = require('./reservaciones/routes');
const users = require('./Users/routes');
const logger = require('winston');

router.use('/hotels', hotels);
router.use('/hotels/reservations', reservations);
router.use('/hotels/users', users)


module.exports = router;