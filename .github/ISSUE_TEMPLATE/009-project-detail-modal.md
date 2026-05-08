## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Implement a modal overlay for detailed project views. Clicking a project card opens a modal with full project description, images, code snippets, and links.

## Acceptance criteria
- [ ] `ProjectModal` component in `src/components/ProjectModal.tsx`
- [ ] Modal opens when ProjectCard is clicked
- [ ] Modal displays:
  - Project title
  - Full detailed description
  - All project images
  - Code snippets (if available)
  - Links to external content (Tableau, GitHub, etc.)
  - Close button
- [ ] Modal has overlay backdrop (semi-transparent dark)
- [ ] Modal closes on:
  - Close button click
  - Backdrop click
  - Escape key press
- [ ] Smooth open/close animations
- [ ] Images display in modal (basic display, zoom in next issue)
- [ ] Modal is responsive (adapts to screen size)
- [ ] Integration with all existing projects

## Blocked by
Issue #008 (All Projects Display)