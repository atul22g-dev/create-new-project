export default {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'comma-dangle': ['error', 'only-multiline'],
    'linebreak-style': 'off',
    'max-len': ['error', { code: 120 }],
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};
