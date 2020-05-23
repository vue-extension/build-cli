/**
 * Gulp file to build the ant-design-vue-helper extensions for vscode
 * @author Zou Jian <https://github.com/chsword>
 */
import { task } from "gulp";
import versionManagerInstaller from "./tasks/versionUp";
versionManagerInstaller(task);
import buildManagerInstaller from "./tasks/build";
buildManagerInstaller(task);