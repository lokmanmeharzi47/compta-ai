"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  ShieldCheck,
  Sparkles,
  Eye
} from "lucide-react";

// Sleek Abstract Geometric Logo
const LogoIcon = () => (
  <Image
    src="/logo.png"
    alt="Compta AI Logo"
    width={128}
    height={128}
    className="w-full h-full object-contain"
    priority
  />
);

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("auth.register");
  const tAuth = useTranslations("auth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      {/* Left Side: Visual/Hero */}
      <section className="hidden lg:flex relative w-1/2 h-screen overflow-hidden bg-on-background">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Future of Finance Background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdPW-ZBtgjdcgQsnG63Ih9x_3TJMYRvbPZFJTGnA6n682JxQIqQ4abZKvwONobbeWKpDEOoNr2SnFz9OdtRDxvtCxniZTg996Stnx1Zun318XRavx5MqJcXuuq7O8zyy3dws6brd8svcBrlCtPdsyQWtgGKURpjPeFDwk5j28-yiGNNZdUp-y9oouMoh3wN9lauVEu76L6Wrp5vu6rVlfE59_WcEdyFTg7Uy9DrYR1gfT8am9GfYKnDbH6ItEjMGU-q0PH9zYwBUo6"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full bg-gradient-to-b from-transparent via-transparent to-on-background/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoIcon />
            </div>
            <span className="font-headline-lg text-2xl font-bold tracking-tight text-white">COMPTA AI</span>
          </div>
          <div className="max-w-xl">
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-bold leading-tight">
              {t("brandTitle")}
            </h1>
            <p className="font-body-md text-base text-white/70 max-w-md">
              {t("brandSubtitle")}
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl">
              <ShieldCheck className="w-5 h-5 shrink-0" stroke="url(#glow-grad)" strokeWidth={1.5} />
              <span className="font-label-caps text-xs text-white/80 font-bold uppercase tracking-wider">
                {t("secureEncryption")}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl">
              <Sparkles className="w-5 h-5 shrink-0" stroke="url(#glow-grad)" strokeWidth={1.5} />
              <span className="font-label-caps text-xs text-white/80 font-bold uppercase tracking-wider">
                {t("aiInsights")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <main className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 bg-[#eff4ff] relative">
        <div className="absolute top-6 end-6">
          <LanguageSwitcher variant="glass" />
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-[0_40px_60px_-15px_rgba(0,84,214,0.1)] w-full max-w-md p-8 sm:p-12 rounded-3xl">
          <div className="mb-8">
            <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">{t("createAccount")}</h2>
            <p className="font-body-sm text-sm text-on-surface-variant">
              {t("alreadyHaveAccount")}{" "}
              <Link className="text-primary font-bold hover:underline" href="/login">
                {t("signIn")}
              </Link>
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white/50 hover:bg-white transition-all font-body-sm text-sm font-bold text-on-surface cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white/50 hover:bg-white transition-all font-body-sm text-sm font-bold text-on-surface cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0 fill-current text-on-surface" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center py-4 mb-4">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-4 font-label-caps text-[10px] text-outline font-bold tracking-widest uppercase">
              {tAuth("orContinueWithEmail")}
            </span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-caps text-xs text-outline mb-2 font-bold tracking-wider">{t("fullName")}</label>
              <input
                className="w-full bg-[#f8f9ff]/40 border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-on-surface"
                placeholder={t("fullNamePlaceholder")}
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-label-caps text-xs text-outline mb-2 font-bold tracking-wider">{t("businessEmail")}</label>
              <input
                className="w-full bg-[#f8f9ff]/40 border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-on-surface"
                placeholder={t("businessEmailPlaceholder")}
                type="email"
                required
              />
            </div>
            <div>
              <label className="block font-label-caps text-xs text-outline mb-2 font-bold tracking-wider">{t("companyName")}</label>
              <input
                className="w-full bg-[#f8f9ff]/40 border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-on-surface"
                placeholder={t("companyNamePlaceholder")}
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-label-caps text-xs text-outline mb-2 font-bold tracking-wider">{t("password")}</label>
              <div className="relative">
                <input
                  className="w-full bg-[#f8f9ff]/40 border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none text-on-surface"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                <button className="absolute end-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary cursor-pointer flex items-center justify-center" type="button">
                  <Eye className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input className="mt-1 rounded border-outline-variant/40 text-primary focus:ring-primary cursor-pointer" id="terms" type="checkbox" required />
              <label className="font-body-sm text-xs text-on-surface-variant cursor-pointer" htmlFor="terms">
                {t("agreePrefix")}{" "}
                <Link className="text-primary hover:underline" href="#">
                  {t("termsOfService")}
                </Link>{" "}
                {t("agreeMiddle")}{" "}
                <Link className="text-primary hover:underline" href="#">
                  {t("privacyPolicy")}
                </Link>
                .
              </label>
            </div>

            <button
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 hover:scale-[1.01] cursor-pointer"
              type="submit"
            >
              {t("submit")}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-center">
            <p className="font-label-caps text-[10px] text-outline font-bold">{t("copyright")}</p>
            <div className="flex gap-4">
              <Link className="font-label-caps text-[10px] text-outline hover:text-primary font-bold" href="#">
                {t("help")}
              </Link>
              <Link className="font-label-caps text-[10px] text-outline hover:text-primary font-bold" href="#">
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
