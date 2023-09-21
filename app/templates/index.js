'use strict';

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

let templates = {
  resetPassword: {
    email: {
      subject: 'Password reset request',
      //   html: loadFile('./resetPassword-html.html'),
      plain: loadFile('./resetPassword-plain.html')
    }
  },
  userCreated: {
    email: {
      subject: 'User Created',
      plain: loadFile('./userCreated-plain.html'),
      html: loadFile('./userCreated-html.html')
    }
  }
};
module.exports = compileEJS(templates);

function loadFile(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath), 'utf8');
}

function compileEJS(object) {
  _.each(_.keys(object), (rootKey) => {
    _.each(_.keys(object[rootKey]), (tplType) => {
      _.each(_.keys(object[rootKey][tplType]), (tplKey) => {
        object[rootKey][tplType][tplKey] = ejs.compile(object[rootKey][tplType][tplKey]);
      });
    });
  });

  return object;
}
