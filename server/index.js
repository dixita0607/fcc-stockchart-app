const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

mongoose.Promise = global.Promise;

app.use(express.static(path.resolve(__dirname, '../dist')));

io.on('connection', socket => {
  console.log('A user connected');
  socket.on('disconnected', () => {
    console.log('A user disconnected');
  })
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', require('./api'));

mongoose.connect(process.env.DB_URL, {useMongoClient: true})
  .then(() => {
    console.log('connected to database');
    server.listen(8000);
  })
  .catch(() => console.log('could not connect to database'));
