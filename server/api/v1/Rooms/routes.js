const router = require('express').Router();
const logger = require('winston');





router.route('/')
    .get(controller.all)

router.route('/find/:id')
    .get(controller.read)

router.route('/delete/:id')
   .put(controller.update)
   .delete(controller.delete);