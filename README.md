# SME Digital Package — Next.js App

This is the React/Next.js version of the SME Digital Media Package price guide.

## What is included

- Interactive service cards
- Website service filter
- Editable client/business name field
- Live package estimator
- Download selected estimate as PDF
- Download full page as a PDF for clients who cannot access the website
- Media placeholders in `public/media`
- Static-export friendly Next.js configuration for Vercel or normal static hosting

## Best approach

Use Next.js + Vercel.

Why:
- You can host it directly on Vercel with almost no setup.
- Media files can be added inside `public/media`.
- The calculator is easier to maintain in React state.
- The PDF buttons work fully in the browser using `jspdf` and `html2canvas`.
- `next.config.mjs` includes `output: 'export'`, so the app can also generate static HTML files in the `out` folder after build.

## How to run locally

```bash
cd sme-digital-next-app
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## How to add your media

1. Put images inside:

```bash
public/media
```

2. Recommended formats:

```bash
.jpg, .png, .webp, .svg
```

3. Replace the placeholder SVG files or change the paths in:

```bash
app/page.tsx
```

Example:

```tsx
media: '/media/social-media.jpg'
```

## How to deploy on Vercel

### Method 1: GitHub + Vercel

1. Create a GitHub repo.
2. Upload this project folder.
3. Go to Vercel.
4. Import the GitHub repo.
5. Framework should auto-detect as Next.js.
6. Deploy.

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

## PDF buttons

### Estimate PDF

The calculator creates a proper text-based PDF with:
- Communica Solutions header
- Client name, if entered
- Selected services
- Individual prices
- Total estimate
- Pricing note
- Contact details

### Full Page PDF

The full page PDF button captures the whole landing page and downloads it as a multipage A4 PDF. It temporarily forces all website services to show, so the client PDF is not exported in a collapsed/filtered state.

## Main files to edit

```bash
app/page.tsx       # Content, prices, service list, calculator, PDF logic
app/globals.css    # Full design styling
public/media       # Images/media placeholders
```

## Important note

Browser-side full-page PDF export is good for proposal-style sharing, but it rasterises the page as an image inside the PDF. For legal/procurement-grade, selectable-text PDFs, you would build a separate server-side PDF template. For this SME sales tool, the current approach is practical and Vercel-friendly.
