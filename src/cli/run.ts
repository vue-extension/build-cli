#!/usr/bin/env ts-node
/**
 * vext-cli-run command line
 * @author Zou Jian <https://github.com/chsword>
 */
import * as program from "commander";
import print from "../print";
import taskManager from "../taskManager";
program.on('--help', () => {
    print.log("");
    print.cyan("Command list:");
    print.note("version");
    print.keyword("major-up\t Increment the major version");
    print.keyword("minor-up\t Increment the minor version");
    print.keyword("patch-up\t Increment the patch version");
    print.note("build");
    print.keyword("clean\t\t Clean all build files");
    print.keyword("clean:es\t Clean es build files");
    print.keyword("clean:lib\t Clean lib build files");
    print.keyword("build\t\t Build es / lib");
    print.keyword("build:es\t Build to es");
    print.keyword("build:lib\t Build to lib");
    print.log("");
});

program.parse(process.argv);
const task = program.args[0];
if (!task) {
    program.help();
} else if (task === 'server') {
    // const port = process.env.npm_package_config_port || 8000;
    // console.log(`Listening at http://localhost:${port}`);
    // const app = require('../server/')();
    // app.listen(port);
    print.warn("current parameter not support yet")
    print.log();
} else {
    print.keyword(`vext-cli run ${task}`);
    require('../gulpfile');
    taskManager.runTask(task);
}