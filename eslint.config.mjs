import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts'],
  },
  // `next/core-web-vitals` brings the React, React-Hooks, a11y and Next rules.
  // `prettier` (eslint-config-prettier) disables stylistic rules that would
  // otherwise conflict with Prettier formatting.
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  },
];

export default eslintConfig;
