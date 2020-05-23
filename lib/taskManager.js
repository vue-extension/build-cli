"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const gulp = require("gulp");

class TaskManager {
  runTask(toRun) {
    const metadata = {
      task: toRun
    }; // Gulp >= 4.0.0 (doesn't support events)

    const taskInstance = gulp.task(toRun);

    if (taskInstance === undefined) {
      gulp.emit('task_not_found', metadata);
      return;
    }

    const start = process.hrtime();
    gulp.emit('task_start', metadata);

    try {
      taskInstance.apply(gulp);
      metadata.hrDuration = process.hrtime(start);
      gulp.emit('task_stop', metadata);
      gulp.emit('stop');
    } catch (err) {
      err.hrDuration = process.hrtime(start);
      err.task = metadata.task;
      gulp.emit('task_err', err);
    }
  }

}

var _default = new TaskManager();

exports.default = _default;