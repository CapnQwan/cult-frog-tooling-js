import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig } from 'vitest/config';

/**
 * @typedef {object} BaseVitestOptions
 * @property {string} [aliasName] - Package specifier to alias to the local
 *   source entry (e.g. '@cult-frog/math'), so a package's own tests import
 *   it the same way consumers eventually will.
 * @property {string} [aliasEntry='src/index.ts'] - Path (relative to `cwd`)
 *   that `aliasName` should resolve to.
 * @property {string} [cwd] - Directory `aliasEntry` is resolved against.
 *   Defaults to the process's current working directory.
 * @property {Record<string, unknown>} [testOverrides] - Extra or
 *   overriding Vitest `test` options, merged in last.
 */

/**
 * Shared Vitest config for Cult Frog Studios packages. Sets the defaults every
 * package should start from; pass `testOverrides` for anything that
 * genuinely needs to differ per package rather than editing this file.
 *
 * @param {BaseVitestOptions} [options]
 */
export function baseVitestConfig({
  aliasName,
  aliasEntry = 'src/index.ts',
  cwd = process.cwd(),
  testOverrides = {},
} = {}) {
  return defineConfig({
    test: {
      environment: 'node',
      globals: true,
      include: ['src/**/*.test.ts'],
      coverage: {
        reporter: ['text', 'html'],
      },
      ...testOverrides,
    },
    resolve: aliasName ? { alias: { [aliasName]: resolve(cwd, aliasEntry) } } : {},
  });
}
