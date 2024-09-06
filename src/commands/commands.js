const getLogger = (() => {
  let loggerInstance = null;

  return async () => {
    if (!loggerInstance) {
      const { default: loggerFactory } = await import("../logger.js");
      loggerInstance = loggerFactory("commands");
    }
    return loggerInstance;
  };
})();

async function fetchGitHubActivity(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        "User-Agent": "node.js",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found. Please check the username.");
    } else {
      throw new Error(`Error fetching data: ${response.status}`);
    }
  }

  return response.json();
}

async function displayActivity(events) {
  const chalk = await import("chalk");
  if (events.length === 0) {
    console.log("- No recent activity found.");
    return;
  }

  events.forEach((event) => {
    let action;
    switch (event.type) {
      case "PushEvent":
        const commitCount = event.payload.commits.length;
        action = `${chalk.default.yellow("Pushed")} ${chalk.default.greenBright(
          `${commitCount}`
        )} commit(s) to ${chalk.default.blue(event.repo.name)}`;
        break;
      case "IssuesEvent":
        action = `${
          event.payload.action.charAt(0).toUpperCase() +
          event.payload.action.slice(1)
        } an issue in ${chalk.default.blue(event.repo.name)}`;
        break;
      case "WatchEvent":
        action = `${chalk.default.yellow("Starred")} ${chalk.default.blue(
          event.repo.name
        )}`;
        break;
      case "ForkEvent":
        action = `${chalk.default.yellow("Forked")} ${chalk.default.blue(
          event.repo.name
        )}`;
        break;
      case "CreateEvent":
        action = `${chalk.default.yellow("Created")} ${
          event.payload.ref_type
        } ${`${
          event.payload.ref_type !== "repository"
            ? `${chalk.default.greenBright(event.payload.ref)} in `
            : ""
        }`}${chalk.default.blue(event.repo.name)}`;
        break;
      case "PullRequestEvent":
        action = `${chalk.default.yellow("Pull Request")} ${
          event.payload.action
        } in ${chalk.default.blue(event.repo.name)}`;
        break;
      default:
        action = `${event.type.replace("Event", "")} in ${chalk.default.blue(
          event.repo.name
        )}`;
        break;
    }
    console.log(`- ${action}`);
  });
}

module.exports = {
  async getUserActivity(username) {
    const logger = await getLogger();
    if (!username) {
      logger.error("github username is required");
      return;
    }
    fetchGitHubActivity(username)
      .then((events) => {
        displayActivity(events);
      })
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  },
};
