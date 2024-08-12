// @ts-expect-error no types
import prettierOptions from 'config/prettier/library.js';

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  ...prettierOptions,
  plugins: [
    ...prettierOptions.plugins,
  ],
};

export default config;
