const LCL = require("last-commit-log");
const path = require('path')
const url = require('url');

module.exports = function git(gitpath) {
  const lcl = new LCL(gitpath); 
  return lcl.getLastCommit().then(commit => {
    commit.committer.date += '000';
    commit.committer.date += "000";
    return commit;
  }).then(commit => {
    const {gitUrl, gitBranch, hash, subject, commiter} = commit
    const {name, email, date} = commit

    var protocol = url.parse(gitUrl).protocol;
    return {
        repository: gitUrl.slice((`${protocol}//`).length),
        branch: {
          name: gitBranch,
          commit: {
            hash,
            author: `${name} <${email}>`,
            message: subject
          }
        }
      }
  });
}

