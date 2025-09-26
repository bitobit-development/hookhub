# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 3000 with Turbopack)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`
- **Note**: No test framework is currently configured

## Project Architecture

This is a Next.js 15.5.4 application using the App Router architecture with TypeScript and TailwindCSS.

### Key Technologies
- **Next.js 15** with App Router (src/app/ directory structure)
- **React 19**
- **TypeScript** with strict mode enabled
- **TailwindCSS 4** for styling
- **Turbopack** enabled for faster builds and development
- **ESLint** with Next.js configuration

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/layout.tsx` - Root layout with Geist fonts
- `src/app/page.tsx` - Homepage component
- `public/` - Static assets
- Path aliases: `@/*` maps to `./src/*`

### Font Configuration
The project uses Geist and Geist Mono fonts from Google Fonts, configured as CSS variables in the root layout.