#!/usr/bin/env node

/**
 * vext-cli command line
 * @author Zou Jian <https://github.com/chsword>
 */

var _require = require('commander'),
    createCommand = _require.createCommand;

var program = createCommand();

var packageInfo = require('../../package.json');

program.version(packageInfo.version); // https://github.com/tj/commander.js/pull/260

var proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', function () {
    process.exit(1);
  });
}

process.on('SIGINT', function () {
  if (proc) {
    proc.kill('SIGKILL');
  }

  process.exit(0);
});
var subCmd = program.args && program.args.length ? program.args[0] : "";

if (!subCmd || subCmd !== 'run') {
  program.help();
} else {
  program.command('run [name]', 'run specified task').parse(process.argv);
}