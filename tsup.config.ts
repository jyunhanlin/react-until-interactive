import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/until-interactive.ts',
    'src/use-until-interactive.ts',
    'src/react-until-interactive.tsx',
  ],
  format: ['esm', 'cjs'],
  dts: 'src/index.ts',
  target: 'es6',
  minify: true,
  treeshake: true,
  splitting: false,
  bundle: false,
  clean: true,
});
