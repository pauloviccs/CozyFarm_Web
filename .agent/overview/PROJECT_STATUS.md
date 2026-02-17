# Project Overview

## Project Name

CozyTale (cozy-tale-next)

## Description

A Next.js web application designed as a companion and documentation hub for a Hytale mod (CozyFarming). It features a "Liquid Glass" UI aesthetic, immersive hero animations, and comprehensive databases for farming, industry, and crafting. It includes interactive simulators and a multi-language (EN/PT) support system.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (Animations)
- **UI Components**: Radix UI Primitives, Lucide React Icons
- **Backend/Auth**: Supabase (SSR & Client)
- **State Management**: React Context (Auth, Language)

## Folder Structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── auth/            # Auth callback handling
│   ├── automation/      # Automation simulator page
│   ├── docs/            # Documentation pages
│   │   └── ids/         # Item IDs reference page
│   ├── farming/         # Farming simulator page
│   ├── industry/        # Industry simulator page
│   ├── items/           # Item database & filter page
│   ├── settings/        # User settings & profile
│   ├── layout.tsx       # Root layout with Sidebar/Header
│   └── page.tsx         # Home page with Hero Sequence
├── components/          # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── home/            # Home page specific components (HeroSequence)
│   ├── layout/          # Sidebar, Header, etc.
│   ├── settings/        # Settings specific components
│   ├── simulators/      # Simulator components (Farming, Industry, Automation)
│   └── ui/              # Generic UI elements (GlassCard, Buttons, etc.)
├── context/             # Global providers
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── data/                # Static data definitions
│   ├── items.ts         # Central item database (Hytale & Stardew)
│   └── translations.ts  # Multi-language support strings
├── lib/                 # Utilities (supabase client, cn helper)
└── middleware.ts        # Next.js middleware (Auth protection)
.agent/                  # Agent configuration and docs
└── overview/            # Project status and overview
```

## Key Features

- **Immersive Hero Section**: Scroll-driven image sequence animation.
- **Liquid Glass UI**: Modern, translucent, and animated user interface design.
- **Item Database**: Comprehensive list of Hytale and Stardew Valley items with filtering, search, and ID copying.
- **Item IDs Reference**: Dedicated page for quick access to Hytale item IDs.
- **Documentation Hub**: Technical documentation for modding features.
- **Simulators**: Interactive pages for Farming, Industry, and Automation mechanics.
- **Authentication**: Supabase-powered user accounts with Discord integration.
- **Internationalization**: Toggleable English/Portuguese language support.
