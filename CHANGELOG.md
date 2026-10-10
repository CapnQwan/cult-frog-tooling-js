# Changelog

All notable changes to `@cult-frog/tooling` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2026-10-11

### Added

- `reusable-publish.yml` workflow. A package's `release.yml` calls it when a `vX.Y.Z` tag is pushed. It checks that the tag matches `package.json` and has a changelog entry, publishes to npm through trusted publishing with provenance, and creates the GitHub Release from the changelog. See [RELEASING.md](RELEASING.md).
- `CHANGELOG.md` is now included in the published package.
- A `workflows-v0` tag for packages to call the shared workflows at, in place of `@main`. It moves to each tooling release, so changes on `main` can't reach a package's CI or releases before they're released. See [RELEASING.md](RELEASING.md#updating-the-shared-workflows).

## [0.1.2] - 2026-10-01

### Added

- `reusable-ci.yml` workflow for packages to call from their own CI. It runs the Biome check, typecheck, tests and, unless `run-build` is `false`, the build. The Node version can be set with `node-version` (default `20.19`).
- `biome/base` now turns off `noUnusedVariables`, `noExplicitAny`, `useDefaultSwitchClause` and `noSecrets` for `*.test-d.ts` files, so packages don't need their own override for type tests.

### Fixed

- `tsconfig/build.json` resolved `outDir` and `rootDir` relative to this package rather than the package extending it, so every package had to override them or have build output end up in the wrong place. They now use `${configDir}` and resolve to the extending package's `dist` and `src`. This needs TypeScript 5.5 or later.
- `vitest/base.test.ts` is no longer included in the published package.

## [0.1.1] - 2026-09-13

### Added

- Type declarations for `@cult-frog/tooling/vitest/base`, including the `BaseVitestOptions` and `BaseVitestConfig` types.

### Changed

- `baseVitestConfig` returns a plain config object and no longer imports `vitest/config` at runtime.

## [0.1.0] - 2026-09-12

### Added

- Initial release with shared configs:
  - `tsconfig/base.json` and `tsconfig/build.json` for TypeScript.
  - `biome/base` for Biome.
  - `vitest/base`, which exports `baseVitestConfig()` with the `aliasName`, `aliasEntry`, `cwd` and `testOverrides` options.

[Unreleased]: https://github.com/CapnQwan/cult-frog-tooling-js/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/CapnQwan/cult-frog-tooling-js/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/CapnQwan/cult-frog-tooling-js/compare/10624b4...v0.1.1
[0.1.0]: https://www.npmjs.com/package/@cult-frog/tooling/v/0.1.0
