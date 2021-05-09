/** @format */

const eslintReact = require('./eslintReact');
const eslintVue2 = require('./eslintVue2');
const eslintVue3 = require('./eslintVue3');
const eslintSvelte = require('./eslintSvelte');
const stylelint = require('./stylelint');
const prettier = require('./prettier');
const commitlint = require('./commitlint');
const husky = require('./husky');
const lintstaged = require('./lintstaged');

module.exports = {
  stylelint,
  prettier,
  eslintReact,
  eslintVue2,
  eslintVue3,
  eslintSvelte,
  commitlint,
  husky,
  lintstaged,
};
