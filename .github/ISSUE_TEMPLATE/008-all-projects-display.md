## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Extract all portfolio projects from markdown files, organize images, and create a complete project grid with full tag filtering functionality.

## Acceptance criteria
- [ ] All projects extracted and added to `src/data/projects.ts`:
  - Event Driven Backtesting Framework
  - Urban Pulse: Tip Analysis
  - Urban Pulse: Features & Regression
  - STA302 Final Project
  - Tableau Visualizations (x3)
- [ ] All images moved to organized `/public/images/projects/` structure
- [ ] `ProjectGrid` component created in `src/components/ProjectGrid.tsx`
- [ ] Grid displays all projects in chronological order
- [ ] Integration with TagFilter from Issue #005 (filtering works for all projects)
- [ ] Each project correctly tagged:
  - Event Driven Backtesting: Quantitative Research, Data Engineering
  - Urban Pulse projects: Data Analysis, Data Science
  - STA302: Data Science, Data Analysis
  - Tableau: Dashboards
- [ ] Grid is responsive (columns adjust based on screen size)
- [ ] Empty state when no projects match filter
- [ ] Loading state for future async operations

## Blocked by
- Issue #003 (Extract First Project Data)
- Issue #005 (Tag Filtering System)