import { defineConfig, type Options } from 'tsup';

const commonConfig: Options = {
  treeshake: true,
  sourcemap: true,
  minify: true,
  shims: true,
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  clean: true,
  target: ['es6', 'es2022'],
  tsconfig: 'tsconfig.json',
};

export default defineConfig([
  {
    entry: ['./src/webauthn/index.ts'],
    outDir: 'dist/webauthn',
    ...commonConfig,
  },
  {
    entry: ['./src/keychain/index.ts'],
    outDir: 'dist/keychain',
    ...commonConfig,
  },
]);
