import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var gulp = require("gulp");

var TaskManager = /*#__PURE__*/function () {
  function TaskManager() {
    _classCallCheck(this, TaskManager);
  }

  _createClass(TaskManager, [{
    key: "runTask",
    value: function runTask(toRun) {
      var metadata = {
        task: toRun
      }; // Gulp >= 4.0.0 (doesn't support events)

      var taskInstance = gulp.task(toRun);

      if (taskInstance === undefined) {
        gulp.emit('task_not_found', metadata);
        return;
      }

      var start = process.hrtime();
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
  }]);

  return TaskManager;
}();

export default new TaskManager();