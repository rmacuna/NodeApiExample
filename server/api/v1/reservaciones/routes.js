const router = require('express').Router();
const logger = require('winston');


/*
 * /api/reservation/     POST   - CREATE
 * /api/reservation/     GET    - READ ALL
 * /api/reservation/:id  GET    - READ ONE
 * /api/reservation/:id  PUT    - UPDATE
 * /api/reservation/:id  DELETE - DELETE
 */

router.route('/')
    .get((req, res, next) => {

    })
    .post((req, res, next) => {
    	
    });

router.route('/:id')
    .get((req, res, next) => {})
    .put((req, res, next) => {})
    .delete((req, res, next) => {});

module.exports = router;