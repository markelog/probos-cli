const LCL = require('last-commit-log');
const path = require('path');
const url = require('url');

module.exports = function git(gitpath) {
  const lcl = new LCL(gitpath);
  return lcl
    .getLastCommit()
    .then(commit => {
      const commiterDate = new Date(+`${commit.committer.date}000`);
      const authorDate = new Date(+`${commit.author.date}000`);

      commit.committer.date = commiterDate.toISOString();
      commit.author.date = authorDate.toISOString();

      return commit;
    })
    .then(commit => {
      const { gitUrl, gitBranch, hash, subject, committer } = commit;
      const { name, email, date } = committer;

      var protocol = url.parse(gitUrl).protocol;
      return {
        name: gitUrl.slice(`${protocol}//`.length),
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
    });
};
