const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logsError = path.join(__dirname, '../logs/error.log');
const logsInfo = path.join(__dirname, '../logs/info.log');
const { prettyPrint } = require('winston').format;

const messageError = text =>
  `${text || 'Error'}: More details in logfile - error.log `;

const filter = format(el => (el.level === 'info' ? el : false));

const winston = createLogger({
  transports: [
    new transports.File({
      filename: logsError,
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint())
    }),
    new transports.File({
      filename: logsInfo,
      level: 'info',
      format: format.combine(filter(), format.timestamp(), format.prettyPrint())
    })
  ]
});

const logger = (req, res) => {
  const { statusCode: status } = res;
  const { query, body, originalUrl: url, method, stack } = req;
  const message = { query, body, url, method, status };

  if (status < 400) {
    winston.info(message);
  } else {
    stack && (message.stack = stack);
    winston.error(message);
  }
};

const uncaughtException = (message, text) => {
  process.stderr.write(messageError(text));
  winston.error(message);
  // eslint-disable-next-line no-process-exit
  winston.on('finish', () => process.exit(1));
};

const unhandledRejection = (message, text) => {
  process.stderr.write(messageError(text));
  // eslint-disable-next-line no-sync
  fs.writeFileSync(logsError, prettyPrint(JSON.parse(message)), {
    flag: 'a'
  });
  // eslint-disable-next-line no-process-exit
  process.exit(1);
};

module.exports = {
  winston,
  logger,
  logsError,
  uncaughtException,
  unhandledRejection
};
