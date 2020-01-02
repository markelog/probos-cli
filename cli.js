#!/usr/bin/env node
"use strict";
const meow = require("meow");

const index = require(".");

const cli = meow(
  `
	Usage
	  $ probos <...files>

  Options
	  --root, -r Pass a path to the root git directory

	Examples
    $ probos dist/index.js
    $ probos --root=~/Workspace/project dist/index.js
`,
  {
    flags: {
      rainbow: {
			type: 'string',
			alias: 'r'
		}
  }
});

index(cli.input, cli.flags);
