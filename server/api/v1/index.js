const router = require('express').Router();
const hotels = require('./hotels/routes');

router.use('/hotels', hotels);


module.exports = router;