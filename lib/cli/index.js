#!/usr/bin/env node

/**
 * vext-cli command line
 * @author Zou Jian <https://github.com/chsword>
 */
"use strict";

const {
  createCommand
} = require('commander');

const program = createCommand();

const packageInfo = require('../../package.json');

program.version(packageInfo.version); // https://github.com/tj/commander.js/pull/260

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

process.on('SIGINT', () => {
  if (proc) {
    proc.kill('SIGKILL');
  }

  process.exit(0);
});
const subCmd = program.args && program.args.length ? program.args[0] : "";

if (!subCmd || subCmd !== 'run') {
  program.help();
} else {
  program.command('run [name]', 'run specified task').parse(process.argv);
}