// @ts-expect-error no types
const prettierOptions = require('config/prettier/library.js');

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  ...prettierOptions,
  plugins: [...prettierOptions.plugins],
};

module.exports = config;
