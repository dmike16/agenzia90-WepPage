/**
 * Gulp File : studio90srls
 * Author    : dmike16
 * Email     : cipmiky@gmail.com
 * Version   : 3.0
 *
 */

// NodeJS dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var pump = require('pump');
var os = require('os');
var fs = require('fs');
var del = require('del');
var vinyl_paths = require('vinyl-paths');
var pkg = require('./package.json');
const sep = require('path').sep;
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
const gjs = ['script/src/*.js'];
const gjs_min = ['script/min/*.js'];
const gjs_dep = ['bower_components/**/material.min.js'];
const gcss = ['styles/**/*.css'];
const gfonts = ['styles/**/fonts/*'];
const gimages = ['images/**/*.{svg,png,jpg,ico}'];
const ghtml = ['*.html'];
const g_to_install = [].concat(gimages, gfonts, gjs_dep, gjs_min, gcss, ghtml);

gulp.task('install', (cb) => {
  gutil.log('BUILD TYPE :', args.type);
  gutil.log('INSTALL in :', args.installDir);
  pump([
      gulp.src(g_to_install, {
        base: './'
      }),
      gulp.dest(args.installDir)
    ],
    cb);
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

gulp.task('default', phony);

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

function _rmdircb(err){

}
