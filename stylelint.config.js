module.exports = {
  plugins: [
    'stylelint-order',
    'stylelint-a11y'
  ],
  processors: [
    'stylelint-processor-styled-components'
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components'
  ],
  syntax: 'scss',
  rules: {
    'string-quotes': 'single',
    'value-keyword-case': ['lower', { ignoreKeywords: ['dummyValue'] }],
  },
  overrides: [
    {
      files: ['**/*.ss'],
      customSyntax: '@stylelint/postcss-css-in-js'
    }
  ]
}
