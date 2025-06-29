# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo for "Use Minimal" - a service that generates printable minimalist calendars and habit trackers. The project consists of:

- **Frontend** (`apps/frontend`): Next.js application for calendar preview and purchase
- **Generator** (`apps/generator`): Puppeteer-based PDF generation service
- **Robot** (`apps/robot`): Placeholder application (currently empty)

## Development Commands

```bash
# Install dependencies
yarn install

# Start all applications in development mode
yarn dev

# Build all applications
yarn build

# Lint all applications
yarn lint

# Format code
yarn format

# Generate calendar PDFs (requires frontend to be running)
yarn generate
```

### App-specific commands

**Frontend** (`apps/frontend`):
```bash
cd apps/frontend
yarn dev          # Start Next.js dev server on port 3000
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # ESLint check
```

**Generator** (`apps/generator`):
```bash
cd apps/generator
yarn generate     # Generate calendar PDFs using Puppeteer (requires frontend running)
```

## Architecture

### Frontend Structure

- **Pages**: Next.js pages in `src/pages/`
  - `/` - Landing page with calendar previews
  - `/calendars/preview/[year]/[theme]/[locale]` - Calendar preview pages
  - `/habit-tracker/` - Habit tracker generator
  - `/print` - Print-optimized calendar rendering
- **Components**: Reusable UI components in `src/components/`
  - `calendar/` - Calendar rendering components
  - `ui/` - Shadcn/ui components (button, badge, input, select)
- **Configuration**: Calendar years, locales, and themes in `src/lib/config.ts`

### Generator Architecture

- Uses Puppeteer to screenshot and generate PDFs from the frontend's `/print` route
- Generates calendars for multiple years, locales, formats (A4/A5), and orientations
- Outputs organized folder structure with PDFs and preview images
- Creates ZIP archives for distribution

### Key Technologies

- **Frontend**: Next.js 13, React 18, TypeScript, Tailwind CSS, Luxon (date handling)
- **Generator**: Puppeteer, Node.js, TypeScript
- **Build**: Turborepo, Yarn workspaces
- **UI**: Shadcn/ui components, Radix UI primitives

### Calendar System

- Supports multiple locales (defined in `@minimal/config`)
- Multiple themes (currently "simple")
- Multiple years (2024, 2025, etc.)
- Two formats: A4 and A5
- Two orientations: portrait and landscape
- Uses Luxon for internationalized date handling

## Testing and Quality

- ESLint configuration with Next.js and Prettier integration
- TypeScript for type safety
- No test framework currently configured

## Calendar Generation Workflow

1. Frontend serves calendar previews and print-optimized views
2. Generator app uses Puppeteer to visit print URLs
3. Screenshots and PDFs are generated for all locale/format combinations
4. Output is organized and zipped for distribution