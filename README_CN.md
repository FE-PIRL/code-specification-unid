# code-specification-unid

为了解决团队中多个项目代码规范不统一的问题而产生。 包含 `prettier`，`eslint`，`stylelint`, `husky`, `lint-staged`, `commitlint` 的统一配置文件合集.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![License: MIT][license-image]][license-url]

```
**eslint** 帮你发现js错误，提高js代码质量

**stylelint** 帮你发现css错误，提高css代码质量

**prettier** 帮你格式化代码，统一代码格式

**husky** 与**lint-staged** 在提交代码前进行代码检查，提高线上代码质量

**commitlint** 帮你统一commit消息格式
```

# 特性

* 所有的项目统一使用一份约定好的代码规范；
* 将大量的第三方依赖模块后置以精简业务代码；
* 继承统一规范的基础上仍然提供个性化定制能力；
* 支持React、Vue2、Vue3工程，且支持文件名校验；

# 安装

```
npm install code-specification-unid --save-dev
```
或者
```
yarn add code-specification-unid -D
```

# 配置

### 1. 创建以下配置文件，并按下面格式引入统一配置；

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('code-specification-unid/dist/eslintReact')],
  rules: {
    // your rules
  },
};
```

> 注意针对不同工程，请引入不同的eslint配置包
>
> react 对应 `eslintReact`
>
> vue2  对应 `eslintVue2`
>
> vue3  对应 `eslintVue3`

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
const spec = require('code-specification-unid2');

module.exports = {
    ...spec.prettier,
    // your rules
};
```

in `.huskyrc.js`

```js
const spec = require('code-specification-unid2');

module.exports = {
    ...spec.husky,
    // your rules
};
```

in `.lintstagedrc.js`

```js
const spec = require('code-specification-unid2');

module.exports = {
    ...spec.lintstaged,
    // your rules
};
```

in `.commitlintrc.js`

```js
const spec = require('code-specification-unid2');

module.exports = {
    ...spec.commitlint,
    // your rules
};
```

### 文件名校验(可选)

文件名校验在默认情况下，不需要做任何配置，默认规则是支持 `camelcase` 或 `pascalcase`风格的文件名。

它依赖 [`eslint-plugin-filename`](https://github.com/benyasin/code-specification-unid) 插件完成，支持别名与自定义正则两种形式。

内置的别名有 `pascalcase`/`PascalCase`, `camelcase`/`camelCase`, `snakecase`/`snake_case`, `kebabcase`/`kebab-case`，
还支持以数组的形式传入多个别名。

例如：

```js
  rules: {
    'filename/match': [2, 'camelcase'],
  },
```

或

```js
  rules: {
    'filename/match': [2, ['camelcase','pascalcase']], //此配置为默认配置
  },
```
如果上述内置的别名不能满足需求，你还可以自定义正则表达式，例如：

```js
'filename/match': [2, /^([a-z]+-)*[a-z]+(?:\..*)?$/],
```

甚至可以针对不同的文件类型使用不同的规则，例如：

```js
'filename/match': [2, { '.js': 'camelCase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
```

### 2. 调用示例

如果是react项目，在你项目package.json的script中添加以下命令：
```
"lint": "npm run lint:js && npm run lint:css && npm run lint:format",
"lint:js": "eslint src --fix --ext .js,.jsx,.ts,.tsx --cache --cache-location node_modules/.cache/eslint/",
"lint:css": "stylelint --fix \"src/**/*.{less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
"lint:format": "prettier --write  \"src/**/*.{js,json,ts,tsx,css,less,scss,html,md}\"",
```

如果是vue项目，在你项目package.json的script中添加以下命令：
```
"lint": "npm run lint:js && npm run lint:css && npm run lint:format",
"lint:js": "eslint src --fix --ext .js,.jsx,.ts,.tsx,.vue --cache --cache-location node_modules/.cache/eslint/",
"lint:css": "stylelint --fix \"src/**/*.{less,postcss,css,scss,vue}\" --cache --cache-location node_modules/.cache/stylelint/",
"lint:format": "prettier --write  \"src/**/*.{js,json,ts,tsx,vue,css,less,scss,html,md}\"",
```

# 更新日志

1.0.0 初始发布

# 协议

MIT


[npm-image]: https://img.shields.io/npm/v/code-specification-unid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/code-specification-unid
[downloads-image]: https://img.shields.io/npm/dm/code-specification-unid.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/code-specification-unid
[travis-image]: https://img.shields.io/travis/dolsem/code-specification-unid.svg?style=flat-square
[travis-url]: https://travis-ci.org/dolsem/code-specification-unid
[coverage-image]: https://img.shields.io/coveralls/dolsem/code-specification-unid.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/dolsem/code-specification-unid?branch=master
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT