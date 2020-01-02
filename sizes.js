const path = require("path");
const fs = require("fs");

const gzipSize = require("gzip-size");

function getFilepath(rootDir, filepath) {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }

  if (rootDir === undefined) {
    return filepath;
  }

  return path.join(rootDir, filepath);
}

module.exports = function sizes(rootDir, paths) {
  const result = {};

  paths.forEach(filepath => {
    const fullpath = getFilepath(rootDir, filepath);
    const file = fs.readFileSync(fullpath);
    const { base } = path.parse(fullpath);

    result[base] = {
      size: file.byteLength,
      gzip: gzipSize.sync(filepath)
    };
  });

  return result;
};
