const express = require('express');

//importing the posts CRUD module
const postsRoutes = require('./posts/postsRoutes');

const server = express();

const port = 5000;

server.use('/posts', postsRoutes);

// default route
server.use('/', (req, res) => {
  res.status(200).send('Hello from express');
});

server.listen(port, () => console.log(`Listening on Port ${port}`));