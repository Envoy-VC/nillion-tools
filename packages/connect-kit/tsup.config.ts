import { defineConfig, type Options } from 'tsup';

const commonConfig: Options = {
  // treeshake: true,
  sourcemap: true,
  minify: true,
  shims: true,
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  target: ['es6', 'es2022'],
  tsconfig: 'tsconfig.json',
  banner: {
    js: "'use client';",
  },
  injectStyle: true,
  external: ['react'],
};

export default defineConfig([
  {
    entry: ['./src/index.tsx'],
    outDir: 'dist/',
    ...commonConfig,
  },
]);
