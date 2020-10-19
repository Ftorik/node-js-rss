const { uncaughtException, unhandledRejection } = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send('Internal Server Error');
  }
  next();
};

process.on('uncaughtException', err => {
  uncaughtException(
    {
      type: 'uncaughtException',
      msg: 'Oops!',
      stack: err
    },
    err.message
  );
});

process.on('unhandledRejection', reason => {
  unhandledRejection(
    {
      message: {
        type: 'unhandledRejection',
        msg: reason.message
      },
      level: 'error',
      timestamp: new Date().toISOString()
    },
    reason.message
  );
});

module.exports = { errorHandler };
