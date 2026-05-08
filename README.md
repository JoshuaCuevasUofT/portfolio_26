# Portfolio v2

A modern portfolio website featuring animated backgrounds, project filtering, and interactive details modal.

## Features

- **Animated Background**: Vanta.js waves effect with WebGL
- **Project Filtering**: Filter projects by skill tags (Data Science, Data Analysis, Quantitative Research, Data Engineering, Dashboards)
- **Responsive Design**: Mobile‑friendly layout with adaptive spacing
- **Interactive Modal**: Click a project card to view detailed description, code snippets, and links
- **Theme System**: CSS custom properties for consistent colors, spacing, and transitions
- **Performance Optimized**: Lazy‑loaded components, optimized build output

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Vanta.js (WebGL background animation)
- Three.js (WebGL dependency)
- CSS Modules & Custom Properties
- gh‑pages (deployment)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Deployment

The site is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This runs `npm run build` and pushes the `dist` folder to the `gh‑pages` branch.

## Project Structure

- `src/App.tsx` – Main application component with Vanta.js background
- `src/components/` – Reusable UI components (TagFilter, ProjectGrid, ProjectCard, etc.)
- `src/data/projects.ts` – Static project data
- `src/types/project.ts` – TypeScript definitions
- `src/styles/theme.css` – CSS custom properties and design tokens
- `src/App.css` – Component‑specific styles

## Customization

- **Colors**: Edit variables in `src/styles/theme.css`
- **Projects**: Update `src/data/projects.ts` with your own projects
- **Tags**: Modify the `Tag` type in `src/types/project.ts` and update the `allTags` arrays

## License

MIT
