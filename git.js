const path = require('path');
const url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const LCL = require('last-commit-log');

async function getDefaultBranch() {
  const { stdout, stderr } = await exec('git symbolic-ref --short HEAD');

  return stdout.trim();
}

module.exports = async function git(gitpath) {
  const lcl = new LCL(gitpath);
  const commit = await lcl.getLastCommit();
  const defaultBranch = await getDefaultBranch();

  const commiterDate = new Date(+`${commit.committer.date}000`);
  const authorDate = new Date(+`${commit.author.date}000`);

  commit.committer.date = commiterDate.toISOString();
  commit.author.date = authorDate.toISOString();

  const { gitUrl, gitBranch, hash, subject, committer } = commit;
  const { name, email, date } = committer;
  const { protocol } = url.parse(gitUrl);

  return {
    repository: gitUrl.slice(`${protocol}//`.length),
    defaultBranch,
    branch: {
      name: gitBranch,
      commit: {
        hash,
        date,
        email,
        message: subject
      }
    }
  };
};
