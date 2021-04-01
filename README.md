# code-specification-unid

中文文档看[这里](https://github.com/FE-PIRL/code-specification-unid/blob/master/README_CN.md)

Produced to solve the problem of inconsistent code specifications for multiple projects in the team.

It's a collection of unified configuration files including `prettier`, `eslint`, `stylelint`, `husky`, `lint-staged`, and `commitlint`.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License: MIT][license-image]][license-url]


> * **eslint** helps you find js errors and improve the quality of js code
> * **stylelint** helps you find css errors and improve the quality of css code
> * **Prettier** helps you format the code, unify code format
> * **Husky** and **lint-staged** run code inspections before submitting code to improve the quality of online code
> * **commitlint** helps you unify the commit message format


# Features

* All projects uniformly use an agreed code specification;
* Put a large number of third-party dependencies back to simplify business code;
* On the basis of inheriting the unified specification, still provide customization capabilities;
* Support React, Vue2, Vue3 projects, and support file name verification;

# Installation

```
npm install code-specification-unid --save-dev
```
Or 

```
yarn add code-specification-unid -D
```
> Note: Since `code-specification-unid` has already consolidated most of the code specification-related dependency packages that may be used, there is no need to reinstall the following dependencies.
If they are already installed, please delete them by yourself (including the corresponding configuration file):
```json
"@babel/core": "^7.12.10",
"@babel/eslint-parser": "^7.12.1",
"@babel/plugin-proposal-class-properties": "^7.13.0",
"@babel/plugin-proposal-decorators": "^7.13.5",
"@babel/preset-env": "^7.12.11",
"@babel/preset-react": "^7.12.10",
"@babel/preset-typescript": "^7.12.7",
"@commitlint/cli": "^11.0.0",
"@commitlint/config-conventional": "^11.0.0",
"@typescript-eslint/eslint-plugin": "^4.10.0",
"@typescript-eslint/parser": "^4.10.0",
"eslint": "^7.18.0",
"eslint-config-prettier": "^7.1.0",
"eslint-formatter-pretty": "^4.0.0",
"eslint-plugin-babel": "^5.3.0",
"eslint-plugin-compat": "^3.1.1",
"eslint-plugin-eslint-comments": "^3.1.1",
"eslint-plugin-import": "^2.17.3",
"eslint-plugin-jest": "^24.0.1",
"eslint-plugin-jsx-a11y": "^6.2.0",
"eslint-plugin-markdown": "^1.0.0",
"eslint-plugin-prettier": "^3.3.1",
"eslint-plugin-promise": "^4.1.1",
"eslint-plugin-react": "^7.22.0",
"eslint-plugin-react-hooks": "^4.2.0",
"eslint-plugin-unicorn": "^20.0.0",
"eslint-plugin-filename": "^1.0.0",
"eslint-plugin-vue": "^7.5.0",
"husky": "^4.3.8",
"lint-staged": "^10.5.3",
"prettier": "^2.2.1",
"stylelint": "^13.7.0",
"stylelint-config-css-modules": "^2.2.0",
"stylelint-config-prettier": "^8.0.2",
"stylelint-config-rational-order": "^0.1.2",
"stylelint-config-standard": "^20.0.0",
"stylelint-declaration-block-no-ignored-properties": "^2.1.0",
"stylelint-no-unsupported-browser-features": "^4.1.4",
"stylelint-order": "^4.0.0",
"stylelint-prettier": "^1.1.2",
```

# Configuration

### 1. Create configuration files as below;

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('code-specification-unid/dist/eslintReact')],
  rules: {
    // your rules
  },
};
```

> Note that for different projects, please import different eslint configuration packages
>
> react corresponds to `eslintReact`
>
> vue2 corresponds to `eslintVue2`
>
> vue3 corresponds to `eslintVue3`

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('code-specification-unid/dist/stylelint')],
  rules: {
    // your rules
  },
};
```

in `.prettierrc.js`

```js
const spec = require('code-specification-unid');

module.exports = {
    ...spec.prettier,
    // your rules
};
```

in `.huskyrc.js`

```js
const spec = require('code-specification-unid');

module.exports = {
    ...spec.husky,
    // your rules
};
```

in `.lintstagedrc.js`

```js
const spec = require('code-specification-unid');

module.exports = {
    ...spec.lintstaged,
    // your rules
};
```

in `.commitlintrc.js`

```js
const spec = require('code-specification-unid');

module.exports = {
    ...spec.commitlint,
    // your rules
};
```

#### File name verification (optional)

By default, file name verification does not require any configuration. The default rule is to support `camelcase` or `pascalcase` style file names.

It relies on the [`eslint-plugin-filename`](https://github.com/benyasin/eslint-plugin-filename) plugin to complete, and supports two forms of alias and custom regular.

The built-in aliases are `pascalcase`/`PascalCase`, `camelcase`/`camelCase`, `snakecase`/`snake_case`, `kebabcase`/`kebab-case`,
It also supports passing in multiple aliases in the form of an array.

E.g:

```js
  rules: {
    'filename/match': [2, 'camelcase'],
  },
```

Or

```js
  rules: {
    'filename/match': [2, ['camelcase','pascalcase']], //default configuration
  },
```

If the above built-in aliases cannot meet your needs, you can also customize regular expressions, for example:

```js
'filename/match': [2, /^([a-z]+-)*[a-z]+(?:\..*)?$/],
```

You can even use different rules for different file types, for example:

```js
'filename/match': [2, { '.js': 'camelCase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
```

### 2. Call command

If it is a react project, add the following command to the script of your project package.json:
```
"lint": "npm run lint:js && npm run lint:css && npm run lint:format",
"lint:js": "eslint src --fix --ext .js,.jsx,.ts,.tsx --cache --cache-location node_modules/.cache/eslint/",
"lint:css": "stylelint --fix \"src/**/*.{less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
"lint:format": "prettier --write  \"src/**/*.{js,json,ts,tsx,css,less,scss,html,md}\"",
```

If it is a vue project, add the following command to the script of your project package.json:

```
"lint": "npm run lint:js && npm run lint:css && npm run lint:format",
"lint:js": "eslint src --fix --ext .js,.jsx,.ts,.tsx,.vue --cache --cache-location node_modules/.cache/eslint/",
"lint:css": "stylelint --fix \"src/**/*.{less,postcss,css,scss,vue}\" --cache --cache-location node_modules/.cache/stylelint/",
"lint:format": "prettier --write  \"src/**/*.{js,json,ts,tsx,vue,css,less,scss,html,md}\"",
```

### Usage example

For a complete usage example, please refer to this [react-snowpack](https://github.com/benyasin/code-specification-unid-demo) example

# Changelog

1.0.3

* add eslint ignore pattern for `.*.js`

1.0.0 

* Initial release


# License

MIT

[npm-image]: https://img.shields.io/npm/v/code-specification-unid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/code-specification-unid
[downloads-image]: https://img.shields.io/npm/dm/code-specification-unid.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/code-specification-unid
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT