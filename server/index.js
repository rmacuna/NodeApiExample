const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.use( (req, res, next) => {
  res.status(404);
  res.json({
  	type: 1,
    error: 'Error. Route not found'
  });
});

module.exports = app;