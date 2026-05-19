import next from '@monolith/eslint-config/next';

export default [
  ...next,
  {
    ignores: ['next-env.d.ts'],
  },
];
