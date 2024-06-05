#!/usr/bin/env node
const arg = require('arg');
const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');
const createLogger = require('../src/logger');

const logger = createLogger('bin');

async function main() {
  try {
    const args = arg({
      '--start': Boolean,
      '--build': Boolean,
    });

    logger.debug('Received args', args);

    if (args['--start']) {
      const config = getConfig();
      start(config);
    }
  } catch (error) {
    console.log(error);
    console.error(chalk.blue(error.message));
    usageMenu();
  }
}

function usageMenu() {
  console.log(`
  ${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStart the CLI
  ${chalk.greenBright('--build')}\tBuilds the CLI
  `);
}

main();