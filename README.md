# Mokshith — Portfolio

A modern personal portfolio built with React and Vite. The project focuses on smooth animations (GSAP), simple component composition, and utility-first styling with Tailwind CSS.

This README covers how to run the project locally, what the code structure is, and the important implementation details you might want to know when developing or deploying the site.

Table of contents
- Project snapshot
# Mokshith — Portfolio

A modern personal portfolio built with React and Vite. The project focuses on smooth animations (GSAP), simple component composition, and utility-first styling with Tailwind CSS.

This README covers how to run the project locally, what the code structure is, and the important implementation details you might want to know when developing or deploying the site.

Table of contents
- Project snapshot
- Tech stack
- Local setup
- Available scripts
- Project structure
- Styling and build notes (Tailwind + PostCSS)
- Deployment notes
- Contributing and license

Project snapshot
- Single-page portfolio site implemented with React (functional components + hooks).
- Smooth entrance/scroll animations implemented using GSAP and ScrollTrigger.
- Icons from `react-icons` and static assets under `src/assets/`.

Tech stack
- React 19
- Vite for fast dev server and build
- Tailwind CSS (configured via PostCSS)
- PostCSS + Autoprefixer
- GSAP (with ScrollTrigger)
- react-icons for SVG icons

Local setup
Prerequisites
- Node.js (recommended LTS) and npm

Install dependencies and start the dev server:

```powershell
cd C:\Users\Mokshith\Portfolio\portfolio
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

Available scripts
- `npm run dev` — start Vite development server with HMR
- `npm run build` — produce a production build in `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint (project includes a basic config)

Project structure (key files/folders)
- `index.html` — base HTML shell
- `src/main.jsx` — app entry and global imports
- `src/index.css` — global CSS; includes Tailwind directives and custom CSS
- `src/App.jsx` — top-level App component
- `src/components/` — React components (Hero, Navbar, Projects, About, Contact, Footer)
- `src/assets/` — images and static assets
- `vite.config.js` — Vite configuration (React plugin)

Styling & Tailwind notes
- Tailwind is included using CDN Link


- Tailwind classes are used throughout components (e.g., `flex`, `text-4xl`, `space-x-6`). If you modify component file extensions or locations, update `tailwind.config.cjs` `content` paths so Tailwind can purge unused styles on build.

Animations
- GSAP is used for entrance and background animations. `ScrollTrigger` is registered in components that use it. If you add SSR or server-side rendering later, ensure GSAP code runs only in the browser (check `typeof window !== 'undefined'`).

Deployment notes
- The project builds to `dist/`. You can deploy the `dist/` folder to static hosts (Netlify, Vercel, GitHub Pages). On Vercel/Netlify, a typical build command is `npm run build` and the output directory is `dist`.

Contributing and license
- If you want to contribute or suggest improvements, open an issue or PR on the GitHub repo.
- Add a LICENSE file if you want an explicit license. By default, no license is specified here.

Contact / Demo
- Add a live demo link here (once deployed) and any contact links you’d like visited by recruiters or collaborators.

If you'd like, I can:
- Add a `CONTRIBUTING.md` with development guidelines
- Add `.gitattributes` to normalize line endings (LF) across platforms
- Add a short CI pipeline (GitHub Actions) to run lint/build on PRs

---
Last updated: October 17, 2025
