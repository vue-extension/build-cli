import { PlatformPath } from "path";
import * as fs from "fs";
const path: PlatformPath = require("path");
// const fs = require('fs')
export class FileManager {
  rootPath: string;
  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  getAllFiles(basePath: string): string[] {
    var ctx = this;
    var result: Array<string> = [];
    var baseDir = path.resolve(basePath);
    var files = fs.readdirSync(baseDir);
    files.forEach((filename, index) => {
      const pathname = path.join(baseDir, filename);
      var stats = fs.statSync(pathname);
      if (stats.isDirectory()) {
        var subFiles = ctx.getAllFiles(pathname);
        result.push(...subFiles);
      } else if (stats.isFile()) {
        // if ([".json", ".less"].includes(path.extname(pathname))) {
        //   return;
        // }
        result.push(path.relative(ctx.rootPath, pathname));
      }
    });
    return result;
  }
}

export default new FileManager("./src");
