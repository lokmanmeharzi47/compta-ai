"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Mail,
  Lock,
  ArrowRight
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

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth.login");
  const tAuth = useTranslations("auth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen bg-background">
      {/* Left Side: Brand Visuals */}
      <section className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden items-center justify-center p-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-tertiary-fixed-dim blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-fixed blur-[100px] rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-xl text-white">
          <div className="mb-4 flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 p-1.5">
              <LogoIcon />
            </div>
            <span className="font-headline-lg text-2xl font-bold tracking-tight text-white uppercase">
              COMPTA AI
            </span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-bold tracking-tight">
            {t("brandTitle")}
          </h1>
          <p className="font-body-md text-white/80 mb-12 max-w-md">
            {t("brandSubtitle")}
          </p>
          {/* Featured Image / Illustration Container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <img
              alt="Abstract Fintech Visualization"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQnVSgnr16RHSL4wr-MXqZslvEpmahrUTWicHSq3wUg6OFcbR-TGCSjwhRsjTgzTAj1G5y7KIWCghF4mO5r1jtB_rqNlrwOjfCWfBqIoLjJdDDJqsDaLXSW7TXhiZa5JGcksUjFu_ooc3J9OMuKWyQ4rnHpbYUWvF2-_t7dNm5hTdToCLbYWDm8HMqpCFm-wi1Yq3cGU-a-CA7fCHTruUaCYd3hp8wz5XpDVHcoDBeEuy9Jrp7_jm41LtBdQEoH61bmffBLENKDvc_"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        <div className="absolute top-6 end-6">
          <LanguageSwitcher variant="glass" />
        </div>
        <div className="w-full max-w-[480px]">
          {/* Header for Mobile */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2 shadow-lg p-2.5">
              <LogoIcon />
            </div>
            <h2 className="font-headline-lg text-2xl text-primary font-bold">COMPTA AI</h2>
          </div>

          <div className="bg-white border border-outline-variant/30 p-8 sm:p-10 rounded-[32px] shadow-[0_40px_60px_-15px_rgba(0,84,214,0.05)]">
            <header className="mb-8">
              <h3 className="font-headline-lg text-2xl font-bold mb-2 text-on-background">{t("welcomeBack")}</h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                {t("subtitle")}
              </p>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-on-surface-variant font-bold block px-2" htmlFor="email">
                  {t("emailLabel")}
                </label>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 rounded-2xl border border-outline-variant/40 bg-[#f8f9ff]/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body-md outline-none text-on-surface"
                    id="email"
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    required
                  />
                  <Mail className="absolute end-6 top-1/2 -translate-y-1/2 text-outline w-5 h-5" strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-2 text-xs">
                  <label className="font-label-caps text-on-surface-variant font-bold block" htmlFor="password">
                    {t("passwordLabel")}
                  </label>
                  <Link className="font-label-caps text-primary font-bold hover:underline transition-all" href="/forgot-password">
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 rounded-2xl border border-outline-variant/40 bg-[#f8f9ff]/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body-md outline-none text-on-surface"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                  <Lock className="absolute end-6 top-1/2 -translate-y-1/2 text-outline w-5 h-5" strokeWidth={1.5} />
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                {t("submit")}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs font-bold">
                <span className="bg-white px-2 text-on-surface-variant">{tAuth("orContinueWith")}</span>
              </div>
            </div>

             {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-outline-variant/40 hover:bg-[#f3f4f6] transition-colors bg-[#f8f9ff]/50 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span className="font-body-sm text-sm font-bold text-on-surface">Google</span>
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-outline-variant/40 hover:bg-[#f3f4f6] transition-colors bg-[#f8f9ff]/50 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0 fill-current text-on-surface" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                </svg>
                <span className="font-body-sm text-sm font-bold text-on-surface">Apple</span>
              </button>
            </div>

            <footer className="mt-8 text-center">
              <p className="font-body-sm text-sm text-on-surface-variant">
                {t("noAccount")}{" "}
                <Link className="text-primary font-bold hover:underline" href="/register">
                  {t("requestAccess")}
                </Link>
              </p>
            </footer>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs text-outline font-bold">
            <Link className="hover:text-primary transition-colors" href="#">
              {tAuth("privacyPolicy")}
            </Link>
            <Link className="hover:text-primary transition-colors" href="#">
              {tAuth("termsOfService")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
