#!/usr/bin/env node
/**
 * vuext-cli command line
 * @author Zou Jian <https://github.com/chsword>
 */
import * as program from "commander";
import print from "../print";
const packageInfo = require('../../package.json');
program
    .version(packageInfo.version)
    .command('run [name]', 'run specified task')
    .parse(process.argv);

// https://github.com/tj/commander.js/pull/260
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

const subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
    program.help();
} 