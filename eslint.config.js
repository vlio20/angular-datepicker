const { defineConfig } = require('eslint/config');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'dp', style: 'kebab-case' }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'dp', style: 'camelCase' }
      ],
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-standalone': 'warn',
      'no-console': ['error', { allow: ['info', 'error'] }],
      'no-debugger': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended],
    rules: {}
  },
  {
    files: ['projects/ng2-date-picker/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'dp', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'dp', style: 'kebab-case' }
      ],
      '@angular-eslint/prefer-inject': 'off'
    }
  }
]);
