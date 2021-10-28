module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      // 添加ES特性支持，使之能够识别ES6语法
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    camelcase: 'off',
    semi: 'off',
    quotes: ['error', 'single'],
    indent: ['off', 'tab'],
    'react/prop-types': 'off',
    // 'prettier/prettier': [
    // 	'error',
    // 	{},
    // 	{
    // 		usePrettierrc: true,
    // 	},
    // ],
  },
}
