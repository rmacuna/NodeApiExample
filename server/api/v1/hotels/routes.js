const router = require('express').Router();
const logger = require('winston');
const controller = require('./controller');
/*
 * /api/hotels/     POST   - CREATE
 * /api/hotels/     GET    - READ ALL
 * /api/hotels/:id  GET    - READ ONE
 * /api/hotels/:id  PUT    - UPDATE
 * /api/hotels/:id  DELETE - DELETE
 */

router.route('/')
    .post(controller.create)
    .get(controller.all)

router.route('/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);


module.exports = router;

