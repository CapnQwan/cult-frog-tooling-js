import { resolve } from 'node:path';
import process from 'node:process';

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
 * @typedef {object} BaseVitestConfig
 * @property {Record<string, unknown>} test
 * @property {{ alias?: Record<string, string> }} resolve
 */

/**
 * Shared Vitest config for Cult Frog packages.
 *
 * @param {BaseVitestOptions} [options]
 * @returns {BaseVitestConfig}
 */
export function baseVitestConfig({
  aliasName,
  aliasEntry = 'src/index.ts',
  cwd = process.cwd(),
  testOverrides = {},
} = {}) {
  return {
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
  };
}
