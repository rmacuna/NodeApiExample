const express = require('express');
const morgan = require('morgan');

const api = require('./api/v1');

const app = express();
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

// Setup middleware
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Setup router and routes
app.use('/api', api);
app.use('/api/v1', api);

// Conectarse a la base de datos de mongo
const database = require('./database');

// Connect to database
database.connect();

// Initialize Express app

// Handle middleware errors


app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: `${err}`,
  });
});

app.use((err, req, res, next) => {
  let {
    statusCode = 500,
  } = err;
  const {
    message,
  } = err;

  // Validation Errors
  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  logger.error(`Error: ${message}`);
  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
});
module.exports = app;