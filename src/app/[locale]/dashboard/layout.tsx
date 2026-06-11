"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  LayoutDashboard,
  Banknote,
  Receipt,
  FileText,
  Package,
  Coins,
  BarChart3,
  Bot,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Menu,
  X,
  ArrowRightLeft,
  Landmark,
  CreditCard,
  FileSignature,
  Users,
  WalletCards,
  Shield,
  Briefcase
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

const adminLinks = [
  { key: "adminPanel", href: "/dashboard/admin", icon: Shield },
  { key: "userManagement", href: "/dashboard/users", icon: Users },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
];

const accountantLinks = [
  { key: "accountantPortal", href: "/dashboard/accountant", icon: Briefcase },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
];

const userLinks = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "accounts", href: "/dashboard/accounts", icon: Landmark },
  { key: "creditDebt", href: "/dashboard/credits-debts", icon: CreditCard },
  { key: "sales", href: "/dashboard/sales", icon: Banknote },
  { key: "expenses", href: "/dashboard/expenses", icon: Receipt },
  { key: "cashFlow", href: "/dashboard/cash-flow", icon: ArrowRightLeft },
  { key: "invoices", href: "/dashboard/invoices", icon: FileText },
  { key: "inventory", href: "/dashboard/inventory", icon: Package },
  { key: "payroll", href: "/dashboard/payroll", icon: Coins },
  { key: "reports", href: "/dashboard/reports", icon: BarChart3 },
  { key: "declarations", href: "/dashboard/declarations", icon: FileSignature },
  { key: "revenue", href: "/dashboard/revenue", icon: WalletCards },
  { key: "assistant", href: "/dashboard/assistant", icon: Bot },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let currentLinks: ReadonlyArray<{ key: string; href: string; icon: typeof Shield }> = userLinks;
  if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/users')) {
    currentLinks = adminLinks;
  } else if (pathname.startsWith('/dashboard/accountant')) {
    currentLinks = accountantLinks;
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-6 h-16 bg-white/80 backdrop-blur-md border-b border-white/20 fixed top-0 w-full z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">
            <LogoIcon />
          </div>
          <span className="font-display-lg text-lg font-bold tracking-tight text-primary">COMPTA AI</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="solid" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 start-0 h-full w-64 bg-white/80 backdrop-blur-xl border-e border-white/20 shadow-[0_40px_60px_-15px_rgba(0,84,214,0.1)] flex flex-col p-6 z-50 transform transition-transform duration-300 md:translate-x-0 md:rtl:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="mb-10 px-2 flex justify-between items-center text-[#121c2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0">
              <LogoIcon />
            </div>
            <div>
              <h1 className="font-headline-lg text-xl font-bold tracking-tight text-primary">COMPTA AI</h1>
              <p className="font-body-sm text-[10px] text-on-surface-variant font-medium tracking-wide">{tCommon("tagline")}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-outline hover:text-primary cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {currentLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "text-primary font-bold bg-primary/10 relative before:content-[''] before:absolute before:start-0 before:w-1 before:h-8 before:bg-primary before:rounded-full"
                    : "text-on-surface-variant hover:text-primary hover:bg-white/10 hover:backdrop-blur-md"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="font-body-md text-sm">{t(`nav.${link.key}`)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-4">
          <button className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:scale-[1.02] cursor-pointer">
            {t("upgradeToPro")}
          </button>
        </div>
      </aside>

      {/* Main Content Layout */}
      <div className="md:ps-64 min-h-screen flex flex-col pt-16 md:pt-0">
        {/* Desktop Navbar */}
        <header className="hidden md:flex justify-between items-center px-10 h-16 bg-white/40 backdrop-blur-md fixed top-0 end-0 w-[calc(100%-16rem)] z-40 border-b border-white/20 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary/50 transition-all rounded-lg">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" strokeWidth={1.5} />
              <input
                className="w-full ps-10 pe-4 py-1.5 bg-white/50 border border-outline-variant/20 rounded-lg font-body-sm text-sm focus:outline-none focus:ring-0 focus:border-primary/50"
                placeholder={t("searchPlaceholder")}
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 text-on-surface-variant">
            <LanguageSwitcher variant="solid" />
            <Bell className="hover:text-primary cursor-pointer transition-colors w-5 h-5" strokeWidth={1.5} />
            <HelpCircle className="hover:text-primary cursor-pointer transition-colors w-5 h-5" strokeWidth={1.5} />
            <div className="flex items-center gap-3 ms-2 border-s border-outline-variant/30 ps-6">
              <div className="text-end">
                <p className="font-title-md text-sm font-bold text-primary">{t("userName")}</p>
                <p className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
                  {t("administrator")}
                </p>
              </div>
              <img
                alt="User Portrait"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdqVK1r4YRvXs8w31dQjxdmAsRXK-GgnYtawFkPU_vHeOGbUGn8b-W-hEtclSiTlAbF5bT3b7aLGA_mbXK__844dXwr4NlHUGL8rwnx0PydH4fiUIPxGtkeOGQiubBOnBR5pOdYZxoZtb5pbqR0HzBWDJTrpfckI_F6akUsvKvAMwET4PzRH9ucYdk-XyfiefwwHh_jw12Sw3I9RUDolPoWqoT6FlhMjZoqF-8fxC1Gfbzb5jyRPSj_GYsT2AcesM8C1inGoNpAa0"
              />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 pt-6 md:pt-20 pb-12 px-6 md:px-10 flex flex-col justify-between">
          <div className="w-full">{children}</div>

          {/* Footer inside Content Area */}
          <footer className="w-full mt-12 py-4 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5">
                <LogoIcon />
              </div>
              <span className="font-title-md font-bold text-primary">COMPTA AI</span>
              <span className="text-outline">|</span>
              <p className="font-body-sm text-on-surface-variant">
                {t("footerRights")}
              </p>
            </div>
            <div className="flex gap-6">
              <a className="hover:text-primary transition-colors" href="#">
                {t("footerProduct")}
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                {t("footerFeatures")}
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                {t("footerPricing")}
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                {t("footerPrivacy")}
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                {t("footerTerms")}
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
