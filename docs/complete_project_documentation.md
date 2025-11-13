# Refil React Native/Expo Project - Complete Setup Documentation

> **Complete guide for setting up development workflow, CI/CD, branch strategy, and build automation**

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Code Quality &amp; Linting](#code-quality--linting)
6. [Git Workflow &amp; Branch Strategy](#git-workflow--branch-strategy)
7. [GitHub Actions CI/CD](#github-actions-cicd)
8. [Build Strategies](#build-strategies)
9. [Release Process](#release-process)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This project uses:

- **React Native** with **Expo**
- **pnpm** as package manager
- **TypeScript** for type safety
- **ESLint** & **Prettier** for code quality
- **GitHub Actions** for CI/CD
- **EAS** for production builds
- **Native GitHub builds** for development (saves EAS credits)

### Architecture Principles

```
┌─────────────────────────────────────┐
│         src/                        │
├─────────────────────────────────────┤
│  core/       (lowest level)         │
│    ├── No imports from other layers │
│    └── Pure utilities, constants    │
├─────────────────────────────────────┤
│  shared/     (middle level)         │
│    ├── Can import: core             │
│    └── UI components, hooks         │
├─────────────────────────────────────┤
│  features/   (feature level)        │
│    ├── Can import: core, shared     │
│    └── Feature-specific code        │
├─────────────────────────────────────┤
│  app/        (highest level)        │
│    ├── Can import: all layers       │
│    └── Navigation, screens          │
└─────────────────────────────────────┘
```

**Module Boundaries Enforced by ESLint:**

- `core` → Cannot import from `app`, `features`, or `shared`
- `shared` → Cannot import from `app` or `features`
- `features` → Cannot import from `app`
- `app` → Can import from all layers

---

## Prerequisites

### Required Software

```bash
# Node.js (v20+)
node --version  # Should be 20.x or higher

# pnpm (v8+)
pnpm --version  # Should be 8.x or higher

# Expo CLI
pnpm add -g expo-cli

# EAS CLI (for production builds)
pnpm add -g eas-cli

# Git
git --version

# For iOS development (macOS only)
xcode-select --version

# For Android development
java --version  # Should be Java 17
```

### Install pnpm

```bash
# macOS/Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Via npm
npm install -g pnpm

# Verify installation
pnpm --version
```

### VSCode Extensions

Install these extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)
3. **React Native Tools** (`msjsdiag.vscode-react-native`)
4. **GitLens** (`eamodio.gitlens`)
5. **GitHub Actions** (`github.vscode-github-actions`)

---

## Project Structure

```
project-root/
├── .github/
│   ├── workflows/              # GitHub Actions workflows
│   │   ├── ci.yml              # Main CI pipeline
│   │   ├── eas-build.yml       # EAS builds
│   │   ├── eas-update.yml      # OTA updates
│   │   ├── release.yml         # Release automation
│   │   ├── pr-preview.yml      # PR previews
│   │   ├── e2e-tests.yml       # E2E testing
│   │   ├── bundle-size.yml     # Bundle tracking
│   │   ├── performance.yml     # Performance monitoring
│   │   ├── build-apk-ipa.yml   # Native builds (no EAS)
│   │   └── github-release.yml  # GitHub releases
│   ├── dependabot.yml          # Dependency updates
│   └── CODEOWNERS              # Code ownership
├── .vscode/
│   └── settings.json           # VSCode settings
├── src/
│   ├── core/                   # Core utilities
│   ├── shared/                 # Shared components
│   ├── features/               # Feature modules
│   └── app/                    # App-level code
├── android/                    # Android native code
├── ios/                        # iOS native code
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── package.json                # Dependencies
└── pnpm-lock.yaml              # Lockfile
```

---

## Development Setup

### 1. Clone the Repository

```bash
# Clone the repo
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Checkout develop branch
git checkout develop
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# This will:
# - Install npm packages
# - Setup Git hooks
# - Generate native directories (if needed)
```

### 3. Environment Configuration

Create a `.env` file in the root:

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENVIRONMENT=development

# Add other environment variables here
```

**Never commit `.env` to Git!** It's in `.gitignore`.

### 4. Start Development Server

```bash
# Start Expo dev server
pnpm start

# Or run on specific platform
pnpm android   # Android
pnpm ios       # iOS (macOS only)
pnpm web       # Web (if supported)
```

### 5. VSCode Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

---

## Code Quality & Linting

### ESLint Configuration

Our ESLint setup enforces:

1. **Code Quality Rules**
   - No `console.log` (use proper logging)
   - Always use `===` (strict equality)
   - No `eval()`
   - No duplicate imports
   - Prefer `const` over `let`, never `var`

2. **Module Boundaries**
   - Prevents circular dependencies
   - Enforces architectural layers
   - Maintains clean imports

3. **Import Organization**
   - Automatic import sorting on save
   - Groups: builtin → external → internal → local
   - Alphabetical within groups

### Prettier Configuration

```javascript
// .prettierrc.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
};
```

### Running Checks

```bash
# Lint code
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix

# Type check
pnpm tsc --noEmit

# Run tests
pnpm test

# Run all checks (CI simulation)
pnpm lint && pnpm tsc --noEmit && pnpm test
```

### Pre-commit Hooks

When we have Husky configured:

```bash
# Runs automatically before commit
# - ESLint on staged files
# - TypeScript type checking
# - Prettier formatting
```

---

## Git Workflow & Branch Strategy

### Branch Structure

```
main (production)
├── staging (pre-production)
├── develop (integration)
│   ├── feature/user-authentication
│   ├── feature/payment-integration
│   ├── bugfix/login-crash
│   └── hotfix/critical-bug
```

### Branch Types

| Branch Type | Base Branch | Merge To           | Naming Convention        | Purpose                 |
| ----------- | ----------- | ------------------ | ------------------------ | ----------------------- |
| `main`      | -           | -                  | `main`                   | Production code         |
| `staging`   | `develop`   | `main`             | `staging`                | Pre-production testing  |
| `develop`   | `main`      | `staging`          | `develop`                | Integration branch      |
| `feature/*` | `develop`   | `develop`          | `feature/feature-name`   | New features            |
| `bugfix/*`  | `develop`   | `develop`          | `bugfix/bug-description` | Bug fixes               |
| `hotfix/*`  | `main`      | `main` + `develop` | `hotfix/critical-issue`  | Production fixes        |
| `release/*` | `develop`   | `main`             | `release/v1.2.0`         | Release prep (optional) |

### Workflow Diagrams

#### Feature Development Flow

```
develop ──────●────────●────────●─────────●──────────────>
              │        │        │         │
              │        │        │         │ merge PR
              │        │        │         │
feature/A ────●────●───┘        │         │
                   create PR    │         │
                                │         │
feature/B ──────────────────────●────●────┘
                                     create PR
```

#### Release Flow

```
main ────────────────────────●───────────────────────────>
                             │ merge PR
                             │
staging ─────────────────●───┘
                         │ merge PR
                         │
develop ──●───●───●──────┘
          │   │   │
          │   │   └─ feature/C (merged)
          │   └───── feature/B (merged)
          └───────── feature/A (merged)
```

#### Hotfix Flow

```
main ────────────●─────────────●─────────────────────────>
                 │             │ merge hotfix PR
                 │             │
hotfix/critical ─┘─────────────┘
                                │
                                └─> merge back to develop
```

### Starting a New Feature

```bash
# 1. Update develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-profile

# 3. Make changes
# ... code ...

# 4. Commit with conventional commits
git add .
git commit -m "feat: add user profile screen"

# 5. Push and create PR
git push origin feature/user-profile

# 6. Go to GitHub and create Pull Request
# Target: develop
```

### Conventional Commits

Use these commit prefixes:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

**Examples:**

```bash
git commit -m "feat: add dark mode support"
git commit -m "fix: resolve login validation error"
git commit -m "docs: update API documentation"
git commit -m "refactor: extract payment logic to service"
git commit -m "test: add unit tests for auth module"
```

### Branch Protection Rules

#### For `main`:

- ✅ Require 2 approving reviews
- ✅ Dismiss stale reviews on push
- ✅ Require code owner review
- ✅ Require status checks: `CI / lint`, `CI / test`, `CI / build`
- ✅ Require signed commits
- ✅ Block force pushes
- ✅ Prevent deletion

#### For `develop`:

- ✅ Require 1 approving review
- ✅ Dismiss stale reviews on push
- ✅ Require status checks: `CI / lint`, `CI / test`
- ✅ Block force pushes
- ✅ Prevent deletion

#### For `staging`:

- ✅ Require 1 approving review
- ✅ Require status checks: `CI / lint`, `CI / test`, `E2E Tests`
- ✅ Block force pushes

### Setting Up Branch Protection

**Method 1: GitHub UI**

1. Go to **Settings** → **Branches**
2. Click **Add branch ruleset**
3. Configure rules as described above

**Method 2: GitHub CLI**

```bash
# Install GitHub CLI
brew install gh  # macOS
# or download from https://cli.github.com/

# Login
gh auth login

# Apply protection to main
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_pull_request_reviews[required_approving_review_count]=2 \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true \
  --field enforce_admins=true
```

---

## GitHub Actions CI/CD

### Workflow Overview

We have 10 automated workflows:

| Workflow           | Trigger                        | Purpose                      | Duration |
| ------------------ | ------------------------------ | ---------------------------- | -------- |
| **CI**             | Every PR, push to main/develop | Lint, test, build validation | ~5 min   |
| **EAS Build**      | Push to main, manual           | Production builds (uses EAS) | ~15 min  |
| **EAS Update**     | Push to develop/staging        | OTA updates                  | ~3 min   |
| **Release**        | Version tags (`v*`)            | Auto-release to stores       | ~20 min  |
| **PR Preview**     | Every PR                       | Preview builds with comments | ~5 min   |
| **E2E Tests**      | PRs, daily 2 AM                | Detox/Maestro tests          | ~30 min  |
| **Bundle Size**    | Every PR                       | Track bundle size changes    | ~5 min   |
| **Performance**    | PRs, weekly                    | Performance metrics          | ~5 min   |
| **Native Builds**  | Push to develop/staging        | Free APK/IPA builds          | ~10 min  |
| **GitHub Release** | Version tags                   | Releases with APK assets     | ~10 min  |

### Workflow Files

All workflows are in `.github/workflows/`:

```bash
.github/workflows/
├── ci.yml                    # ✅ Main CI pipeline
├── eas-build.yml             # 🔨 EAS builds (production)
├── eas-update.yml            # 🚀 OTA updates
├── release.yml               # 🏷️ Release automation
├── pr-preview.yml            # 👀 PR previews
├── e2e-tests.yml             # 🧪 E2E testing
├── bundle-size.yml           # 📊 Bundle tracking
├── performance.yml           # ⚡ Performance monitoring
├── build-apk-ipa.yml         # 📦 Native builds (free)
└── github-release.yml        # 🎉 GitHub releases
```

### Required Secrets

Add these in **Settings → Secrets and variables → Actions**:

#### Essential Secrets:

```bash
EXPO_TOKEN              # Required for all workflows
GITHUB_TOKEN            # Auto-provided by GitHub
```

#### For Native Android Builds:

```bash
ANDROID_KEYSTORE_BASE64       # Base64 encoded keystore
ANDROID_KEYSTORE_PASSWORD     # Keystore password
ANDROID_KEY_ALIAS             # Key alias
ANDROID_KEY_PASSWORD          # Key password
```

#### Optional Secrets:

```bash
CODECOV_TOKEN                 # For code coverage reports
SLACK_WEBHOOK_URL             # For Slack notifications
```

### Getting EXPO_TOKEN

```bash
# Login to Expo
pnpm expo login

# Get your token
pnpm expo whoami --json

# Copy the "token" field value
# Add it to GitHub Secrets as EXPO_TOKEN
```

### Generating Android Keystore

```bash
# Generate keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore release.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass YOUR_PASSWORD \
  -keypass YOUR_PASSWORD \
  -dname "CN=Your Name,O=Your Org,C=US"

# Convert to base64
base64 release.keystore > keystore.txt

# Add to GitHub Secrets:
# - ANDROID_KEYSTORE_BASE64: content of keystore.txt
# - ANDROID_KEYSTORE_PASSWORD: YOUR_PASSWORD
# - ANDROID_KEY_ALIAS: my-key-alias
# - ANDROID_KEY_PASSWORD: YOUR_PASSWORD
```

### Workflow Triggers Reference

| Event             | Workflows Triggered                                 |
| ----------------- | --------------------------------------------------- |
| Open PR           | CI, PR Preview, E2E Tests, Bundle Size, Performance |
| Push to `main`    | CI, EAS Build, Bundle Size, Performance             |
| Push to `develop` | CI, EAS Update, Native Builds                       |
| Push to `staging` | CI, EAS Update, Native Builds                       |
| Tag `v*.*.*`      | Release, GitHub Release                             |
| Daily 2 AM UTC    | E2E Tests                                           |
| Weekly Sunday     | Performance                                         |
| Manual            | EAS Build, EAS Update, Native Builds                |

---

## Build Strategies

### Strategy Overview

We use a **hybrid approach** to save costs:

- **Development/Staging**: GitHub native builds (FREE)
- **Production**: EAS builds (uses credits, better for stores)

### Cost Comparison

| Build Type     | GitHub Actions | EAS Build   |
| -------------- | -------------- | ----------- |
| Dev APK        | FREE ✅        | 1 credit 💰 |
| Staging APK    | FREE ✅        | 1 credit 💰 |
| Production APK | FREE ✅        | 1 credit 💰 |
| Production IPA | Paid runner 💰 | 1 credit 💰 |

**Recommendation**: Use GitHub for Android dev/staging, EAS for production iOS/Android.

### Development Builds (GitHub Actions)

#### Automatic Builds

```bash
# Push to develop → Builds automatically
git checkout develop
git add .
git commit -m "feat: new feature"
git push origin develop

# Check build status:
# Go to: https://github.com/your-repo/actions
```

#### Manual Builds

1. Go to **Actions** tab
2. Select **Build APK/IPA (No EAS)**
3. Click **Run workflow**
4. Choose:
   - Build type: `development`, `preview`, or `production`
   - Platform: Android or iOS
5. Click **Run workflow**

#### Downloading Builds

After build completes:

1. Go to the workflow run
2. Scroll to **Artifacts** section
3. Download:
   - `android-apk-{sha}` - Android APK
   - `ios-ipa-{sha}` - iOS IPA (if built)
4. Retain for 30 days

#### PR Preview Builds

When you open a PR:

1. Workflow builds APK/IPA automatically
2. Posts comment with download instructions
3. Updates on each commit

Example comment:

```
## 📦 Android Build Ready!

### Build Information
- Version: 1.2.3
- Commit: abc1234
- Build Type: debug

### 📥 Download APK
[Download from Actions](link)

### 📲 Installation
1. Download APK
2. Install on device
3. Test your changes!
```

### Production Builds (EAS)

#### Setup EAS

```bash
# Login to EAS
pnpm eas login

# Configure project
pnpm eas build:configure

# This creates eas.json
```

#### EAS Configuration

Create `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./service-account.json",
        "track": "internal"
      },
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDE12345"
      }
    }
  }
}
```

#### Building with EAS

```bash
# Build for development
pnpm eas build --platform android --profile development

# Build for preview
pnpm eas build --platform all --profile preview

# Build for production
pnpm eas build --platform all --profile production

# Build and auto-submit to stores
pnpm eas build --platform all --profile production --auto-submit
```

#### Automated EAS Builds

**Via Git Tags:**

```bash
# Create version tag
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Workflow automatically:
# 1. Builds production APK/IPA
# 2. Submits to stores
# 3. Creates GitHub release
```

**Via Manual Trigger:**

1. Go to **Actions** → **EAS Build**
2. Click **Run workflow**
3. Select platform and profile
4. Click **Run workflow**

### OTA Updates (EAS Update)

For quick updates without full rebuild:

```bash
# Publish update
pnpm eas update --branch preview --message "Fix login bug"

# Via GitHub Actions:
# Push to develop → Auto publishes to "preview" channel
# Push to staging → Auto publishes to "staging" channel
```

Users get updates automatically on next app restart!

---

## Release Process

### Versioning Strategy

We use **Semantic Versioning (SemVer)**:

```
v1.2.3
│ │ │
│ │ └─ PATCH: Bug fixes, no new features
│ └─── MINOR: New features, backwards compatible
└───── MAJOR: Breaking changes
```

### Pre-release Tags

- `v1.0.0-alpha.1` - Alpha release
- `v1.0.0-beta.1` - Beta release
- `v1.0.0-rc.1` - Release candidate

### Release Workflow

#### 1. Prepare Release

```bash
# Update version in package.json
npm version minor  # or: major, patch

# Update CHANGELOG.md
# ... add release notes ...

# Commit changes
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 1.2.0"
```

#### 2. Merge to Staging

```bash
# Merge develop to staging for QA
git checkout staging
git merge develop
git push origin staging

# QA team tests on staging builds
```

#### 3. Merge to Main & Tag

```bash
# After QA approval
git checkout main
git merge staging
git push origin main

# Create release tag
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# This triggers:
# - Release workflow
# - Production EAS build
# - GitHub release creation
# - Store submission
```

#### 4. Create GitHub Release

Automatically done by workflow, but can be manual:

1. Go to **Releases** → **Draft a new release**
2. Choose tag: `v1.2.0`
3. Release title: `Release v1.2.0`
4. Add release notes
5. Attach APK (done automatically)
6. Publish release

### Hotfix Process

For critical production bugs:

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/payment-crash

# 2. Fix the issue
# ... code ...
git add .
git commit -m "fix: resolve payment crash on iOS"

# 3. Push and create PR to main
git push origin hotfix/payment-crash

# 4. After merge to main, merge to develop too
git checkout develop
git merge hotfix/payment-crash
git push origin develop

# 5. Tag hotfix release
git checkout main
git tag -a v1.2.1 -m "Hotfix v1.2.1: Payment crash"
git push origin v1.2.1
```

### Release Checklist

- [ ] All PRs merged to `develop`
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] Merged to `staging` for QA
- [ ] QA testing passed
- [ ] Merged to `main`
- [ ] Tag created and pushed
- [ ] GitHub release created
- [ ] Store builds submitted
- [ ] Release notes published
- [ ] Team notified
- [ ] Documentation updated

---

## Best Practices

### Code Organization

#### 1. Module Boundaries

```typescript
// ❌ BAD: core importing from features
// src/core/utils.ts
import { getUserData } from '@/features/user'; // VIOLATION!

// ✅ GOOD: features importing from core
// src/features/user/service.ts
import { apiClient } from '@/core/api'; // OK!
```

#### 2. Component Structure

```typescript
// ✅ GOOD: Well-structured component
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/shared/components';
import { useAuth } from '@/features/auth/hooks';

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Button onPress={handleSave}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24 },
});
```

#### 3. Import Order

Imports are automatically sorted on save:

```typescript
// 1. Built-in modules
import { useEffect } from 'react';
import { View } from 'react-native';

// 2. External packages
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// 3. Internal - core
import { API_URL } from '@/core/constants';
import { formatDate } from '@/core/utils';

// 4. Internal - shared
import { Button } from '@/shared/components';
import { useAsync } from '@/shared/hooks';

// 5. Internal - features
import { useAuth } from '@/features/auth';

// 6. Internal - app
import { RootStackParamList } from '@/app/navigation';

// 7. Relative imports
import { UserCard } from './UserCard';
import styles from './styles';
```

### Git Best Practices

#### 1. Commit Often, Push Daily

```bash
# Make small, focused commits
git commit -m "feat: add email validation"
git commit -m "feat: add password strength indicator"
git commit -m "test: add tests for login form"

# Push at least once per day
git push origin feature/user-authentication
```

#### 2. Keep Branches Up to Date

```bash
# Sync with develop daily
git checkout develop
git pull origin develop
git checkout feature/your-feature
git rebase develop

# Or merge if you prefer
git merge develop
```

#### 3. Clean Up Branches

```bash
# After PR is merged, delete branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication

# Clean up local references
git fetch --prune
```

### Code Review Guidelines

#### For Authors:

- [ ] Code is self-explanatory or well-commented
- [ ] Tests added for new functionality
- [ ] No commented-out code
- [ ] No `console.log` statements
- [ ] TypeScript types defined
- [ ] Mobile-responsive (if UI changes)
- [ ] Accessibility considered
- [ ] Performance impact assessed
- [ ] Documentation updated

#### For Reviewers:

- [ ] Code follows project conventions
- [ ] Logic is sound and efficient
- [ ] Edge cases handled
- [ ] Security considerations addressed
- [ ] Tests are comprehensive
- [ ] UI/UX is polished
- [ ] No unnecessary complexity

### Performance Best Practices

#### 1. Optimize Re-renders

```typescript
// ✅ GOOD: Memoized component
import React, { memo } from 'react';

export const UserCard = memo(({ user }) => {
  return <View>...</View>;
});

// ✅ GOOD: Memoized values
import { useMemo } from 'react';

const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```

#### 2. Lazy Load Images

```typescript
import { Image } from 'react-native';

<Image
  source={{ uri: user.avatar }}
  resizeMode="cover"
  defaultSource={require('./placeholder.png')}
/>
```

#### 3. Virtualized Lists

```typescript
// ✅ GOOD: Use FlatList for long lists
import { FlatList } from 'react-native';

<FlatList
  data={users}
  renderItem={({ item }) => <UserCard user={item} />}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Security Best Practices

#### 1. Never Commit Secrets

```bash
# ❌ NEVER do this
const API_KEY = "sk_live_abcdef123456";

# ✅ Use environment variables
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
```

#### 2. Validate User Input

```typescript
// ✅ GOOD: Validate and sanitize
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

if (!validateEmail(userInput)) {
  throw new Error('Invalid email');
}
```

#### 3. Use HTTPS

```typescript
// ✅ GOOD: Always use HTTPS
const API_URL = 'https://api.example.com';

// ❌ BAD: Never use HTTP for sensitive data
const API_URL = 'http://api.example.com';
```

---

## Troubleshooting

### Common Issues

#### Issue: "pnpm command not found"

**Solution:**

```bash
# Install pnpm
```
