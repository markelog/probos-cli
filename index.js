const chalk = require("chalk");

const git = require("./git");
const sizes = require("./sizes");
const send = require("./send");

module.exports = (paths, flags = {}) => {
  const rootDir = flags.root;

  if (paths.length === 0) {
    console.error(chalk.red("You have specify files to check"));
    process.exit(1);
    return;
  }

  let resultSizes;

  try {
    resultSizes = sizes(rootDir, paths);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }

  git(rootDir)
    .catch(error => {
      console.error(chalk.red(error));
      process.exit(1);
    })
    .then(project => {
      project.branch.commit.report = resultSizes;
      return {
        project
      };
    })
    .then(project => {
      send(project);
    })
    .catch(error => {
      console.error(chalk.red(error));
      process.exit(1);
    });
};
