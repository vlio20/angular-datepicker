const gulp = require('gulp');
const inlineTemplate = require('gulp-inline-ng2-template');
const tsc = require('gulp-typescript');
const less = require('less');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const tsProject1 = tsc.createProject('tsconfig.json');
const tsProject2 = tsc.createProject('tsconfig.json');

const pluginOptions = {
  base: './src/app/',
  useRelativePaths: true,
  templateProcessor: (path, ext, file, cb) => {
    cb(null, file);
  },
  styleProcessor: (path, ext, file, cb) => {
    less.render(file, (e, out) => {
      cb(null, out.css);
    });
  }
};

gulp.task('build', () => {
  const src = gulp.src(['!./src/**/*.spec.ts', './src/**/*.ts']);
  const dst = gulp.dest('./bin');

  const jsMap = src
    .pipe(inlineTemplate(pluginOptions))
    .pipe(tsProject1())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'));

  const dts = src.pipe(tsProject2());

  return merge([
    jsMap.pipe(dst),   // writes .js and .map files
    dts.dts.pipe(dst)  // writes .d.ts files
  ]);










  // const result = gulp.src(['./src/**/*.ts', '!./src/**/*.spec.ts'])
  //   //.pipe(sourcemaps.init())
  //   .pipe(inlineTemplate(pluginOptions))
  //   .pipe(tsc({
  //     "declaration": true,
  //     "emitDecoratorMetadata": true,
  //     "experimentalDecorators": true,
  //     "lib": ["es6", "dom"],
  //     "module": "commonjs",
  //     "moduleResolution": "node",
  //     "outDir": "./dist",
  //     "target": "es5",
  //     "typeRoots": [
  //       "../node_modules/@types"
  //     ]
  //   }));
  //
  // return result.js
  //   //.pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest('./dist'));
});