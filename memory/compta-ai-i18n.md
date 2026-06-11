---
name: compta-ai-i18n
description: Compta AI is a bilingual FR/AR FinTech SaaS using next-intl with [locale] routing
metadata:
  type: project
---

Compta AI (C:\Users\mehar\Desktop\PROJET\25\compta ai) is a Next.js 16 FinTech SaaS. As of 2026-06, it was localized to French (default) and Arabic (RTL) only — no English remains. Uses `next-intl` 4.x with `app/[locale]/` routing, `localePrefix: 'always'` (URLs `/fr`, `/ar`), proxy.ts for locale routing/detection, message catalogs at `messages/fr.json` & `messages/ar.json`. Arabic uses `dir="rtl"` + an Arabic web font. Role-based nav (User/Accountant/Admin) preserved. Design system: Tailwind v4 `@theme` tokens in globals.css, glassmorphism (.glass-card), gradients. See [[nextjs16-proxy]].
