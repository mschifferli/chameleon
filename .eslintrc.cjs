/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended'
  ],
  env: {
    browser : true,
    es6 : true
  },
  parserOptions: {
    'sourceType' : 'module',
    'ecmaVersion' : 'latest'
  },
  ignorePatterns: ["**/wasm/*", ],
  rules: {
    'no-console': 'off', // Allow console.logs
    eqeqeq: 'warn', // Prefer === instead of ==
    'no-magic-numbers': 'off', // Don't allow magic numbers
    indent: ['error', 2], // Two spaces for indents
    'new-cap': 'warn', // Constructors should start with a capital letter
    'no-tabs': 'error', // NO TABS!
    'no-trailing-spaces': 'error', // No trailing whitespace
    'prefer-arrow-callback': 'warn', // Prefer arrow functions in callbacks
    'prefer-template': 'warn', // Use template literals instead of string concatenation
    'no-var': 'warn', // Prefer let and const over var
    'no-undef': 'warn', // Allow things that are not defined (google analytics) but warn,
    'no-unused-vars': 'warn', // Allow unused vars, but warn
    'no-unreachable': 'warn',
    'prefer-const'  : 'warn',
    'prefer-spread' : 'warn',
    'prefer-rest-params' : 'warn',
  }
};
