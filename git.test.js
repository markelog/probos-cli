const git = require('./git');

test('get result from git', () => {
  return git().then(data => {
    expect(data.repository).toEqual('github.com/markelog/probos-cli');

    const { name, commit } = data.branch;

    expect(name).toEqual('master');

    const { hash, author, message } = commit;
    expect(hash).toEqual(expect.not.stringContaining('undefined'));
    expect(author).toEqual(expect.not.stringContaining('undefined'));
    expect(message).toEqual(expect.not.stringContaining('undefined'));
  });
});
