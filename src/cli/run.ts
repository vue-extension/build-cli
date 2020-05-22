#!/usr/bin/env node
/**
 * vuext-cli-run command line
 * @author Zou Jian <https://github.com/chsword>
 */
import * as program from "commander";
import print from "../print";
import taskManager from "../taskManager";
program.on('--help', () => {
    print.log("")
        .info("Command list:")
        .keyword("")
        .log("");
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
    print.warn("current parameter not support yet").log();
} else {
    print.keyword(`vuext-cli run ${task}`);
    require('../gulpfile');
    taskManager.runTask(task);
}