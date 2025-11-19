# Git Branch Strategy — General Reference

This is a general, language- and framework-agnostic branch strategy designed to be shared across frontend, backend, and platform teams. Use this as the canonical guide for how we manage branches, releases, and CI/CD triggers across all repositories.

---

## Recommended Branch Structure

```text
main (production)
├── staging (pre-production testing)
├── develop (integration branch)
│   ├── feature/user-authentication
│   ├── feature/payment-integration
│   ├── feature/dark-mode
│   ├── bugfix/login-crash
│   └── hotfix/critical-security-patch
└── release/v1.2.0 (optional release branches)
```

This structure works for any project: web app, mobile app, backend service, libraries, or infra code.

---

## Branch Types & Purposes

- `main` (Protected)
  - Purpose: Production-ready code.
  - Deployments: Production deployment or publish to package registry.
  - Protection rules: No direct pushes, required approvals, required status checks (CI, tests, security scan).
  - Merge sources: `staging`, `release/*`, `hotfix/*`.

- `develop` (Protected)
  - Purpose: Integration for completed feature work and non-critical bug fixes.
  - Deployments: Internal preview or integration environments.
  - Protection rules: PR reviews required, status checks required.
  - Merge sources: `feature/*`, `bugfix/*`, `hotfix/*` (after merging into `main`, back-merge hotfixes).

- `staging` (Protected)
  - Purpose: Pre-production testing; QA and UAT.
  - Deployments: Staging or QA environment.
  - Merge sources: `develop` and `hotfix/*`; after QA, merge to `main` for release.

- `feature/*` (Short-lived)
  - Purpose: Implement new functionality.
  - Naming: `feature/short-description`.
  - Lifecycle: Branch from `develop`, open PR to `develop`, get reviews, merge & delete.
  - CI: Lint, tests, build, PR preview.

- `bugfix/*` (Short-lived)
  - Purpose: Non-critical bug fixes.
  - Naming: `bugfix/short-description`.
  - Lifecycle: Branch from `develop`, open PR to `develop`, get reviews, merge & delete.

- `hotfix/*` (Short-lived)
  - Purpose: Emergency fixes for production.
  - Naming: `hotfix/short-description`.
  - Lifecycle: Branch from `main`, fix, open PR to `main`. After merge, merge the fixes back to `develop` and `staging`.
  - CI: Full test suite and any production-specific checks.

- `release/*` (Optional)
  - Purpose: Stabilize a release (version bump, changelog, minor bug fixes).
  - Naming: `release/vX.Y.Z`.
  - Lifecycle: Branch from `develop`, cut release branch to finalize, merge to `main` (and tag), then merge back to `develop`.

---

## Branch Lifecycle Examples

- Feature work
  1. Branch from `develop` → `feature/xyz`
  2. Implement changes, add tests
  3. Rebase against `develop` or merge `develop` to keep up to date
  4. Open PR to `develop` with a description and checklist
  5. Resolve comments, pass CI, get approvals
  6. Merge (squash or rebase), delete branch

- Release to production
  1. Merge `develop` into `staging` for QA
  2. QA and UAT finish
  3. Merge `staging` into `main`
  4. Tag `main` with a release tag (SemVer)
  5. Build and deploy to production
  6. Merge tag/changes back into `develop` if needed

- Hotfix
  1. Branch from `main` → `hotfix/do-something`
  2. Apply fix, test locally, create PR to `main`
  3. After merge to `main`, also merge into `develop` (and `staging` if used)

---

## Pull Requests and Reviews

- Use PRs for all changes into shared branches (`develop`, `staging`, `main`).
- Small, focused PRs are easier to review and less likely to cause merge conflicts.
- Use conventional commit messages if available (see Pro Tips below).
- Required checks before merge:
  - Linting & formatting
  - Type checking (if applicable)
  - Unit tests & integration tests
  - Security scanning and dependency checks
  - E2E tests on `staging` and `main` merges

- Recommendations:
  - `main`: 2 reviewers required (or 1 + approvals from lead/maintainer)
  - `develop` / `staging`: 1 reviewer required
  - `feature` / `bugfix`: 1 reviewer recommended

