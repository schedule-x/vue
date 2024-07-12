module.exports = {
  extends: ['@schedule-x/eslint-config', 'plugin:vue/vue3-recommended'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'max-lines': 1,
  },
  ignorePatterns: ['development/shims-vue.d.ts', 'dist/**'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue', '.ts'],
  },
}
