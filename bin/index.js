#!/usr/bin/env node
const arg = require("arg");

(async () => {
  try {
    const chalk = await import("chalk");
    const { getUserActivity } = (await import("../src/commands/commands.js"))
      .default;

    // Parse positional arguments
    const args = arg({}, { permissive: true });
    const [command] = args._; // Extract command as username

    // Execute the appropriate command
    if (command) {
      await getUserActivity(command);
    } else {
      usage(chalk);
    }
  } catch (e) {
    console.error(e.message);
    const chalk = await import("chalk");
    usage(chalk);
  }

  function usage(chalk) {
    console.log();
    console.log(`Commands:
    ${chalk.default.greenBright(
      "<username>"
    )}\t\tGitHub username to fetch activity
    `);
  }
})();
