# Great Learning App

A modern learning management application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 📚 Activity Management (Online Classes, Assignments, Quizzes, Discussions)
- 🎨 Dark/Light Theme Support
- 📱 Progressive Web App (PWA) Ready
- 🔍 Advanced Filtering and Search
- 📊 Progress Tracking
- 🎯 Status Management (Not Started, In Progress, Completed, Overdue)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Theme:** next-themes

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (private)/         # Private routes
│   │   ├── filter/        # Filter component
│   │   └── home/          # Home page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page
├── components/            # React components
│   ├── pages/            # Page-specific components
│   ├── pagination/       # Pagination component
│   ├── theme-provider.tsx
│   └── ui/               # UI components (shadcn/ui)
└── lib/                  # Utilities and types
    ├── activity.tsx      # Activity types
    ├── constants.tsx     # Mock data
    └── utils.ts          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
