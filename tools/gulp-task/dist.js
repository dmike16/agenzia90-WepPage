/**
 * Dist gulp tasks
 */

//Build task
exports.default = (gulp) => {
  const workboxBuild = require('workbox-build');
  const pump = require('pump');
  const path = require('path');

  gulp.task('build:app', (cb) => {
    const prodConfig = require('../config/webpack.prod');
    const webpack = require('webpack');
    const gulpWebpack = require('webpack-stream');

    pump([
      gulp.src(['./src/main.ts', './src/vendor.ts']),
      gulpWebpack(prodConfig, webpack),
      gulp.dest('./dist')
    ], cb);

  });

  gulp.task('build:sw', () => {
    return workboxBuild.injectManifest({
      swDest: path.join('./dist', 'studio90srls-sw.js'),
      swSrc: './src/studio90srls-sw.js',
      globDirectory: './dist',
      globPatterns: ['**/*.{html,js,css,svg,png}'],
      globIgnores: ['./node_modules/**/*'],
      maximumFileSizeToCacheInBytes: 20000000
    });
  });

  gulp.task('build:post', (cb) => {
    const rename = require('gulp-rename');
    pump([gulp.src(require.resolve('workbox-sw')),
      rename('workbox-sw.js'),
      gulp.dest('./dist')
    ], cb);
  });

  return (cb) => {
    const runSequence = require('run-sequence');
    runSequence('build:app', 'build:sw', 'build:post', cb);
  };
};

//Pack task
exports.pack = (gulp) => (cb) => {
  const zip = require('gulp-zip');
  const pump = require('pump');
  const {version} = require('../../../package.json');

  pump([
    gulp.src('./dist/**/*'),
    zip(`studio90srls-v${version}.zip`),
    gulp.dest('./release')
  ],cb);
};
