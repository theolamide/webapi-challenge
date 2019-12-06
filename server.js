const express = require('express');

const actionsRouter = require('./ClientRouters/actionRouter')

const server = express();

server.get('/', (req, res) => {
    res.send(`<h2>This is the Webapi 1 Challenge Server</h2>`);
});


server.use('/api/actions', actionsRouter)
// server.use(express.json());

module.exports = server;
