# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jits-Dom is a React + TypeScript e-commerce application for a streetwear brand called "Jits". The frontend is built with Vite and designed to integrate with an ASP.NET backend API.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server (uses HTTPS, port 50922 by default)
npm run build        # Type-check with TypeScript then build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint on all files
npm run type-check   # Run TypeScript compiler without emitting files
npm run format       # Format all TypeScript files in src/ with Prettier
```

## Architecture

### Project Structure
- **src/screens/** - Page-level components (Home, Shop, About, Checkout, Theme)
- **src/components/** - Reusable components
  - **ui/** - shadcn/ui component library (Radix UI + Tailwind)
  - **figma/** - Components imported from Figma designs
- **src/router/** - React Router configuration (routes.ts defines all routes)
- **src/services/** - API client and service layer for backend communication
- **context/** - React context providers (Cart, Theme)
- **types/** - TypeScript type definitions
- **data/** - Mock/static data (products.ts)
- **styles/** - Global CSS

### Key Patterns

**Routing**: Uses React Router v7 with a nested layout structure. All routes are defined in `src/router/routes.ts`. The `Layout` component (src/components/Layout.tsx) wraps all pages and includes Navigation and footer.

**State Management**:
- Cart state: Managed via CartContext (context/CartProvider.tsx) with localStorage persistence
- Theme: Managed via ThemeContext (context/ThemeProvider.tsx) supporting light/dark/system modes with localStorage persistence
- Both contexts are initialized in main.tsx and wrap the entire app

**Backend Integration**: The app is configured to work with an ASP.NET backend:
- API proxy: All `/api/*` requests are proxied to the backend (configured in vite.config.ts)
- Backend URL is set via `VITE_API_URL` environment variable or defaults to `/api`
- HTTPS certificates are auto-generated using `dotnet dev-certs` on first run
- ApiClient class (src/services/api.ts) handles all API requests

**UI Components**: Uses shadcn/ui component library built on Radix UI primitives. All UI components follow the class-variance-authority pattern for variants and use Tailwind CSS via `@tailwindcss/vite` (v4).

**Styling**:
- Tailwind CSS v4 (uses @tailwindcss/vite plugin)
- CSS variables defined in styles/globals.css for theming
- Theme tokens use HSL color space (e.g., `hsl(var(--primary))`)
- Dark mode uses class-based strategy (`darkMode: ["class"]` in tailwind.config.js)

**Path Aliases**: `@` is aliased to `./src` directory (configured in vite.config.ts and tsconfig.app.json)

### Data Flow

1. Products are currently served from static data in `data/products.ts`
2. Cart operations flow through CartContext and persist to localStorage
3. API integration exists via ApiClient but points to backend endpoints (`/api/products`)
4. Theme preference is managed through ThemeContext and syncs with localStorage and system preferences

## Important Considerations

**HTTPS Development**: The dev server runs on HTTPS with auto-generated certificates. If certificate generation fails, check that .NET SDK is installed.

**TypeScript**: Project uses strict mode with additional linting rules (`noUnusedLocals`, `noUnusedParameters`). The build command runs type-checking before building.

**Component Imports**: When importing UI components, use the alias pattern: `import { Button } from "@/components/ui/button"`

**Environment Variables**: Set `VITE_API_URL` to point to your backend API if different from the default proxy configuration.

# Claude Instructions
- Explain reasoning before making changes
- Never modify files unless explicitly asked
- Ask before introducing new dependencies
