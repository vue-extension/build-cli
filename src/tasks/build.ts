import print from '../print';
import { series, src, dest } from "gulp";
import * as babel from "gulp-babel";
import * as path from 'path';
import * as clean from "gulp-clean";

class BuildManager {
    buildLib() {
        print.success(path.resolve('./src/**/*.ts'), process.versions.node)
        return src(path.resolve('./src/**/*.ts'))
            .pipe(babel({
                babelrc: false,
                configFile: false,
                presets: [
                    '@babel/preset-typescript',
                    ['@babel/preset-env', {
                        modules: 'cjs',
                        targets: { "node": process.versions.node }
                    }],
                    "@babel/preset-flow"
                ],
                plugins: [
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-do-expressions',
                    '@babel/plugin-proposal-class-properties',
                    "@babel/plugin-transform-runtime"
                ],
            }))
            .pipe(dest(path.resolve('./lib')));
    }
    buildEs() {
        print.note(`build ${path.resolve('./src/**/*.ts')} to es`)
        return src(path.resolve('./src/**/*.ts'))
            .pipe(babel({
                babelrc: false,
                configFile: false,
                presets: [
                    '@babel/preset-typescript',
                    ['@babel/preset-env', {
                        modules: false,
                        targets: {
                            browsers: ['last 2 versions', 'IE 10']
                        }
                    }],
                    "@babel/preset-flow"
                ],
                plugins: [
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-do-expressions',
                    '@babel/plugin-proposal-class-properties',
                    "@babel/plugin-transform-runtime"
                ],
            }))
            .pipe(dest(path.resolve('./es')));
    }
    run(watch: boolean = false) {
        // if (isLerna(cwd)) {
        //     const dirs = readdirSync(join(cwd, 'packages'))
        //         .filter(dir => dir.charAt(0) !== '.');
        //     pkgCount = dirs.length;
        //     dirs.forEach(pkg => {
        //         build(`./packages/${pkg}`, {
        //             cwd,
        //             watch,
        //         });
        //     });
        // } else {
        //     pkgCount = 1;
        //     build('./', {
        //         cwd,
        //         watch,
        //     });
        // }
    }
    cleanLib() {
        return src('./lib', { read: false, allowEmpty: true })
            .pipe(clean());
    };
    cleanEs() {
        return src('./es', { read: false, allowEmpty: true })
            .pipe(clean());
    };
}
var buildManager = new BuildManager;
export default (task) => {
    task('clean:lib', buildManager.cleanLib);
    task('clean:es', buildManager.cleanEs);
    task("clean", series(buildManager.cleanLib, buildManager.cleanEs))
    task("build:es", buildManager.buildEs)
    task("build:lib", buildManager.buildLib)
    task("build", series(buildManager.cleanLib, buildManager.cleanEs, buildManager.buildLib, buildManager.buildEs))
}