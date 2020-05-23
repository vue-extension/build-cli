#!/usr/bin/env node
// https://github.com/tumerorkun/v-up/blob/master/index.js
import print from '../print';
const fs = require('fs');
type PartName = "patch" | "major" | "minor";

const jsonParse = str => JSON.parse(str);
const packageJsonFile = fs.readFileSync(process.cwd() + '/package.json', 'utf8');
const packageJSON = jsonParse(packageJsonFile);
const oldVersion = packageJSON.version;
let newVersion;
const [major, minor, patch] = packageJSON.version.split('.').map(e => Number(e));

class VersionManager {
  up(partName: PartName) {
    if (this.cases.hasOwnProperty(partName)) {
      this.cases[partName]();
    }
  }
  private changeVersion = (version) => {
    newVersion = packageJSON.version = version;
    fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(packageJSON, null, 2) + '\n', 'utf8');
    print.log('');
    print.primary('Version updated')
    print.red(`  old version -> ${oldVersion}`)
    print.green(`  new version -> ${newVersion}`)
    print.log('');
  }

  cases = {
    patch: () => {
      const newVersion = `${major}.${minor}.${patch + 1}`;
      this.changeVersion(newVersion);
    },
    minor: () => {
      const newVersion = `${major}.${minor + 1}.${0}`;
      this.changeVersion(newVersion);
    },
    major: () => {
      const newVersion = `${major + 1}.${0}.${0}`;
      this.changeVersion(newVersion);
    },
  }
}
const versionManager = new VersionManager();
export default (task: Function) => {
  task("major-up", versionManager.cases.major);
  task("minor-up", versionManager.cases.minor);
  task("patch-up", versionManager.cases.patch);
};
