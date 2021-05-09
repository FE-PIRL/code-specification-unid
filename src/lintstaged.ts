/** @format */

module.exports = {
  '*.{js,jsx,ts,tsx,vue,svelte}': ['eslint --fix', 'prettier --write'],
  '*.{less,postcss,css,scss,vue,svelte}': ['stylelint --fix', 'prettier --write'],
};
