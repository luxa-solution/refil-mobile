# Refil Mobile

A React Native mobile application built with Expo, featuring multi-language support and a modern UI framework.

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **React Query** for data fetching
- **Zustand** for state management
- **i18next** for internationalization (EN, FR)
- **React Native Unistyles** for styling
- **React Hook Form** for form handling
- **Zod** for schema validation

## Quick Start

### Prerequisites

- Node.js and pnpm installed
- Expo CLI installed

### Installation

```bash
pnpm install
```

### Development

```bash
# Start the dev client
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run on Web
pnpm web
```

### Build

```bash
# Development build
pnpm build:dev

# Preview build
pnpm build:preview

# Production build
pnpm build:prod
```

## Code Quality

```bash
# Lint and format check
pnpm lint

# Format code
pnpm format
```

## Project Structure

- `/src/app` - App routing and layout
- `/src/core` - Core functionality (i18n, theme)
- `/src/features` - Feature modules (home, modal, settings, tabs)
- `/src/shared` - Shared components and utilities
- `/src/store` - Global state management (Zustand)
- `/src/translation` - Internationalization files

## Languages Supported

- English (en)
- French (fr)
