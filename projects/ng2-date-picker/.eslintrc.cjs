const path = require('path');

module.exports = {
  root: false,
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.lib.json', 'tsconfig.spec.json'],
        tsconfigRootDir: path.join(__dirname),
        createDefaultProgram: true
      },
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
    },
    { files: ['*.html'], rules: {} }
  ]
};
