/**
 * Configuration Gulpfile
 * Studio90srls : https://studio90srls.it
 * Version: 3.0.0
 */

const gulp = require('gulp');

function loadTask(fileName,taskName){
  let task = require(`./tools/gulp-task/${fileName}`);
  return task[taskName || 'default'](gulp);
}

gulp.task('default',loadTask('default'));
gulp.task('serve',loadTask('serve'));
gulp.task('dist',loadTask('dist'));
gulp.task('pack',['dist'],loadTask('dist','pack'));
