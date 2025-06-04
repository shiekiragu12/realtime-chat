const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
// socket ui setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
