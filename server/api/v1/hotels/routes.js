const router = require('express').Router();
const logger = require('winston');
const controller = require('./controller');

const {
  auth,
  authFailed,
} = require('./../authAPI');


/*
 * /api/hotels/     POST   - CREATE
 * /api/hotels/     GET    - READ ALL
 * /api/hotels/:id  GET    - READ ONE
 * /api/hotels/:id  PUT    - UPDATE
 * /api/hotels/:id  DELETE - DELETE
 */

router
	.param('id', controller.id);

router.route('/')
    .post(auth, controller.create)
    .get(controller.all)

router.route('/find')
    .get(controller.read)
    
router.route('/check')
	.get(controller.checkAvailable)



router.route('/update/:id')
	.put(auth, controller.update)
	
router.route('/delete/:id')
   .delete(auth,controller.delete);
 



module.exports = router;

