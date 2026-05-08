# Portfolio Website V2 - Product Requirements Document

**Date**: 2026-05-07  
**Owner**: Joshua Joel Cuevas  
**Status**: Approved for Implementation

## Problem Statement

The user (Joshua Joel Cuevas) needs to update their outdated portfolio website to secure data science, data analyst, and quantitative research/trader roles. The current portfolio consists of randomly scattered Markdown files and images that are difficult to navigate and lack professional presentation. The user wants a modern, interactive website with ocean-themed visual effects, professional dark theme, and interactive elements to showcase their projects effectively to potential employers.

## Solution

Build a React + Vite + TypeScript single-page application with ocean wave particle animations, a dark professional theme using the specified color palette (#54AECC, #5472CC, #7254CC), and interactive project filtering. The application will extract and reorganize content from existing Markdown files into a visually appealing chronological project display with tag-based filtering, skills visualization, and contact information.

## User Stories

1. **As a potential employer**, I want to quickly understand Joshua's expertise and skills, so that I can assess their fit for data science roles.

2. **As a hiring manager**, I want to see Joshua's projects organized chronologically, so that I can understand their growth and recent work.

3. **As a technical recruiter**, I want to filter projects by skill tags (Data Science, Data Analysis, Quantitative Research, Data Engineering, Dashboards), so that I can find relevant work samples quickly.

4. **As a visitor**, I want to experience an engaging ocean-themed visual background with interactive elements, so that the portfolio feels modern and memorable.

5. **As a user**, I want to click on project cards to see detailed descriptions, images, and code snippets, so that I can evaluate the depth of Joshua's work.

6. **As a mobile user**, I want the portfolio to be responsive and functional on my device, so that I can view it anywhere.

7. **As a visitor with performance concerns**, I want the site to load quickly with optimized assets, so that I don't lose interest.

8. **As someone assessing technical skills**, I want to see a visual skills section with icons and labels, so that I can quickly scan Joshua's technical capabilities.

9. **As a potential collaborator**, I want easy access to contact information and social links, so that I can reach out for opportunities.

10. **As a user interested in specific projects**, I want to view high-quality project images with zoom functionality, so that I can examine details closely.

11. **As a visitor navigating the site**, I want smooth hover animations and transitions, so that the experience feels polished and professional.

12. **As someone reviewing quantitative work**, I want to see Joshua's event-driven backtesting framework presented clearly with flowcharts and results, so that I can evaluate their quantitative research skills.

13. **As a data science hiring manager**, I want to see statistical analysis projects with methodology and results, so that I can assess analytical rigor.

14. **As a Tableau/Dashboard focused role evaluator**, I want to see data visualization projects with interactive links, so that I can assess presentation skills.

15. **As a job seeker**, Joshua wants his personal brand represented consistently with colors #54AECC, #5472CC, #7254CC on dark gray (#1d1e2b) background, so that his portfolio has a distinctive professional identity.

## Implementation Decisions

### Technical Stack
- **Frontend Framework**: React 18+ with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: CSS Modules with CSS Custom Properties for theming
- **Animation Library**: Vanta.js WAVES effect for ocean-themed background with mouse interaction
- **Fonts**: Google Fonts (Montserrat for headings, Inter for body text)
- **Deployment**: GitHub Pages with GitHub Actions CI/CD

### Architecture Modules
1. **Theme System**: CSS custom properties for color palette and theming with dark gray base (#1d1e2b)
2. **Background Animation Controller**: Manages Vanta.js WAVES initialization, configuration, and cleanup
3. **Project Data Extractor**: Parses existing Markdown files to create structured Project objects
4. **Tag Filtering Engine**: Implements multi-select OR logic for project filtering with default all tags selected
5. **Project Modal Manager**: Handles modal display for detailed project views with image zoom
6. **Image Asset Organizer**: Moves and organizes images from scattered locations to `/public/images/`
7. **Responsive Layout System**: CSS Grid/Flexbox with breakpoints for desktop, tablet, mobile

### Component Structure
- `App`: Root component with background and layout
- `Hero`: Name, title, brief introduction
- `TagFilter`: Horizontal bar with interactive tag buttons
- `ProjectGrid`: Responsive grid of project cards
- `ProjectCard`: Individual project display with title, tags, description, indicator arrow
- `ProjectModal`: Full-screen overlay with detailed project content and images
- `Skills`: Grid of skill icons with labels
- `Contact`: Email, LinkedIn, GitHub links

### Data Structure
```typescript
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  tags: Tag[];
  images: string[]; // paths to images in /public/images/
  codeSnippets?: string[];
  links?: Array<{title: string, url: string}>;
  date: string; // ISO format for chronological ordering
}

type Tag = 'Data Science (ML)' | 'Data Analysis' | 'Quantitative Research' | 'Data Engineering' | 'Dashboards';
```

### Interaction Design
- **Tag Filtering**: Multi-select with OR logic, visual selection state
- **Project Cards**: Click opens modal, hover shows subtle shadow
- **Modal Navigation**: Close button, image zoom on hover within modal
- **Background**: Vanta.js WAVES with mouse repulsion, subtle wave motion

### Content Strategy
- Extract and rewrite project descriptions from Markdown files while preserving conversational tone
- Organize images into `/public/images/projects/[project-name]/` structure
- Create chronological ordering based on project dates (default to 2020-01-01 if unknown)
- Map existing projects to tags:
  - Event Driven Backtesting Framework → Quantitative Research, Data Engineering
  - Urban Pulse projects → Data Analysis, Data Science
  - STA302 Final Project → Data Science, Data Analysis
  - Tableau visualizations → Dashboards

## Testing Decisions

### Testing Philosophy
- Focus on external behavior rather than implementation details
- Prioritize user interactions and data flow over component internals
- Use integration tests for critical user flows

### Modules to Test
1. **Tag Filtering Engine**: Verify OR logic works correctly with various tag combinations
2. **Project Data Extractor**: Ensure Markdown parsing captures all relevant content
3. **Project Modal Manager**: Test open/close functionality and image display
4. **Responsive Layout**: Verify grid adapts correctly at breakpoints

### Testing Approach
- **Manual Verification**: Visual inspection of styling, animations, and interactions
- **TypeScript**: Strict type checking to catch data structure issues
- **Build Verification**: Ensure production build succeeds without errors
- **Browser Testing**: Smoke test on Chrome, Firefox, Safari, Edge

### Test Environment
- Development: Local Vite dev server
- Production: GitHub Pages deployment verification
- No unit test framework initially (Vitest can be added later if needed)

## Phased Implementation Plan

### Phase 1: Foundation (MVP Core)
1. Initialize Vite + React + TypeScript project
2. Install dependencies (Vanta.js, required fonts)
3. Set up theme system with CSS custom properties
4. Implement Vanta.js WAVES background with configuration
5. Create basic component structure
6. Set up GitHub Pages deployment configuration

### Phase 2: Content & Structure (MVP Complete)
7. Extract project data from markdown files → `projects.ts`
8. Build ProjectCard and ProjectGrid components
9. Implement TagFilter component with multi-select OR logic
10. Create Hero, Skills, Contact sections
11. Organize images into `/public/images/` structure
12. Implement chronological ordering

### Phase 3: Polish & Interactions (Enhanced UX)
13. Add ProjectModal for detailed project views
14. Implement hover animations and transitions
15. Add image zoom functionality in modals
16. Enhance background effects and interactions
17. Final styling adjustments and responsiveness
18. Performance optimizations

## Out of Scope

1. **Blog/Articles Section**: Not included in current implementation
2. **Education Timeline**: Will not be featured as a separate section
3. **Advanced Accessibility Features**: Basic semantic HTML only, no comprehensive a11y audit
4. **Backend/API Integration**: Purely static frontend application
5. **User Authentication/Admin Panel**: No content management system
6. **Analytics Tracking**: No user behavior tracking implementation
7. **Multi-language Support**: English-only content
8. **Print Styles**: No specialized print stylesheets
9. **Offline Functionality**: No service workers or PWA features
10. **Legacy Browser Support**: Targets modern browsers only
11. **Image Optimization Pipeline**: Manual image organization only, no automated compression
12. **Contact Form Backend**: Placeholder contact section only
13. **Unit Test Suite**: Manual testing only for MVP

## Risk Mitigation

- **Vanta.js Performance**: Implement as optional feature with static fallback
- **Image Loading Performance**: Lazy load non-critical images, optimize image sizes
- **TypeScript Strictness**: Use type assertions carefully for extracted data
- **Browser Compatibility**: Test on target browsers during development
- **Bundle Size**: Tree-shake dependencies, code split where possible

## Success Criteria

1. Portfolio deployed and accessible on GitHub Pages
2. All existing project content properly extracted and displayed
3. Tag filtering functional with OR logic and default all tags selected
4. Ocean background animation visible and performant on modern devices
5. Professional dark theme with specified color palette applied consistently
6. Responsive design working on desktop, tablet, and mobile
7. Project modals with image zoom functionality
8. Skills section visually displaying technical capabilities
9. Contact information easily accessible

## Content Sources

| Project | Source Files | Tags | Key Images |
|---------|-------------|------|------------|
| Event Driven Backtesting Framework | `event_driven_backtest/readme_event_driven_backtest.md` | Quantitative Research, Data Engineering | Flowchart, portfolio value charts, trade logs |
| Urban Pulse: Tip Analysis | `course1.md`, `base.md` | Data Analysis, Data Science | Box plots, histograms, bar charts |
| Urban Pulse: Features & Regression | `project2_4and5.md` | Data Science, Data Analysis | Correlation heatmaps, model results |
| STA302 Final Project | `stats_project.md` | Data Science, Data Analysis | School project visualization |
| Tableau Visualizations | `thing.md`, `index.md` | Dashboards | Bike maintenance, lightning strike visualizations |

## Issue Breakdown

### Phase 1 Issues
1. **Setup development environment** (Vite + React + TypeScript)
2. **Implement theme system** (CSS variables, dark theme)
3. **Integrate Vanta.js WAVES background**
4. **Create basic component scaffolding**

### Phase 2 Issues
5. **Extract and structure project data** from markdown files
6. **Build project grid and cards** with chronological ordering
7. **Implement tag filtering system** with OR logic
8. **Create hero, skills, and contact sections**
9. **Organize image assets** into /public/images/

### Phase 3 Issues
10. **Implement project modal** with detailed views
11. **Add hover animations and interactions**
12. **Implement image zoom functionality**
13. **Enhance background effects and performance**
14. **Final styling and responsiveness polish**

---

**Approval**: ✅ User has approved the technical approach and phased implementation plan during the grill-me interview session.

**Next Steps**: Create GitHub issues for each phase and begin implementation of Phase 1.