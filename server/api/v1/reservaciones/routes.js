const router = require('express').Router();
const logger = require('winston');
const controller = require('./controller');


/*
 * /api/reservation/     POST   - CREATE
 * /api/reservation/     GET    - READ ALL
 * /api/reservation/:id  GET    - READ ONE
 * /api/reservation/:id  PUT    - UPDATE
 * /api/reservation/:id  DELETE - DELETE
 */

router
	.param('id', controller.id);

router.route('/')
    .post(controller.create)
    .get(controller.all)

router.route('/find')
    .get(controller.read)

router.route('/delete/:id')
   .put(controller.update)
   .delete(controller.delete);


module.exports = router;