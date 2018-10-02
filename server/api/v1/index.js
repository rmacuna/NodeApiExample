const router = require('express').Router();
const logger = require('winston');

router.route('/api/hotels')
 .get((req, res, next) => {
    res.json({
      message: 'GET all posts'
    });
});


module.exports = router;