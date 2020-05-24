//import * as rollup from "rollup";
import { src, dest, series } from "gulp";
import fileManager from "../utils";
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
import { PlatformPath } from "path";
const path: PlatformPath = require('path')
import print from '../print';

async function buildFile(fromDir: string, toDir: string, input: string) {
    try {
        var output: string = input.replace(/\.ts$/ig, ".js");
        var sourceCode = path.join(fromDir, input);
        const bundle = await rollup.rollup({
            input: sourceCode,// './src/gulpfile.ts',
            output: {
                dir: toDir,
                format: 'cjs'
            },
            plugins: [
                rollupTypescript()
            ]
        });
        var destCode = path.join(toDir, output);
        await bundle.write({
            file: destCode,//'./dist/gulpfile.js',
            format: 'umd',
            name: 'library',
            // sourcemap: true
        });
        print.success(`success build ${sourceCode} to ${destCode}`)
    } catch (err) {
        print.error(err)
    }
}
async function build() {
    var fromDir = "./src", toDir = "./dist"
    var files = await fileManager.getAllFiles(fromDir)
    files.forEach(file => {
        buildFile(fromDir, toDir, file)
    })
}

export default (task) => {
    task("build", build)
}