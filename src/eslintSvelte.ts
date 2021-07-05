import tsEslintConfig from './tsEslintConfig';
import * as path from 'path';
import * as fs from 'fs';

const parserOptions = {
  allowImportExportEverywhere: true,
  ecmaVersion: 2020,
  sourceType: 'module',
  extraFileExtensions: ['.svelte']
};

const isJsMoreTs = async (path = 'src') => {
  const fg = require('fast-glob');
  const jsFiles = await fg(`${path}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${path}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

const isTsProject = fs.existsSync(path.join(process.cwd() || '.', './tsconfig.json'));
if (isTsProject) {
  try {
    isJsMoreTs(process.cwd()).then((jsMoreTs) => {
      if (!jsMoreTs) return;
      console.log('这是一个 TypeScript 项目，如果不是请删除 tsconfig.json');
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  ignorePatterns: ['.*.js'],
  extends: (isTsProject ? ['plugin:@typescript-eslint/recommended'] : ['eslint:recommended']),
  parser: isTsProject ? '@typescript-eslint/parser' : '@babel/eslint-parser',
  plugins: ['eslint-comments', 'jest', 'unicorn', 'filename', 'svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'filename/match': [2, ['camelcase', 'pascalcase']],
    ...(isTsProject ? tsEslintConfig : {}),
  },
  settings: {
    'svelte3/typescript': require('typescript'),
    // ignore style tags in Svelte because of Tailwind CSS
    // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
    'svelte3/ignore-styles': () => true,
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.svelte'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.svelte'],
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.svelte'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  parserOptions: isTsProject ? Object.assign(parserOptions, { project: './tsconfig.json' }) : parserOptions,
};
