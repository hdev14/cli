const createLogger = require('../logger');

const logger = createLogger('commands:start');

module.exports = function start(config) {
  logger.highlight('Starting the app');
  logger.debug('Received configuration in start - ', config);
}