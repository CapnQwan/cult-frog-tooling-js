import type { defineConfig } from 'vitest/config';

export interface BaseVitestOptions {
  aliasName?: string;
  aliasEntry?: string;
  cwd?: string;
  testOverrides?: Record<string, unknown>;
}

export declare function baseVitestConfig(
  options?: BaseVitestOptions
): ReturnType<typeof defineConfig>;
