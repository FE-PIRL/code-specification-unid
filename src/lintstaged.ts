/** @format */

module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{less,postcss,css,scss,vue}': ['stylelint --fix', 'prettier --write'],
};
