## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Implement a horizontal tag filtering bar with multi-select OR logic. Users can select/deselect tags to filter projects. Default state: all tags selected.

## Acceptance criteria
- [ ] `TagFilter` component in `src/components/TagFilter.tsx`
- [ ] Horizontal bar layout above project grid
- [ ] All tags displayed: 'Data Science (ML)', 'Data Analysis', 'Quantitative Research', 'Data Engineering', 'Dashboards'
- [ ] Multi-select functionality with OR logic (selecting multiple tags shows projects with ANY selected tag)
- [ ] Default state: all tags selected
- [ ] Visual selection states (different colors for selected/unselected)
- [ ] Click to select/deselect individual tags
- [ ] Filter state managed with React useState
- [ ] Filter function in `src/utils/filterProjects.ts`
- [ ] Integration test with ProjectCard from Issue #004

## Blocked by
Issue #004 (Project Card Display)