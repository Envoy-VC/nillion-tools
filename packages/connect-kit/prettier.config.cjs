const prettierOptions = require('config/prettier/library.js');

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  ...prettierOptions,
  // @ts-ignore
  plugins: [...prettierOptions.plugins],
};

module.exports = config;
