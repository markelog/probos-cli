# Probos CLI [![Node CI](https://github.com/markelog/probos-cli/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/markelog/probos-cli/actions)

> Takes the size/gzip and git info of the packages and submits them to probos

## Install

```sh
$ npm install probos
```

## Use

```sh
./cli.js --help

  Takes the size/gzip and git info of the packages and submits them to probos

  Usage
    $ probos <...files>

   Options
    --root, -r Pass a path to the root git directory

  Examples
     $ probos dist/index.js
     $ probos --root=~/Workspace/project dist/index.js
```
