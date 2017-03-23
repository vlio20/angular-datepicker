const gulp = require('gulp');
const inlineTemplate = require('gulp-inline-ng2-template');
const tsc = require('gulp-typescript');
const less = require('less');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const tsProject = tsc.createProject('tsconfig.json');
const path = require('path');
const fs = require('fs');

const pluginOptions = {
  base: './src/app/',
  useRelativePaths: true,
  styleProcessor: (src, ext, file, cb) => {
    less.render(fs.readFileSync(src).toString(), {
      filename: path.resolve(src)
    }, (e, out) => {
      if (e) {
        console.error(e);
        process.exit(1);
      }
      cb(null, out.css);
    });
  }
};

gulp.task('build', () => {
  const tsResult = gulp.src(['./src/**/*.ts', '!./src/**/*.spec.ts'])
    .pipe(sourcemaps.init())
    .pipe(inlineTemplate(pluginOptions))

    .pipe(tsProject());

  return merge([
    tsResult.js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./bin')),
    tsResult.dts
      .pipe(gulp.dest('./bin'))
  ]);
});