# SHRED Extension Development Guide

## Project Overview

SHRED is a browser extension that helps guitarists find essential information (tuning, difficulty, tabs) for songs playing on streaming services (Spotify, Tidal, YouTube Music).

## Key Architecture Components

### Content Scripts (`src/contents/`)

- Content scripts inject into supported streaming sites (`src/config/supported-hosts.ts`)
- `picture-in-picture/` - Provides floating view using Document Picture-in-Picture API
- `api.ts` - Establishes bridge between page scripts and extension

### Extension UI (`src/ui/`)

- Shared components used by popup and sidepanel
- Uses React with TypeScript and TailwindCSS
- Manages state through ApiHooksProvider pattern

### Background Service (`src/background/`)

- Handles message passing between content scripts and UI
- Manages extension action visibility based on URL
- Implements caching for API responses

### Message Communication

- Uses `@plasmohq/messaging` for background-content-UI communication
- Events managed through `EventService` for state synchronization
- Two API hook providers:
    - `BrowserBasedApiHooksProvider`: For popup/sidepanel
    - `WindowBasedApiHooksProvider`: For Picture-in-Picture mode

## Development Workflow

### Setup

```powershell
pnpm install  # Install dependencies
pnpm dev      # Start development server
```

### Project Structure

- `/src`
    - `/api` - Core services and interfaces
    - `/background` - Service worker scripts
    - `/contents` - Content scripts for streaming sites
    - `/popup` - Extension popup UI
    - `/sidepanel` - Side panel interface
    - `/ui` - Shared UI components and hooks

### Important Patterns

1. **Dependency Injection**
    - Uses `tsyrinx` for DI
    - Services marked with `@singleton()` decorator
    - Example: `src/api/endpoint-service.ts`

2. **State Management**
    - Each component accesses state via `useApiHooksContext`
    - State updates propagate through browser messages
    - Async state wrapped in `AsyncState<T>` type

3. **Error Handling**
    - Background fetch errors cached in `resultsCache`
    - Use `promiseResult` utility for async operations
    - Logger utility in `src/ui/util/ui-logger.ts`

### Testing and Building

```powershell
pnpm lint     # Run ESLint and Prettier checks
pnpm build    # Create production build
pnpm package  # Package for distribution
```

## Common Tasks

### Adding a New Feature

1. Define service interfaces in `/api`
2. Implement background handlers if needed
3. Update UI components with new hooks
4. Add message handling in content scripts

### Supporting a New Streaming Service

1. Add hostname in `src/config/supported-hosts.ts`
2. Create service-specific API implementation
3. Update content script matches in `PlasmoCSConfig`

## Tips and Gotchas

- Always use `fetchByBackground` for external API calls
- Picture-in-Picture mode needs special style handling
- Use `verifyMatches` to validate content script URLs
- Message passing must handle disconnected ports
