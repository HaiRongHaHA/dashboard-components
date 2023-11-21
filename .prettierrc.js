module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
}
