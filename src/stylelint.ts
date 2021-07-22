"use strict";
/** @format */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-no-unsupported-browser-features',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-order', "stylelint-config-rational-order/plugin", "stylelint-scss", 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    // `standard` conflict with `rational-order`
    "declaration-empty-line-before": [
      "never",
      {
        except: ['after-comment', 'after-declaration', 'first-nested'],
        ignore: [
          "after-comment",
          "after-declaration",
          "first-nested",
          "inside-single-line-block",
        ],
      },
    ],
    "order/properties-order": [],
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": true,
    }],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/comment-no-empty": true,
    "scss/at-if-no-null": true,
    "scss/at-function-parentheses-space-before": "never",
    "scss/at-mixin-parentheses-space-before": "never",
    "scss/at-import-no-partial-leading-underscore": true,
    "scss/dollar-variable-colon-space-after": "always",
    "scss/double-slash-comment-empty-line-before": [
      "always",
      {
        "except": [
          "first-nested"
        ],
        "ignore": [
          "between-comments",
          "stylelint-commands"
        ]
      }
    ],
    "scss/no-duplicate-mixins": true,

    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "no-empty-source": null,
    "unicode-bom": "never",
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    //https://github.com/stylelint/stylelint/issues/4114
    "function-calc-no-invalid": null,
    "function-url-quotes": "always",
    "plugin/declaration-block-no-ignored-properties": true,
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
