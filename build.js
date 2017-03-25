const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const rimraf = require('rimraf');
const less = require('less');
const ng2Inline = require('./build-helpers/inliner');

const compileLess = (dir) => {
  let files = fs.readdirSync(dir);

  files.forEach((file) => {
    const src = path.join(dir, file);

    if (fs.statSync(src).isDirectory()) {
      compileLess(src);
    }
    else if (src.endsWith('.less')) {
      less.render(fs.readFileSync(src).toString(), {
        filename: path.resolve(src)
      }, (e, out) => {
        if (e) {
          console.error(e);
          process.exit(1);
        }

        fs.writeFileSync(src.replace('.less', '.css'), out.css);
        console.log(src + ' was compiled by less');
      });
    }
  });
};

const inline = (dir) => {
  let files = fs.readdirSync(dir);

  files.forEach((file) => {
    const src = path.join(dir, file);

    if (fs.statSync(src).isDirectory()) {
      inline(src);
    }
    else if (src.endsWith('.component.ts')) {
      ng2Inline(fs.readFileSync(src, 'utf-8'), {
        base: dir
      }, dir).then((file) => {
        fs.writeFileSync(src, file);
      });
    }
  });
};

console.log('cleaning...');
rimraf.sync('prebuild', fs, (error) => {
  if (err) {
    return console.error(err);
  }
});

rimraf.sync('aot', fs, (error) => {
  if (err) {
    return console.error(err);
  }
});

console.log('done cleaning!');

console.log('coping src...');
ncp('src', 'prebuild', (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('done coping src!');

  // compileLess(path.resolve('./prebuild/'));
  inline(path.resolve('./prebuild/'));
});