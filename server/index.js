const http = require('http');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Api HOTELERIO');
});

module.exports = app;