const router = require('express').Router();
const logger = require('winston');
const controller = require('./controller');
/*
 * /api/users/     POST   - CREATE
 * /api/users/     GET    - READ ALL
 * /api/users/:id  GET    - READ ONE
 * /api/users/:id  PUT    - UPDATE
 * /api/users/:id  DELETE - DELETE
 */

router.route('/')
    .post(controller.create )
    .get(controller.all)

router
    .param('id', controller.id);

router.route('/signup')
	.post(controller.signup)

router.route('/find')
    .get(controller.read);

router.route('/update/:id')
	.put(controller.update);

router.route('/:id')
   .delete(controller.delete);



module.exports = router;
