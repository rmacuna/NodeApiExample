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
    .post(controller.create)
    .get(controller.all)

router.route('/find')
    .get(controller.read)

router.route('/:id')
   .put(controller.update)
   .delete(controller.delete);



module.exports = router;
