'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS 
app.use(cors({ optionsSuccessStatus: 200 }));

// Archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta de test 
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Ruta principal
app.get('/api/whoami', (req, res) => {
  // IP: 
  const ip =
    (req.headers['x-forwarded-for'] || '')
      .toString()
      .split(',')[0]
      .trim() ||
    req.socket.remoteAddress ||
    '';

  const language = req.headers['accept-language'] || '';
  const software = req.headers['user-agent'] || '';

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// Levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Request Header Parser listening on port ' + port);
});

module.exports = app;
