/**
 * Gulp file to build the ant-design-vue-helper extensions for vscode
 * @author Zou Jian <https://github.com/chsword>
 */
import { task, src, dest, series } from "gulp";
import print from "./print";
import versionManager from "./versionUp";
const test = function () {
    print.info("test").log();
    return;
};
task(test);
task("major-up", versionManager.cases.major);
task("minor-up", versionManager.cases.minor);
task("patch-up", versionManager.cases.patch);