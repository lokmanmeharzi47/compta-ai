"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const LANGUAGES: Record<Locale, { label: string }> = {
  fr: { label: "Français"},
  ar: { label: "العربية" },
};

type Props = {
  /** Visual treatment: "glass" for light surfaces, "solid" for the dashboard chrome. */
  variant?: "glass" | "solid";
  className?: string;
};

export default function LanguageSwitcher({ variant = "glass", className = "" }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function selectLocale(next: Locale) {
    setOpen(false);
    if (next === locale) return;

    // Persist the choice in both localStorage and a cookie so it survives
    // reloads and is available to the proxy on the next request.
    try {
      localStorage.setItem("NEXT_LOCALE", next);
    } catch {
      /* localStorage may be unavailable (private mode) */
    }
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;

    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const triggerStyles =
    variant === "glass"
      ? "bg-white/70 border-outline-variant/30 text-on-surface hover:border-primary/40"
      : "bg-white/60 border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/40";

  const current = LANGUAGES[locale];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current?.label}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md transition-all cursor-pointer disabled:opacity-60 ${triggerStyles}`}
      >
        <Globe className="w-4 h-4 shrink-0" strokeWidth={1.5} />
        <span className="hidden sm:inline text-sm font-bold leading-none">{current?.label}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 w-44 rounded-2xl border border-white/40 bg-white/90 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,80,203,0.25)] p-1.5 z-[60] overflow-hidden"
        >
          {locales.map((code) => {
            const lang = LANGUAGES[code];
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => selectLocale(code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  }`}
                >
                  <span className="flex-1 text-start">{lang.label}</span>
                  {active && <Check className="w-4 h-4 shrink-0" strokeWidth={2} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
