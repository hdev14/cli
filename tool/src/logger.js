const chalk = require('chalk');
const debug = require('debug');

module.exports = function createLogger(name) {
  return {
    log: (message, ...args) => console.log(chalk.gray(message), ...args),
    warn: (message, ...args) => console.log(chalk.yellow(message), ...args),
    highlight: (message, ...args) => console.log(chalk.bgCyanBright(message), ...args),
    debug: debug(name)
  };
}

