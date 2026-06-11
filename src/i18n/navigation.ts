import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. Use these everywhere instead of the
// equivalents from `next/link` and `next/navigation` so the active locale
// prefix is preserved across navigations.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
