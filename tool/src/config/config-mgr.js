const chalk = require('chalk');
const { cosmiconfigSync } = require('cosmiconfig');
const configLoader = cosmiconfigSync('tool');
const schema = require('./schema.json');
const betterAjvErrors = require('better-ajv-errors').default;
const Ajv = require('ajv').default;
const ajv = new Ajv();
const createLogger = require('../logger');

const logger = createLogger('config:mgr');

module.exports = function getConfig() {
  const result = configLoader.search(process.cwd());
  if (result) {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warn('Invalid configuration was supplied');
      logger.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug('Found configuration', result.config);
    return result.config;
  } else {
    logger.debug('Could not find configuration, using default...');
    return { port: 1234 };
  }
}