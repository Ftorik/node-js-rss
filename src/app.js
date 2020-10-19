const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const mainRouter = require('./resources/mainRouter');
const morgan = require('morgan');
const { logger } = require('./logger/logger');
const { errorHandler } = require('./logger/error-handler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(morgan('dev'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

mainRouter(app);
app.use(errorHandler, logger);

module.exports = app;
