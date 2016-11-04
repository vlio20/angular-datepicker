const gulp = require('gulp');
const inlineTemplate = require('gulp-inline-ng2-template');
const tsc = require('gulp-typescript');
const less = require('less');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const tsProject1 = tsc.createProject('tsconfig.json');
const tsProject2 = tsc.createProject('tsconfig.json');
const tsProject3 = tsc.createProject('tsconfig.json');

const pluginOptions = {
  base: './src/app/',
  useRelativePaths: true,
  styleProcessor: (path, ext, file, cb) => {
    less.render(file, (e, out) => {
      cb(null, out.css);
    });
  }
};

gulp.task('build', () => {
  const src = gulp.src(['./src/**/*.ts', '!./src/**/*.spec.ts']);
  const dst = gulp.dest('./bin');

  const jsMap1 = src
    .pipe(tsProject1())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'));

  const jsMap2 = src
    .pipe(inlineTemplate(pluginOptions))
    .pipe(tsProject2())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'));

  const dts = src.pipe(tsProject3());

  return merge([
    jsMap1.pipe(dst),   // writes .js and .map files
    jsMap2.pipe(dst),   // writes .js and .map files
    dts.dts.pipe(dst)  // writes .d.ts files
  ]);
});