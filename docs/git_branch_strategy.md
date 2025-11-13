# Git Branch Strategy for React Native/Expo Project

## 🌳 Recommended Branch Structure

Based on our GitHub Actions workflows, here's the optimal branch strategy:

```
main (production)
├── staging (pre-production testing)
├── develop (integration branch)
│   ├── feature/user-authentication
│   ├── feature/payment-integration
│   ├── feature/dark-mode
│   ├── bugfix/login-crash
│   ├── bugfix/memory-leak
│   └── hotfix/critical-security-patch
└── release/v1.2.0 (optional release branches)
```

## 📋 Branch Types & Purposes

### 1. **`main`** (Protected)

- **Purpose**: Production-ready code
- **Deployments**: App Store & Google Play Store
- **Protection Rules**:
  - ✅ Require PR reviews (2+ approvals)
  - ✅ Require status checks to pass
  - ✅ No direct pushes
  - ✅ No force pushes

**Workflows Triggered:**

- ✅ CI (full test suite)
- ✅ EAS Build (production profile)
- ✅ Bundle size tracking
- ✅ Performance monitoring

**When to merge:**

- After successful staging testing
- When releasing to production
- Only from `staging` or `hotfix/*` branches

---

### 2. **`develop`** (Protected)

- **Purpose**: Integration branch for features
- **Deployments**: EAS Updates (OTA) for internal testing
- **Protection Rules**:
  - ✅ Require PR reviews (1+ approval)
  - ✅ Require status checks to pass
  - ✅ No direct pushes

**Workflows Triggered:**

- ✅ CI (full test suite)
- ✅ EAS Update (preview channel)
- ✅ Bundle size tracking
- ✅ E2E tests

**When to merge:**

- Feature branches after completion
- Bugfix branches after testing
- Regularly merge to `staging` for testing

---

### 3. **`staging`** (Protected)

- **Purpose**: Pre-production testing environment
- **Deployments**: EAS Updates (staging channel) or Preview builds
- **Protection Rules**:
  - ✅ Require PR reviews (1+ approval)
  - ✅ Require status checks to pass

**Workflows Triggered:**

- ✅ CI (full test suite)
- ✅ EAS Update (staging channel)
- ✅ E2E tests
- ✅ Performance monitoring

**When to merge:**

- From `develop` when ready for QA
- After QA approval, merge to `main`

---

### 4. **`feature/*`** (Short-lived)

- **Purpose**: New features development
- **Naming**: `feature/feature-name`
- **Examples**:
  - `feature/user-profile`
  - `feature/push-notifications`
  - `feature/offline-mode`

**Workflows Triggered:**

- ✅ CI (linting, type check, tests)
- ✅ PR Preview (when PR is opened)
- ✅ Bundle size tracking
- ✅ Performance checks

**Lifecycle:**

1. Branch from `develop`
2. Develop feature
3. Open PR to `develop`
4. Get review approval
5. Merge & delete branch

---

### 5. **`bugfix/*`** (Short-lived)

- **Purpose**: Non-critical bug fixes
- **Naming**: `bugfix/bug-description`
- **Examples**:
  - `bugfix/login-validation`
  - `bugfix/image-caching`
  - `bugfix/navigation-state`

**Workflows Triggered:**

- ✅ CI (linting, type check, tests)
- ✅ PR Preview
- ✅ Bundle size tracking

**Lifecycle:**

1. Branch from `develop`
2. Fix bug
3. Open PR to `develop`
4. Merge & delete branch

---

### 6. **`hotfix/*`** (Short-lived)

- **Purpose**: Critical production bugs
- **Naming**: `hotfix/critical-issue`
- **Examples**:
  - `hotfix/payment-crash`
  - `hotfix/data-loss`
  - `hotfix/security-vulnerability`

**Workflows Triggered:**

- ✅ CI (full test suite)
- ✅ EAS Build (production profile)
- ✅ E2E tests

**Lifecycle:**

1. Branch from `main`
2. Fix critical issue
3. Open PR to `main`
4. After merge, also merge to `develop` and `staging`
5. Delete branch

---

### 7. **`release/*`** (Optional)

- **Purpose**: Release preparation
- **Naming**: `release/v1.2.0`
- **Use when**: You need to stabilize before production

**Workflows Triggered:**

- ✅ CI (full test suite)
- ✅ EAS Build (production profile)
- ✅ E2E tests
- ✅ Performance monitoring

**Lifecycle:**

1. Branch from `develop`
2. Version bumps, changelog updates
3. Bug fixes only (no new features)
4. Merge to `main` and tag
5. Merge back to `develop`
6. Delete branch

---

## 🔄 Git Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Feature Development Flow                               │
└─────────────────────────────────────────────────────────┘

develop ──────●────────●────────●─────────●──────────────>
              │        │        │         │
              │        │        │         │ merge
              │        │        │         │
feature/A ────●────●───┘        │         │
                   PR           │         │
                                │         │
feature/B ──────────────────────●────●────┘
                                     PR


┌─────────────────────────────────────────────────────────┐
│  Release Flow                                           │
└─────────────────────────────────────────────────────────┘

main ────────────────────────●───────────────────────────>
                             │ merge
                             │
staging ─────────────────●───┘
                         │ merge
                         │
develop ──●───●───●──────┘
          │   │   │
          │   │   └─ feature/C
          │   └───── feature/B
          └───────── feature/A


┌─────────────────────────────────────────────────────────┐
│  Hotfix Flow                                            │
└─────────────────────────────────────────────────────────┘

