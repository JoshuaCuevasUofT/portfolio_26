## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Create a ProjectCard component that displays a single project with chronological ordering. The card should show project title, tags, short description, and an indicator arrow.

## Acceptance criteria
- [ ] `ProjectCard` component in `src/components/ProjectCard.tsx`
- [ ] Props interface matching `Project` type
- [ ] Card displays:
  - Project title
  - Tags as badges/pills
  - Short description (2-3 lines)
  - Indicator arrow in bottom-right corner
- [ ] Basic card styling with shadow and hover effect
- [ ] Chronological sorting function in `src/utils/sortProjects.ts`
- [ ] Test display with the Event-Driven Backtesting Framework project
- [ ] Click handler placeholder (will open modal in later issue)
- [ ] Card matches theme colors from Issue #002

## Blocked by
- Issue #002 (Color Theme Foundation)
- Issue #003 (Extract First Project Data)