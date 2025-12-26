**Workflows Overview**

- [ build-apk-ipa.yml ](.github/workflows/build-apk-ipa.yml): Builds Android APKs (debug/release) without EAS; iOS IPA job is disabled. Useful for quick debug artifacts or non-EAS Android builds.
- [ bundle-size.yml ](.github/workflows/bundle-size.yml): Measures React Native Metro bundles for Android/iOS, compares PR vs base, reports percent change, and uploads bundle artifacts. Optionally captures APK size if `android/` exists.
- [ ci.yml ](.github/workflows/ci.yml): Standard CI (install, lint, type-check, unit tests). Keeps quality checks on every push/PR.
- [ eas-build.yml ](.github/workflows/eas-build.yml): Reusable EAS build workflow. Supports `workflow_call` with `platform` and `profile`, and direct triggers on `main`/tags for building store-ready Android/iOS apps.
- [ eas-update.yml ](.github/workflows/eas-update.yml): Expo OTA updates (EAS Update). Publishes JS bundle/assets to channels (e.g., preview/staging/prod) for over-the-air testing without full store builds.
- [ github-release.yml ](.github/workflows/github-release.yml): Legacy manual GitHub Release. When manually dispatched, builds and attaches an Android APK to a release. Tag-based triggers are disabled to avoid duplicating the main release flow.
- [ performance.yml ](.github/workflows/performance.yml): Dependency analysis and heuristic checks (inline styles, console usage, optimization hooks). The “React DevTools Profiler” step is a placeholder; proper RN profiling needs an emulator + Hermes sampling or Flipper integration.
- [ pr-preview.yml ](.github/workflows/pr-preview.yml): PR preview flow. Typically used to publish preview builds or OTA updates to a review channel so reviewers can try the PR on devices.
- [ release.yml ](.github/workflows/release.yml): Tag-driven orchestrator. Creates the GitHub Release and triggers production EAS builds via the reusable workflow for Android/iOS, keeping releases and builds in one place.
