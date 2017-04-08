const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const rimraf = require('rimraf');
const less = require('less');
const ng2Inline = require('./build-helpers/inliner');

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
rimraf.sync('prebuild', fs, (err) => {
  if (err) {
    return console.error(err);
  }
});

rimraf.sync('aot', fs, (err) => {
  if (err) {
    return console.error(err);
  }
});

console.log('done cleaning!');

console.log('cloning src...');
ncp('src', 'prebuild', (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('done cloning src!');

  console.log('inlining...');
  inline(path.resolve('./prebuild/'));
  console.log('done inlining!');

  console.log('ready for ngc!');
});