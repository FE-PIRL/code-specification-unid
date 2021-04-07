import tsEslintConfig from './tsEslintConfig';
import * as path from 'path';
import * as fs from 'fs';

const parserOptions = {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true,
    },
    extraFileExtensions: ['.vue'],
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
    extends: [
        'plugin:vue/base',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
        'prettier/vue',
    ]
        .concat(
            isTsProject ? ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'] : [],
        )
        .concat(['plugin:prettier/recommended']),
    parser: 'vue-eslint-parser',
    plugins: ['eslint-comments', 'jest', 'unicorn', 'filename'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    rules: {
        'prettier/prettier': 'error',
        'filename/match': [2, ['camelcase', 'pascalcase']],
        ...(isTsProject ? tsEslintConfig : {}),
    },
    settings: {
        // support import modules from TypeScript files in JavaScript files
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.vue'],
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.vue'],
        },
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.vue'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    },
    parserOptions: isTsProject ? Object.assign(parserOptions, { project: './tsconfig.json' }) : parserOptions,
};
