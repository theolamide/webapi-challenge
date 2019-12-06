const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>This is the Webapi 1 Challenge Server</h2>`);
});


server.use(express.json());

module.exports = server;
