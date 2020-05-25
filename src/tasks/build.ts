import print from "../print";
import { series, src, dest } from "gulp";
const babel = require("gulp-babel");
import * as path from "path";
const clean = require("gulp-clean");

class BuildManager {
  buildLib() {
    print.log(path.resolve("./src/**/*.ts"));
    print.log(path.resolve("./lib"));
    return src(path.resolve("./src/**/*.ts"))
      .on("error", function (err) {
        console.log("buildLib Error!", err);
        this.end();
      })
      .pipe(
        babel({
          babelrc: false,
          configFile: false,
          presets: [
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: "auto",
                targets: { node: "current" },
              },
            ],
            "@babel/preset-flow",
          ],
          plugins: [
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-do-expressions",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
          ],
        })
      )
      .pipe(dest(path.resolve("./lib")));
  }
  buildEs() {
    print.log(path.resolve("./src/**/*.ts"));
    print.log(path.resolve("./es"));
    return src(path.resolve("./src/**/*.ts"))
      .on("error", function (err) {
        console.log("buildEs Error!", err);
        this.end();
      })
      .pipe(
        babel({
          babelrc: false,
          configFile: false,
          presets: [
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                targets: {
                  browsers: ["last 2 versions", "IE 10"],
                },
              },
            ],
            "@babel/preset-flow",
          ],
          plugins: [
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-do-expressions",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
          ],
        })
      )
      .pipe(dest(path.resolve("./es")));
  }
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
}
var buildManager = new BuildManager();
export default (task) => {
  task("clean:lib", buildManager.cleanLib);
  task("clean:es", buildManager.cleanEs);
  task("clean", series(buildManager.cleanLib, buildManager.cleanEs));
  task("build:es", buildManager.buildEs);
  task("build:lib", buildManager.buildLib);
  task(
    "build",
    series(
      buildManager.cleanLib,
      buildManager.cleanEs,
      buildManager.buildLib,
      buildManager.buildEs
    )
  );
};