---

## Branch Protection Rules (Suggested)

For `main`:

```yaml
required_reviewers: 2
required_status_checks:
  - CI/Lint
  - CI/UnitTests
  - CI/IntegrationTests
  - Security/Scan
no_direct_pushes: true
no_force_pushes: true
```

For `develop` and `staging`:

```yaml
required_reviewers: 1
required_status_checks:
  - CI/Lint
  - CI/UnitTests
  - CI/IntegrationTests
no_direct_pushes: true
```

---

## CI/CD Mapping (Generic)

| Branch Pattern | CI Checks                         |                                            CD Action |
| -------------- | --------------------------------- | ---------------------------------------------------: |
| `main`         | ✅ Lint, tests, security scans    |      ✅ Deploy to production, tag-triggered releases |
| `staging`      | ✅ Lint, tests, E2E tests         |                             ✅ Deploy to staging/UAT |
| `develop`      | ✅ Lint, tests, integration tests |         ✅ Deploy to integration/preview environment |
| `feature/*`    | ✅ Lint, tests, build             |   Optional PR preview / integration test environment |
| `bugfix/*`     | ✅ Lint, tests                    | Merge to `develop` and deploy to integration preview |
| `hotfix/*`     | ✅ Full test suite                |           Deploy to production after merge to `main` |

---

## Version Tagging Strategy

Use semantic versioning (SemVer) for tags:

- vMAJOR.MINOR.PATCH
- Examples: `v1.2.0`, `v2.0.0`, `v1.0.0-rc.1`

Typical tagging flow:

```bash
git tag -a v1.2.0 -m "Release v1.2.0: summary"
git push origin v1.2.0
```

Tags on `main` usually trigger deployment or release automation.

---

## Coordinating Changes Across Frontend & Backend

When multiple teams must make coordinated changes (API updates, DB migrations), follow these practices:

- API compatibility:
  - Prefer backward-compatible changes when possible.
  - If breaking change is required, tag it clearly and use a migration strategy including feature flags.
  - Establish contract or API versioning when releasing breaking changes.

- Database migrations:
  - Make changes in backward-compatible steps (add columns first, then migrate data, then remove old fields).
  - Coordinate with release windows and perform migration after the new code is deployed (or use a migration strategy that supports rolling updates).

- Release orchestration:
  - Use the `release/*` or `staging` branch to coordinate multi-service changes.
  - Document exact deploy order and required steps in the PR or release notes.

- Feature toggles:
  - Use feature flags for incremental rollout and to decouple backend and frontend release schedules.

---

## Branch Naming Conventions

Format: `<type>/<short-description>`

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Non-functionality refactors
- `docs/` - Documentation changes
- `test/` - Tests
- `chore/` - Maintenance & infra

Examples:

- `feature/user-authentication`
- `bugfix/login-validation-error`
- `hotfix/payment-crash`
- `chore/upgrade-deps`

Avoid overly generic branches like `fix` or user-specific names like `john-branch`.

---

## Pro Tips

- Keep branches short-lived (days, not months).
- Rebase often to reduce merge conflicts.
- Make PRs small and focused.
- Include clear PR descriptions and testing instructions.
- Keep a single source of truth for environment configuration (and avoid secrets in repo).
- Consider lightweight feature flags for gradual rollout.
- For library packages: follow semver when publishing.

---

## Example Commands

Starting a new feature:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
# make changes
git add .
git commit -m "feat: brief message"
git push origin feature/short-description
# Open PR to develop
```

Releasing to production (example):

```bash
git checkout staging
git merge develop
git push origin staging
# After QA
git checkout main
git merge staging
git push origin main
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

Hotfix example:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
# implement fix
git commit -m "fix: urgent patch"
# push + PR to main
# after merge, rebase/merge into develop and staging
```

---

## Troubleshooting & Escalation

- If a merge causes an outage: create a `hotfix/*` branch from `main` and revert or patch immediately.
- If PR checks fail: fix locally and push changes, or run tests locally to reproduce the failure.
- If you need permission or branch protections adjusted: open a ticket with the repository administrators.
