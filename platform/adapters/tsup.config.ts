import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  external: [
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-dynamodb',
    '@pilotspan/core',
    '@pilotspan/services',
    'ulid',
  ],
  tsconfig: './tsconfig.json',
});
