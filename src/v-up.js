#!/usr/bin/env node
// https://github.com/tumerorkun/v-up/blob/master/index.js
const fs = require('fs');

const jsonParse = str => JSON.parse(str);

const packageJsonFile = fs.readFileSync(process.cwd() + '/package.json', 'utf8');
const packageJSON = jsonParse(packageJsonFile);
const oldVersion = packageJSON.version;
let newVersion;
const [major, minor, patch] = packageJSON.version.split('.').map(e => Number(e));

const changeVersion = (version) => {
  newVersion = packageJSON.version = version;
  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(packageJSON, null, 2)+'\n', 'utf8');
}

const cases = {
  patch: () => {
    const newVersion = `${major}.${minor}.${patch + 1}`;
    changeVersion(newVersion);
  },
  minor: () => {
    const newVersion = `${major}.${minor + 1}.${0}`;
    changeVersion(newVersion);
  },
  major: () => {
    const newVersion = `${major + 1}.${0}.${0}`;
    changeVersion(newVersion);
  },
}

if (cases.hasOwnProperty(process.argv[2])) {
  cases[process.argv[2]]();
  console.log('');
  console.log('\x1b[36mVersion updated');
  console.log(` \x1b[31m old version -> ${oldVersion}`);
  console.log(` \x1b[32m new version -> ${newVersion}`);
  console.log('');
}