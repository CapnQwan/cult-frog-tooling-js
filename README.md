# cult-frog-tooling-js

Shared TypeScript, Biome, and build config used across Cult Frog Studios packages — a single source of truth so every package builds, lints, and tests the same way.

This is a devDependency-only package: it ships raw config files and one small helper function, not compiled runtime code. There's no build step.

## Install

```sh
pnpm add -D @cult-frog/tooling
```

## Usage

### TypeScript

`tsconfig.json`:

```json
{
  "extends": "@cult-frog/tooling/tsconfig/base.json",
  "include": ["src", "vitest.config.ts"]
}
```

`tsconfig.build.json`:

```json
{
  "extends": "@cult-frog/tooling/tsconfig/build.json",
  "include": ["src"],
  "exclude": ["**/*.test.ts", "**/*.test-d.ts", "**/__tests__/**"]
}
```

`include`/`exclude` stay local to each package on purpose — they're the part most likely to differ once packages have different layouts.

### Biome

`biome.jsonc`:

```jsonc
{
  "extends": ["@cult-frog/tooling/biome/base"],
}
```

Add package-specific rule overrides after the `extends` line if a package genuinely needs one.

### Vitest

`vitest.config.ts`:

```ts
import { baseVitestConfig } from '@cult-frog/tooling/vitest/base';

export default baseVitestConfig({
  aliasName: '@cult-frog/math',
});
```

`aliasName` is the only thing every package needs to set — it aliases the package's own name to `src/index.ts` so a package's tests import it. Pass `testOverrides` for anything else that needs to differ per package.

### package.json scripts

There's no inheritance mechanism for npm scripts, so this is the one part that has to stay copy-pasted rather than referenced. The standard set (taken from `@cult-frog/result`):

```json
{
  "scripts": {
    "build": "rimraf dist && tsc -p tsconfig.build.json",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "check": "biome check . --error-on-warnings",
    "check:ci": "biome ci . --error-on-warnings",
    "fix": "biome check . --write",
    "prepublishOnly": "pnpm build",
    "prepare": "husky"
  }
}
```

`check:ci` in particular has to exist with that exact name — the reusable CI workflow below calls it directly.

### CI

Each package's own `.github/workflows/ci.yml` becomes a thin caller of the reusable workflow this repo hosts:

```yaml
name: CI

permissions:
  contents: read

on:
  push: { branches: [main] }
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    uses: CapnQwan/cult-frog-tooling-js/.github/workflows/reusable-ci.yml@main
```
