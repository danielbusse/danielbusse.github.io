# danielbusse.github.io

Personal portfolio and project site built with Next.js, React, TypeScript, Sass, and motion libraries for page transitions and animated sections.

## Overview

- Public portfolio site with a home page, about page, CV page, and project detail pages.
- Project content is currently split between route files in `app/projects/*` and metadata in `data/projects.json`.
- Visual behavior is driven by shared article components, page-level styles, and a handful of animation helpers.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Sass modules and global Sass
- `gsap`, `framer-motion`, `lenis`, `next-view-transitions`
- `react-pdf` and `@react-pdf/renderer`

## Getting Started

Install dependencies and start the local development server. _WARNING_: If you want to run this on a local machine mae sure to check versions and security advisory on the packages used in this project!

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run the Next.js lint check

## Project Structure

- `app/` - route segments, layouts, and page-level UI
- `components/` - shared UI, layout, and content components
- `data/` - structured content and metadata
- `public/` - static assets such as fonts, PDFs, and images
- `styles/` - global style sheets and shared Sass helpers
- `utils/` - animation helpers and content lookup utilities

## Content Model

- `data/projects.json` stores project metadata used by `utils/getProject.ts`.
- Each project route in `app/projects/*/page.tsx` currently contains the article content directly.
- Shared article scaffolding lives in `components/article/*`.

## Readability and Commenting Targets

The following files should get more thorough comments or short section headers because they contain the most non-obvious logic.

### High priority

- [app/layout.tsx](app/layout.tsx): font setup, `ViewTransitions`, root metadata, and why the body class list is assembled there.
- [app/page.tsx](app/page.tsx): animation flow, `SplitText`, GSAP timeline ordering, and why the background image is layered that way.
- [app/about/page.tsx](app/about/page.tsx): Lenis setup, transition-router behavior, scroll hint handler, and the fixed background / foreground stacking.
- [app/projects/page.tsx](app/projects/page.tsx): timeline page flow, scroll hint behavior, and the background overlay structure.
- [app/cv/page.tsx](app/cv/page.tsx): PDF viewer loading strategy, fixed background layout, and wrapper stacking.
- [components/Header.tsx](components/Header.tsx): route-transition handling, initial navbar animation, and the pathname-dependent behavior.

### Medium priority

- [components/article/ArticleLayout.tsx](components/article/ArticleLayout.tsx): why the shared article shell owns Lenis and the shared background.
- [components/article/ArticleHeader.tsx](components/article/ArticleHeader.tsx): back-navigation transition handling and tag rendering.
- [components/PDFViewer.tsx](components/PDFViewer.tsx): fallback behavior for embedded PDF rendering.
- [utils/getProject.ts](utils/getProject.ts): lookup flow from slug to metadata and the shape returned to pages.
- [data/projects.json](data/projects.json): grouping by period and the meaning of each metadata field.

### Route files that need content comments or refactoring next

- [app/projects/bachelor-thesis/page.tsx](app/projects/bachelor-thesis/page.tsx): image grid structure and the intent of each visual block.
- [app/projects/master-thesis/page.tsx](app/projects/master-thesis/page.tsx): currently a placeholder; comment the future content shape when you expand it.
- [app/projects/naolino/page.tsx](app/projects/naolino/page.tsx): explanatory sections, external link context, and the video embed block.
- [app/projects/parkourmeister/page.tsx](app/projects/parkourmeister/page.tsx): same pattern as the other project pages; clarify content sections and media blocks.
- [app/projects/ronaldo/page.tsx](app/projects/ronaldo/page.tsx): the robot setup, vision pipeline, and state-machine explanation.
- [app/projects/telematik/page.tsx](app/projects/telematik/page.tsx): placeholder content plus the image grouping and callout blocks.

## Suggested Next Cleanup

1. Replace repetitive inline layout styles with shared Sass classes or small reusable components.
2. Add page-specific metadata for the project routes.
3. Decide whether project content should stay in route files or move toward a typed content source.
4. Add short comments only where the logic is not obvious from the component name or markup.

## Notes

- This README is intentionally a working template, not a finished project manifesto.
- Fill in deployment, accessibility, and content-management details as those parts become stable.
