//import * as rollup from "rollup";
import { src, series, dest } from "gulp";
import fileManager from "../utils";
import * as rollup from "rollup";
const rollupTypescript = require("@rollup/plugin-typescript");
import * as path from "path";
import print from "../print";
const clean = require("gulp-clean");
type FormatType = "amd" | "cjs" | "esm" | "iife" | "umd";
import * as ts from "gulp-typescript";
async function buildFile(options: {
  fromDir: string;
  toDir: string;
  input: string;
  format: FormatType;
  sourcemap?: boolean;
}) {
  try {
    var output: string = options.input.replace(/\.ts$/gi, ".js");
    var sourceCode = path.join(options.fromDir, options.input);
    var destCode = path.join(options.toDir, output);
    const bundle = await rollup.rollup({
      input: sourceCode, // './src/gulpfile.ts',
      output: {
        dir: options.toDir,
        format: options.format,
      },
      plugins: [rollupTypescript()],
    });

    var ret = await bundle.write({
      file: destCode, //'./dist/gulpfile.js',
      format: options.format,
      name: "library",
      sourcemap: options.sourcemap || false,
    });

    print.success(`success build ${sourceCode} to ${destCode}`);
  } catch (err) {
    print.error(`file : ${options.input} error:${err}`);
  }
}
class BuildManager {
  cleanLib() {
    return src(path.resolve("./lib"), { read: false, allowEmpty: true }).pipe(
      clean()
    );
  }
  cleanEs() {
    return src(path.resolve("./es"), { read: false, allowEmpty: true }).pipe(
      clean()
    );
  }
  cleanTypes() {
    return src(path.resolve("./types"), { read: false, allowEmpty: true }).pipe(
      clean()
    );
  }
  cleanDist() {
    return src(path.resolve("./dist"), { read: false, allowEmpty: true }).pipe(
      clean()
    );
  }
  async buildLib() {
    // return src(path.resolve("./src/**/*.ts"))
    //   .pipe(buildRollup({}))
    //   .pipe(dest(path.resolve("./lib")));
    print.start("build:lib start");
    var fromDir = "./src",
      toDir = "./lib";
    var files = fileManager.getAllFiles(fromDir);

    return await Promise.all(
      files.map(async (file) => {
        await buildFile({ fromDir, toDir, input: file, format: "cjs" });
      })
    );
  }
  async buildEs() {
    print.start("build:es start");
    var fromDir = "./src",
      toDir = "./es";
    var files = fileManager.getAllFiles(fromDir);

    return await Promise.all(
      files.map(async (file) => {
        await buildFile({ fromDir, toDir, input: file, format: "esm" });
      })
    );
  }
  async buildTypes() {
    print.start("build:types start");
    var settings: ts.Settings = {
      declaration: true,
      module: "commonjs",
      target: "es6",
      lib: ["es7", "ScriptHost", "DOM"],
    };
    settings.de;
    var tsProject = ts.createProject(settings);
    var tsResult = src("src/**/*.ts").pipe(tsProject());

    return tsResult.dts.pipe(dest("./types"));
  }
}

var buildManager = new BuildManager();
export default (task) => {
  task("clean:lib", buildManager.cleanLib);
  task("clean:es", buildManager.cleanEs);
  task("clean:types", buildManager.cleanTypes);
  task(
    "clean",
    series(buildManager.cleanLib, buildManager.cleanEs, buildManager.cleanTypes, buildManager.cleanDist)
  );
  task("build:es", buildManager.buildEs);
  task("build:lib", buildManager.buildLib);
  task(
    "build",
    series(
      buildManager.cleanTypes,
      buildManager.cleanLib,
      buildManager.cleanEs,
      buildManager.buildLib,
      buildManager.buildEs,
      buildManager.buildTypes
    )
  );
  task("build:types", series(buildManager.cleanTypes, buildManager.buildTypes));
};
