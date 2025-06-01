const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', routes);

app.use(errorHandler);

module.exports = app;
