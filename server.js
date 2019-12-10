const express = require('express');
const cors = require('cors');


const actionsRouter = require('./ClientRouters/projectRouter')

const server = express();

server.use(cors());

server.get('/', (req, res) => {
    res.send(`<h2>This is the Webapi 1 Challenge Server</h2>`);
});


server.use('/api/projects', actionsRouter)

// server.use(express.json());

module.exports = server;
