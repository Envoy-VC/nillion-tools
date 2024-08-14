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
    entry: ['./src/index.ts'],
    outDir: 'dist/',
    ...commonConfig,
  },
  {
    entry: ['./src/webauthn/server/index.ts'],
    outDir: 'dist/webauthn/server',
    ...commonConfig,
  },
  {
    entry: ['./src/webauthn/index.ts'],
    outDir: 'dist/webauthn',
    ...commonConfig,
  },
  {
    entry: ['./src/webauthn/browser/index.ts'],
    outDir: 'dist/webauthn/browser',
    ...commonConfig,
  },
  {
    entry: ['./src/keychain/index.ts'],
    outDir: 'dist/keychain',
    ...commonConfig,
  },
  {
    entry: ['./src/storage/index.ts'],
    outDir: 'dist/storage',
    ...commonConfig,
  },
  {
    entry: ['./src/types/index.ts'],
    outDir: 'dist/types',
    ...commonConfig,
  },
]);
