## Parent
Reference: PORTFOLIO_V2_PRD.md

## What to build
Optimize performance through lazy loading, bundle optimization, and implement GitHub Pages deployment configuration.

## Acceptance criteria
- [ ] Lazy loading for:
  - Project images (below the fold)
  - Background animation (loads after critical content)
  - Modal content (loads when opened)
- [ ] Bundle optimization:
  - Tree shaking configured
  - Code splitting for routes (if applicable)
  - Vite build optimizations enabled
- [ ] GitHub Pages deployment:
  - `gh-pages` package installed
  - Deployment script in `package.json`
  - GitHub Actions workflow in `.github/workflows/deploy.yml`
  - `404.html` for SPA routing
- [ ] Performance metrics:
  - Lighthouse score > 90 for Performance
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3.5s
- [ ] Image optimization:
  - Appropriate image formats (WebP where supported)
  - Correct image sizes for different breakpoints
- [ ] Build succeeds without warnings
- [ ] Site deployed and accessible via GitHub Pages

## Blocked by
Issue #011 (Responsive Design)