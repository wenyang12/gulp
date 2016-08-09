'use strict';

const path = require('path');
const through2 = require('through2');
const ssi = require('@tools/ssi');

module.exports = function(options) {
  let opts = Object.assign({
    root: '',
    filename: ''
  }, options || {});

  return through2.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    opts.root = path.dirname(file.path);
    opts.filename = file.path;

    let html = file.contents.toString();
    let data = ssi.render(html, opts);
    file.contents = new Buffer(data);
    callback(null, file);
  });
};
