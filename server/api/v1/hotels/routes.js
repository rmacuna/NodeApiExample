const router = require('express').Router();
const logger = require('winston');


/*
 * /api/hotels/     POST   - CREATE
 * /api/hotels/     GET    - READ ALL
 * /api/hotels/:id  GET    - READ ONE
 * /api/hotels/:id  PUT    - UPDATE
 * /api/hotels/:id  DELETE - DELETE
 */

router.route('/')
    .get((req, res, next) => {})
    .post((req, res, next) => {});

router.route('/:id')
    .get((req, res, next) => {})
    .put((req, res, next) => {})
    .delete((req, res, next) => {});

module.exports = router;