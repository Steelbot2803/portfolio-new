# Portfolio Website (Astro)

This project is a portfolio site with:

- Tailwind CSS utility-first styling for fast visual iteration.
- Dark/light mode toggle with system preference + localStorage persistence.
- Structured resume-style sections (hero, about, experience, projects, skills).
- A public read-only experience for visitors.
- Owner-only content editing through Decap CMS (`/admin`).
- A contact form endpoint with validation, honeypot, and in-memory rate limiting.

## 1) Run locally

```sh
npm install
npm run dev
```

## 2) Update your portfolio content quickly

All portfolio text and section data live in:

- `src/content/portfolio.json`

You can edit this file directly, or use the admin UI:

- `http://localhost:4321/admin`

### Decap CMS setup (owner-only edits)

This repo includes Decap CMS config in `public/admin/config.yml`.

To enforce owner-only editing in production:

1. Deploy on Netlify.
2. Enable **Netlify Identity** and **Git Gateway**.
3. Disable open signup and invite only your own account.
4. Keep visitors on the public site only; only authenticated users can access editing and commit changes.
5. Protect `main` branch via repository settings.

## 3) Contact form behavior

The form posts to:

- `src/pages/api/contact.ts`

Features:

- Required field validation (`name`, `email`, `phone`, `message`).
- Email format validation.
- Honeypot (`company`) anti-spam field.
- Basic per-IP rate limit (6 requests / minute in-memory).

### Sending submissions to your inbox/CRM

Set this environment variable in deployment:

```sh
CONTACT_WEBHOOK_URL=https://your-webhook-endpoint
```

The endpoint will forward sanitized submission payloads to your webhook.

## 4) Resume and profile links

Update these in `src/content/portfolio.json`:

- `profile.linkedin`
- `profile.github`
- `profile.resumeUrl`

## 5) SEO & social metadata

`src/layouts/Layout.astro` includes:

- Meta description
- Canonical URL
- Open Graph tags
- Twitter summary tags

Update defaults in `src/content/portfolio.json` under `seo`.

## 6) Theme mode

- Use the header toggle to switch between dark and light themes.
- By default, the site follows the system theme preference.
- After the user toggles the theme, that explicit choice is saved in `localStorage` and used on future visits.
