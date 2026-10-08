# Releasing

How every `@cult-frog/*` package is released. Each package repo follows the same steps.

Releases are published from CI. Pushing a `vX.Y.Z` tag runs the package's `release.yml`, which calls [`reusable-publish.yml`](.github/workflows/reusable-publish.yml) in this repo. That workflow checks the tag and changelog, runs the full lint, typecheck, test and build, publishes to npm with provenance through npm trusted publishing, and creates the GitHub Release from the changelog.

## 1. Check the starting point

- You're on `main`, the working tree is clean, and it's up to date with `origin/main`.
- CI is green on the latest commit.

## 2. Choose the version

Packages follow [Semantic Versioning](https://semver.org). See what's changed since the last release:

```sh
git log v<last-version>..HEAD --oneline
pnpm build && npm diff --diff=@cult-frog/<name>@latest
```

`npm diff` compares the published package with your local build, including the type declarations, which is where most breaking changes show up.

- **Major:** anything that can break a consumer's build or behaviour. That includes removing or renaming an export, narrowing a parameter type or widening a return type, changing runtime behaviour callers rely on, or raising the minimum Node or TypeScript version.
- **Minor:** new exports, new options, anything additive.
- **Patch:** bug fixes, and docs changes that don't touch the API.

Before 1.0.0, a breaking change bumps the minor (`0.1.x` → `0.2.0`) and everything else bumps the patch.

## 3. Update the docs

- The README covers every new or changed export, and its examples still match the API.
- New exports have TSDoc that explains what the signature can't.

## 4. Update the changelog

`CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Rename `## [Unreleased]` to the new version and date, such as `## [1.1.0] - 2026-10-08`, and add a fresh empty `## [Unreleased]` above it.

Group entries under `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed` and `Security`. Write them for people using the package.

The release workflow uses this section as the GitHub Release notes, and stops before publishing if the section is missing.

## 5. Check what will be published

```sh
pnpm build && npm pack --dry-run
```

Only the built output, the sources, the standard files (README, LICENSE, package.json) and `CHANGELOG.md` should be listed. No tests and no config.

## 6. Bump, commit, tag and push

```sh
npm version <x.y.z> --no-git-tag-version
git add package.json CHANGELOG.md
git commit -m "Release <x.y.z>"
git tag v<x.y.z>
git push origin main v<x.y.z>
```

The tag must match the version in `package.json` exactly, or the release workflow stops.

## 7. Confirm the release

- The Release workflow passed in the repo's Actions tab.
- npm shows the new version with a provenance badge.
- The GitHub Release exists, with the changelog section as its notes.

## 8. Update dependents

If other Cult Frog packages depend on this one, bump their dependency when they need the new version. An existing `^` range doesn't pick up a new major, or a new minor before 1.0.0.

## First release through CI (once per package)

1. The package must already exist on npm. A brand-new package's first version is published by hand with `pnpm publish`.
2. Add `.github/workflows/release.yml`, copied from a package that already has one.
3. Add a `CHANGELOG.md` in the format above, and add `"CHANGELOG.md"` to the `files` list in `package.json` so it ships with the package.
4. On npmjs.com, open the package's **Settings → Trusted publishing** and add GitHub Actions with the user `CapnQwan`, the package's repository, and the workflow `release.yml`. Do this right before the release: npm expires a trusted-publisher configuration that isn't used within two days.
5. Under **Publishing access**, choose **Require two-factor authentication and disallow tokens**.
