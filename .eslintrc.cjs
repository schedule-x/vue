module.exports = {
  extends: ['@schedule-x/eslint-config', 'plugin:vue/vue3-recommended'],
  rules: {},
  ignorePatterns: ['development/shims-vue.d.ts'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue', '.ts'],
  },
}
