# Minimal - Minimalist Calendar Generator

A modern, type-safe web application for generating beautiful minimalist printable calendars and habit trackers. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **🗓️ Minimalist Calendars**: Generate clean, printable calendars for any year
- **📊 Habit Trackers**: Create customizable habit tracking sheets
- **🌍 Multi-language Support**: Available in 32 languages
- **📄 Multiple Formats**: A4, A5, and Letter sizes in portrait/landscape
- **🎨 Beautiful Design**: Clean, minimal aesthetic optimized for printing
- **♿ Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **⚡ Performance**: Optimized with React.memo, error boundaries, and proper TypeScript

## 🏗️ Architecture

This project is a **Turborepo monorepo** with the following structure:

### Apps

- **`apps/frontend`**: Next.js web application for calendar preview and generation
- **`apps/generator`**: Puppeteer-based PDF generation service
- **`apps/robot`**: Placeholder for future automation tasks

### Packages

- **`packages/config`**: Shared configuration for locales, themes, and calendar settings

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd minimal

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required
SITE_URL=https://useminimal.com
```

## 📦 Available Scripts

### Root Commands

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps (includes sitemap generation)
pnpm lint         # Lint all apps
pnpm format       # Format code with Prettier
pnpm test         # Run all tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
pnpm generate     # Generate calendar PDFs (requires frontend running)
```

### App-specific Commands

**Frontend** (`apps/frontend`):
```bash
cd apps/frontend
pnpm dev          # Start Next.js dev server
pnpm build        # Build for production
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

**Generator** (`apps/generator`):
```bash
cd apps/generator
pnpm generate     # Generate calendar PDFs
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Jest** for unit testing
- **React Testing Library** for component testing
- **Coverage reporting** with thresholds
- **Accessibility testing** with jest-axe

```bash
# Run all tests across the monorepo
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🌐 Supported Languages

The application supports 32 languages:

English, French, German, Spanish, Italian, Portuguese, Polish, Latvian, Norwegian, Czech, Ukrainian, Croatian, Slovak, Slovenian, Thai, Danish, Dutch, Finnish, Icelandic, Hungarian, Romanian, Swedish, Turkish, Russian, Korean, Hindi, Greek, Persian, Arabic, Hebrew, Japanese, Chinese

## 🎨 Calendar Generation

### Development Workflow

1. **Frontend** serves calendar previews at `http://localhost:3000`
2. **Generator** uses Puppeteer to capture calendar renders
3. PDFs are generated for all supported languages and formats
4. Output is organized and zipped for distribution

### Supported Outputs

- **Formats**: A4, A5
- **Orientations**: Portrait, Landscape  
- **Types**: Monthly calendars, Yearly overviews, Habit trackers
- **Languages**: 32 locales with proper date formatting

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Luxon** - Date manipulation and internationalization

### Development
- **Turborepo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

### Production
- **Puppeteer** - PDF generation
- **Vercel** - Deployment platform
- **Vercel Analytics** - Performance monitoring

## 📁 Project Structure

```
├── apps/
│   ├── frontend/           # Next.js web application
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── pages/      # Next.js pages
│   │   │   ├── lib/        # Utilities and configuration
│   │   │   └── styles/     # Global styles
│   │   ├── __tests__/      # Test files
│   │   └── public/         # Static assets
│   ├── generator/          # PDF generation service
│   └── robot/              # Future automation
├── packages/
│   └── config/             # Shared configuration
├── .env.example            # Environment variables template
├── turbo.json              # Turborepo configuration
└── CLAUDE.md               # AI assistant context
```

## 🔧 Configuration

### Adding New Languages

1. Add locale configuration to `packages/config/config.ts`
2. Test calendar rendering in all formats
3. Update language list in README

### Adding New Themes

1. Create theme component in `apps/frontend/src/components/calendar/themes/`
2. Add theme to configuration
3. Update theme lookup in print page

## 🚀 Deployment

### Vercel (Recommended)

The application is optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel

# Or connect GitHub repository for automatic deployments
```

### Manual Deployment

```bash
# Build all apps
pnpm build

# Deploy frontend app from apps/frontend/.next
# Deploy generator as serverless function or container
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- **TypeScript**: Strict mode enabled, no `any` types
- **Testing**: Write tests for new components and utilities
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Performance**: Use React.memo and useMemo for expensive operations
- **Security**: No hardcoded secrets, validate all inputs

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Analyzed and optimized with tree shaking
- **Error Handling**: Comprehensive error boundaries

## 🔒 Security

- **Input Validation**: All user inputs validated
- **XSS Prevention**: Proper escaping and sanitization
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secrets properly managed
- **Dependencies**: Regularly updated and audited

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for the minimalist community**
