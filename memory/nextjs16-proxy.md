---
name: nextjs16-proxy
description: This project runs Next.js 16.2.6 where middleware.ts is renamed to proxy.ts
metadata:
  type: project
---

This project uses Next.js 16.2.6. The `middleware` file convention is deprecated and renamed to `proxy` (`proxy.ts` at the same level as `app/`, exporting a default function `proxy(request)` or named `proxy`). Docs are bundled at `node_modules/next/dist/docs/` — AGENTS.md mandates reading them before writing code since this Next.js differs from training data. See [[compta-ai-i18n]].
