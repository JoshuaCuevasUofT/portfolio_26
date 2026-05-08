## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Parse the Event-Driven Backtesting Framework content from markdown files, create TypeScript interfaces for project data, and organize associated images. This creates the foundation for the project data system.

## Acceptance criteria
- [ ] TypeScript interfaces defined in `src/types/project.ts`:
  - `Project`, `Tag`, `ProjectLink` interfaces
  - Tag types: 'Data Science (ML)', 'Data Analysis', 'Quantitative Research', 'Data Engineering', 'Dashboards'
- [ ] Data extraction script created in `src/data/extract.ts`
- [ ] Event-Driven Backtesting Framework content parsed from:
  - `event_driven_backtest/readme_event_driven_backtest.md`
  - Associated images from `event_driven_backtest/` folder
- [ ] Project object created with:
  - Title, description (short and detailed)
  - Tags: 'Quantitative Research', 'Data Engineering'
  - Date (2024-02-01 estimated)
  - Image paths
  - Code snippets extracted
- [ ] Images moved to `/public/images/projects/event_driven_backtest/`
- [ ] Project data exported from `src/data/projects.ts`

## Blocked by
None - can start immediately (parallel with Issue #002)