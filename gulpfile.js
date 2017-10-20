/**
 * Gulp File : studio90srls
 * Author    : dmike16
 * Email     : cipmiky@gmail.com
 * Version   : 3.0
 *
 */
//
// NodeJS dependencies
const gulp = require('gulp');
const gutil = require('gulp-util');
const header = require('gulp-header');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pump = require('pump');
const os = require('os');
const fs = require('fs');
const del = require('del');
const vinyl_paths = require('vinyl-paths');
const pkg = require('./package.json');
const sep = require('path').sep;
const broswerSync = require('browser-sync').create();
// Array of string containg all the task created
let phony = [];
// Type of build PRODACTION or SNAPSHOT
const SNAP = 'SNAPSHOT';
const PROD = 'PRODACTION';
// Parse the input argumnets
const args = _agumentsParse(gutil.env);
// Header banner
const BANNER = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @link https://github.com/dmike16/agenzia90-WepPage.git',
  '**/'
].join('\n');
// Define project glob src
const gjs = ['src/assets/script/src/*.js'];
const gjs_min = ['src/assets/script/min/*.js'];
const gcss = ['src/assets/css/**/*.css'];
const gscss = ['src/assets/scss/*.scss'];
const gfonts = ['src/assets/css/**/fonts/*'];
const gimages = ['src/assets/images/**/*.{svg,png,jpg,ico}'];
const ghtml = ['src/*.html'];
const g_to_install = [].concat(gimages, gfonts, gjs_min, gcss, ghtml);

gulp.task('install', ['sass'],(cb) => {
  gutil.log('BUILD TYPE :', args.type);
  gutil.log('INSTALL in :', args.installDir);
  pump([
      gulp.src(g_to_install, {
        base: './src'
      }),
      gulp.dest(args.installDir)
    ],
    cb);
});

gulp.task('sass',(cb)=>{
  gutil.log('PARSING SCSS FILES');
  pump([
    gulp.src(gscss),
    sass({outputStyle: 'compressed'}),
    gulp.dest('./src/assets/css'),
    (PROD===args.type)?gutil.noop():broswerSync.stream()
  ],cb);
});

gulp.task('clean',()=>{
  return new Promise((resolve,reject)=>{
    gutil.log('Clean',args.installDir,'......');

    let vp = vinyl_paths();
    let g_to_clean = args.installDir+sep+'*';

    gulp.src(g_to_clean,{dot:true})
    .pipe(vp)
    .on('finish',()=>{
      del(vp.paths,{force:true}).then(resolve).catch(reject);
    })
    .on('error',(err)=>{
      reject(err);
    });
  });
});

gulp.task('clobber', ['clean'],() => {
  return new Promise((resolve,reject)=>{
    gutil.log('Clobber',args.installDir,'......');
    fs.rmdir(args.installDir, (err) => {
      if (err) {
        reject(err);
      }else{
        resolve();
      }
    });
  });
});

gulp.task('broswersync',()=>{
  broswerSync.init({
    server:{
      baseDir: './src'
    },
    https:{
      key: '/Users/dmike/Development/tools/nginx/ssl/localhost.key',
      cert: '/Users/dmike/Development/tools/nginx/ssl/localhost.crt',
    },
    ui: false,
    open: false,
    port: 4200
  });

  gulp.watch('./src/assets/scss/**/*.scss',['sass']);
});

gulp.task('default', ()=>{
  let data = {
    pkg: pkg,
    file: 'PLACEHOLDER'
  };
  gutil.log(gutil.template(BANNER,data));
});

/**
 * Parse the commnad line argumnets.
 *
 * @private
 * @param       {Object} genv Gulp env object
 * @return      {Object}      Object containg the parsed arguments.
 */
function _agumentsParse(genv) {
  let _prefix = genv.prefix || os.homedir() + sep + 'Sites';
  let _type = genv.type || SNAP;
  let _baseDirName = genv.basename || 'studio90srls';
  let _installDir = _prefix + sep + _baseDirName;

  return {
    prefix: _prefix,
    type: _type,
    basename: _baseDirName,
    installDir: _installDir
  };
}
