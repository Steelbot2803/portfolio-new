# Siddharth Kumar Portfolio

Public source for a personal portfolio site built with Astro, Tailwind CSS, and Netlify.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/medium.svg)](https://astro.build)

[![Icons by Lucide](https://img.shields.io/badge/Icons-LUCIDE-18181B?style=for-the-badge&labelColor=18181B&color=334155)](https://lucide.dev)

[![Deploys by Netlify](https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg)](https://www.netlify.com)

## Stack

- Astro 6
- Tailwind CSS 4
- Lucide icons
- Netlify deployment
- Netlify Forms for contact submissions

## Features

- Responsive portfolio layout
- Light and dark theme toggle
- Mobile dropdown navigation
- Resume download from a static public asset
- Content-driven sections powered by `src/content/portfolio.json`
- Netlify-ready contact form

## Project Structure

```text
src/
  components/
    sections/
    ui/
  content/
    portfolio.json
  layouts/
  pages/
public/
  admin/
  resume.pdf
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content Updates

Most editable portfolio content lives in:

- `src/content/portfolio.json`

That includes:

- profile details
- section copy
- experience
- projects
- skills
- public resume URL

## Netlify Deployment

This project is configured for Netlify via the Astro Netlify adapter.

Typical deploy flow:

1. Push the repository to GitHub.
2. Import the repo into Netlify.
3. Let Netlify run the default build command:

```bash
npm run build
```

## Contact Form

The contact form is configured for Netlify Forms.

To verify it in production:

1. Deploy the site to Netlify.
2. Submit the form once on the deployed site.
3. Check the Netlify dashboard under Forms.

## License

This repository is licensed under the MIT License. See [LICENSE](./LICENSE).

## Code of Conduct

This project follows the guidelines in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
