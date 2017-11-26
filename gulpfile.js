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
const fse = require('fs-extra');
const del = require('del');
const vinyl_paths = require('vinyl-paths');
const pkg = require('./package.json');
const sep = require('path').sep;
const broswerSync = require('browser-sync').create();
const broswerify = require('browserify');
const source = require('vinyl-source-stream');
const sourceMaps = require('gulp-sourcemaps');
const tsify = require('tsify');
const factorBundle = require('factor-bundle');
const watchify = require('watchify');
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
const gjs_min = ['src/assets/script/*.js'];
const gcss = ['src/assets/css/**/*.css'];
const gscss = ['src/app/mdl_studio90srls.scss'];
const gEntrify = ['src/main.ts', 'src/app/app.ts'];
const gts = ['src/main.ts', 'src/boot/*.ts','src/app/**/*.ts'];
const gfonts = ['src/assets/css/**/fonts/*'];
const gimages = ['src/assets/images/**/*.{svg,png,jpg,ico}'];
const ghtml = ['src/*.html'];
const g_to_install = [].concat(gimages, gfonts, gjs_min, gcss, ghtml);
const dist = 'dist';
//broswerify option
const optionify = {
  entries: ['src/main.ts','src/app/app.ts'],
  debug: true,
};

gulp.task('install', ['dist'], (cb) => {
  gutil.log('BUILD TYPE :', args.type);
  gutil.log('INSTALL in :', args.installDir);
  fse.copy(dist,args.installDir,cb);
});

gulp.task('dist',['js','sass']);

gulp.task('static-dist',(cb)=>{
  pump([
      gulp.src(g_to_install, {
        base: './src'
      }),
      gulp.dest(dist)
    ],
    cb);
});

gulp.task('sass',['static-dist'], (cb) => {
  _sassTranspiler(cb, gscss);
});

gulp.task('js',['static-dist'],(cb)=>{
  _broswerifyTs(cb,gts);
});

gulp.task('clean', () => {
  return new Promise((resolve, reject) => {
    gutil.log('Clean', args.installDir, '......');

    let vp = vinyl_paths();
    let g_to_clean = args.installDir + sep + '*';

    gulp.src(g_to_clean, {
        dot: true
      })
      .pipe(vp)
      .on('finish', () => {
        del(vp.paths, {
          force: true
        }).then(resolve).catch(reject);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
});

gulp.task('clobber', ['clean'], () => {
  return new Promise((resolve, reject) => {
    gutil.log('Clobber', args.installDir, '......');
    fse.rmdir(args.installDir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

gulp.task('broswersync', ['static-dist'],(cb) => {
  let params = {
    server: {
      baseDir: dist
    },
    ui: false,
    open: false,
    port: 4200
  };
  try {
    let ssl = require('./ssl.location.json');
    params.https = {
      key: ssl.key,
      cert: ssl.cert
    };
  } catch (e) {
    gutil.log('Fallback to http server:');
  }
  broswerSync.watch(gscss, (event, file) => {
    _sassTranspiler((err) => {
      if (err) {
        gutil.log(gutil.colors.red(err.message));
      }
    }, file);
  });
  broswerSync.watch('./src/index.html', (event, file) => {
    broswerSync.reload(file);
  });
  broswerSync.watch(gts, (event, file) => {
    if(event === 'add' && !optionify.entries.includes(file))return;
    _broswerifyTs((err) => {
      if (err) {
        gutil.log(gutil.colors.red(err.message));
      }
    }, file);
  });
  broswerSync.init(params);
});

gulp.task('default', () => {
  let data = {
    pkg: pkg,
    file: 'PLACEHOLDER'
  };
  gutil.log(gutil.template(BANNER, data));
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
/**
 * Parse scss files
 * @private
 */
function _sassTranspiler(cb, file) {
  gutil.log('PARSING SCSS FILE: ',file);
  pump([
    gulp.src(file),
    sass({
      outputStyle: (PROD === args.type ? 'compressed' : 'nested')
    }),
    gulp.dest(`${dist}/assets/css`),
    (PROD === args.type) ? gutil.noop() : broswerSync.stream()
  ], cb);
}

function _broswerifyTs(cb, file) {
  gutil.log('PARSING TS FILE: ',file);

  pump([broswerify(optionify).plugin(tsify)
    .plugin(factorBundle,{o:[`${dist}/main.js`,`${dist}/assets/script/app.js`]}).bundle(),
      source('./common.js'),
      gulp.dest(dist),
      (PROD === args.type) ? gutil.noop() : broswerSync.stream()
    ],
    cb);
}
