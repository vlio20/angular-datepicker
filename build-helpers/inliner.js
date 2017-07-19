'use strict';

const fs = require('fs');
const path = require('path');
const less = require('less');

module.exports = function (content, options, targetDir) {
  options = options || {};
  options.base = options.base || './';

  return processStyleUrls(content, options, targetDir).then(
    (r) => processTemplateUrl(r, options, targetDir));
};

function processStyleUrls(content, options, targetDir) {
  let closure = content;
  let re = /styleUrls\s*:\s*(\[[^](.[^]*?)\])/g;
  let matches = closure.match(re);

  if (matches === null || matches.length <= 0) {
    return Promise.resolve(closure);
  }

  return Promise.all(matches.map(function () {
    let exec = re.exec(closure);
    let style = exec[0];
    let urls = exec[1];
    urls = urls.replace(/'/g, '"');
    urls = JSON.parse(urls);

    return Promise.all(urls.map(function (url) {
      let file = fs.readFileSync(getAbsoluteUrl(url, options, targetDir),
        'utf-8');

      let fileNamePartsRe = /^[\./]*([^]*)\.(css|less)$/g;
      let fileNamePartsMatches = url.match(fileNamePartsRe);
      if (fileNamePartsMatches === null || fileNamePartsMatches.length <= 0) {
        // Unsupported file mode / malformed url
        return file;
      }

      let fileNamePartsExec = fileNamePartsRe.exec(url);
      let fileName = fileNamePartsExec[1];
      let extension = fileNamePartsExec[2];
      let promise;
      if (extension === 'less') {
        promise = less.render(
          file,
          {
            paths: [options.base ? options.base : '.'],
            filename: targetDir ? path.join(targetDir, fileName) : fileName,
            compress: options.compress
          }
        ).then((output) => {
          return output.css;
        }, (e) => {
          throw e;
        });
      } else {
        promise = Promise.resolve(file);
      }

      return promise.then((processed) => {
        processed = processed.replace(/[\r\n]/g, '');

        // escape quote chars
        processed = processed.replace(new RegExp('\'', 'g'), '\\\'');
        return processed;
      });
    })).then((files) => {
      closure = closure.replace(style, 'styles: [\'' + files.join('') + '\']');
    });
  })).then(() => {
    return closure;
  });
}

function processTemplateUrl(content, options, targetDir) {
  let closure = content;
  let re = /templateUrl\s*:\s*(?:"([^"]+)"|'([^']+)')/g;
  let matches = closure.match(re);

  if (matches === null || matches.length <= 0) {
    return Promise.resolve(closure);
  }

  matches.forEach(function () {
    let exec = re.exec(closure);
    let template = exec[0];
    let quote;
    let url;

    if (exec[1]) {
      url = exec[1];
      quote = '"';
    } else {
      url = exec[2];
      quote = '\'';
    }

    let file = fs.readFileSync(getAbsoluteUrl(url, options, targetDir),
      'utf-8');

    file = file.replace(/\n|\t/g, ' ');

    // escape quote chars
    file = file.replace(new RegExp(quote, 'g'), '\\' + quote);

    closure = closure.replace(template, 'template: ' + quote + file + quote);
  });

  return Promise.resolve(closure);
}

function getAbsoluteUrl(url, options, targetDir) {
  return options.relative ? path.join(targetDir, url) :
    path.join(options.base, url);
}
