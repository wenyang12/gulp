/**
 * gulp-ssi, base @tools/ssi
 * @author luoying
 */

'use strict';

const through2 = require('through2');
const ssi = require('@tools/ssi');

module.exports = (options) => {
  let opts = Object.assign({
    root: '',
    filename: ''
  }, options || {});

  return through2.obj((file, enc, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    opts.root = file.base;
    opts.filename = file.path;

    let html = file.contents.toString();
    let data = ssi.render(html, opts);
    file.contents = new Buffer(data);
    callback(null, file);
  });
};
