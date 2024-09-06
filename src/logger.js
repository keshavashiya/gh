const logger = (namespace) => {
    return {
      async debug(message, ...args) {
        const chalk = await import('chalk');
        console.log(`${chalk.default.blue(`[DEBUG] [${namespace}]`)} ${message}`, ...args);
      },
      async info(message, ...args) {
        const chalk = await import('chalk');
        console.log(`${chalk.default.green(`[INFO] [${namespace}]`)} ${message}`, ...args);
      },
      async warn(message, ...args) {
        const chalk = await import('chalk');
        console.warn(`${chalk.default.yellow(`[WARN] [${namespace}]`)} ${message}`, ...args);
      },
      async error(message, ...args) {
        const chalk = await import('chalk');
        console.error(`${chalk.default.red(`[ERROR] [${namespace}]`)} ${message}`, ...args);
      },
    };
  };

  module.exports =  logger;