main ────────────●─────────────●─────────────────────────>
                 │             │ merge hotfix
                 │             │
hotfix/critical ─┘─────────────┘
                                │
                                └─> also merge to develop
```

---

## 🏷️ Version Tagging Strategy

When merging to `main`, create version tags to trigger releases:

### Semantic Versioning (SemVer)

```
v1.2.3
│ │ │
│ │ └─ PATCH (bug fixes)
│ └─── MINOR (new features, backwards compatible)
└───── MAJOR (breaking changes)
```

### Tag Examples:

- **Production releases**: `v1.0.0`, `v1.1.0`, `v2.0.0`
- **Pre-releases**: `v1.0.0-beta.1`, `v1.0.0-alpha.2`
- **Release candidates**: `v1.0.0-rc.1`

### Tagging Commands:

```bash
# Create and push tag
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0

# This triggers the release.yml workflow automatically!
```

---

## 🔐 Branch Protection Rules

### For `main`:

```yaml
Required reviews: 2
Required status checks:
  - CI / Lint & Type Check
  - CI / Run Tests
  - CI / Build App
  - Bundle Size Analysis
Dismiss stale reviews: ✅
Require signed commits: ✅ (optional)
Include administrators: ✅
Restrict pushes: Only from staging
```

### For `develop`:

```yaml
Required reviews: 1
Required status checks:
  - CI / Lint & Type Check
  - CI / Run Tests
Dismiss stale reviews: ✅
Allow force pushes: ❌
```

### For `staging`:

```yaml
Required reviews: 1
Required status checks:
  - CI / Lint & Type Check
  - CI / Run Tests
  - E2E Tests / Detox
```

---

## 📱 Deployment Channels Mapping

| Branch      | EAS Channel   | Build Profile | Purpose              |
| ----------- | ------------- | ------------- | -------------------- |
| `main`      | `production`  | `production`  | App Store/Play Store |
| `staging`   | `staging`     | `preview`     | QA testing           |
| `develop`   | `preview`     | `preview`     | Internal testing     |
| `feature/*` | `pr-{number}` | `preview`     | Feature testing      |

---

## 🎯 Typical Development Workflow

### Starting a new feature:

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-settings

# 3. Make changes and commit
git add .
git commit -m "feat: add user settings screen"

# 4. Push and create PR
git push origin feature/user-settings
# Open PR on GitHub to merge into develop
```

### Releasing to production:

```bash
# 1. Merge develop to staging for QA
git checkout staging
git merge develop
git push origin staging

# 2. After QA approval, merge to main
git checkout main
git merge staging
git push origin main

# 3. Tag the release
git tag -a v1.2.0 -m "Release v1.2.0: User settings and bug fixes"
git push origin v1.2.0

# 4. Release workflow automatically builds and submits to stores!
```

### Hotfix for production:

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/critical-payment-bug

# 2. Fix the issue
git add .
git commit -m "fix: resolve payment processing crash"

# 3. Open PR to main
git push origin hotfix/critical-payment-bug

# 4. After merge to main, also merge to develop
git checkout develop
git merge hotfix/critical-payment-bug
git push origin develop
```

---

## 📊 Workflow Triggers Summary

| Branch Pattern | CI  | EAS Build | EAS Update | E2E Tests | PR Preview | Release     |
| -------------- | --- | --------- | ---------- | --------- | ---------- | ----------- |
| `main`         | ✅  | ✅        | ❌         | ✅        | ❌         | ✅ (on tag) |
| `staging`      | ✅  | ❌        | ✅         | ✅        | ❌         | ❌          |
| `develop`      | ✅  | ❌        | ✅         | ✅        | ❌         | ❌          |
| `feature/*`    | ✅  | ❌        | ❌         | ❌        | ✅         | ❌          |
| `bugfix/*`     | ✅  | ❌        | ❌         | ❌        | ✅         | ❌          |
| `hotfix/*`     | ✅  | ✅        | ❌         | ✅        | ❌         | ❌          |

---

## 🎨 Branch Naming Conventions

### Format:

```
<type>/<short-description>
```

### Types:

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### Examples:

```bash
✅ feature/user-authentication
✅ bugfix/login-validation-error
✅ hotfix/payment-crash-ios
✅ refactor/api-client-structure
✅ docs/update-readme
✅ test/add-payment-tests
✅ chore/update-dependencies
```

### Avoid:

```bash
❌ johns-branch
❌ fix-bug
❌ updates
❌ feature
❌ test-123
```

---

## 🚀 Quick Setup Commands

```bash
# Initialize main branches
git checkout -b main
git push -u origin main

git checkout -b develop
git push -u origin develop

git checkout -b staging
git push -u origin staging

# Set up branch protection (via GitHub UI or CLI)
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_pull_request_reviews[required_approving_review_count]=2

gh api repos/:owner/:repo/branches/develop/protection \
  --method PUT \
  --field required_pull_request_reviews[required_approving_review_count]=1
```

---

## 💡 Pro Tips

1. **Always branch from the right base:**
   - Features → from `develop`
   - Hotfixes → from `main`
   - Releases → from `develop`

2. **Keep branches short-lived:**
   - Merge features within 1-3 days
   - Delete after merging

3. **Sync regularly:**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git rebase develop
   ```

4. **Use conventional commits:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `refactor:` - Code refactoring
   - `test:` - Tests
   - `chore:` - Maintenance

5. **Squash commits on merge:**
   - Keeps history clean
   - One commit per feature

---

This branch strategy is battle-tested and works perfectly with our GitHub Actions workflows! 🎉
