const git = require('./git');

test('get result from git', () => {
  return git().then(data => {
    const { name, commit } = data.branch;
    const { hash, author, message } = commit;

    expect(data.repository).toEqual('github.com/markelog/probos-cli');
    expect(data.defaultBranch).toEqual('master');

    expect(name).toEqual(expect.not.stringContaining('undefined'));
    expect(hash).toEqual(expect.not.stringContaining('undefined'));
    expect(author).toEqual(expect.not.stringContaining('undefined'));
    expect(message).toEqual(expect.not.stringContaining('undefined'));
  });
});
