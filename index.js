const express = require('express');

const server = express();

const port = 5000;

server.use('/', (req, res) => {
  res.status(200).send('Hello from express');
});

server.listen(port, () => console.log(`Listening on Port ${port}`));
