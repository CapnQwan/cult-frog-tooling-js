import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { baseVitestConfig } from './base.js';

describe('baseVitestConfig', () => {
  it('adds an alias pointing at the given entry when aliasName is provided', () => {
    const config = baseVitestConfig({
      aliasName: '@cult-frog/example',
      aliasEntry: 'src/index.ts',
      cwd: '/repo',
    });

    expect(config.resolve?.alias).toEqual({
      '@cult-frog/example': resolve('/repo', 'src/index.ts'),
    });
  });

  it('omits the alias entirely when aliasName is not provided', () => {
    const config = baseVitestConfig();

    expect(config.resolve?.alias).toBeUndefined();
  });

  it('defaults globals to true and includes the standard test glob', () => {
    const config = baseVitestConfig();

    expect(config.test?.globals).toBe(true);
    expect(config.test?.include).toEqual(['src/**/*.test.ts']);
  });

  it('lets testOverrides win over the defaults', () => {
    const config = baseVitestConfig({
      testOverrides: { globals: false },
    });

    expect(config.test?.globals).toBe(false);
  });
});
