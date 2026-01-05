import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      ignores: [
        'dist',
      ],
    },
    {
      languageOptions: {
        parserOptions: {
          project: [
            './tsconfig.node.json',
          ],
        },
      },
    },
  ],
})
