"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  { name: "Admin Panel", href: "/dashboard/admin", icon: Shield },
  { name: "User Management", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const accountantLinks = [
  { name: "Accountant Portal", href: "/dashboard/accountant", icon: Briefcase },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const userLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Accounts", href: "/dashboard/accounts", icon: Landmark },
  { name: "Credit & Debt", href: "/dashboard/credits-debts", icon: CreditCard },
  { name: "Sales", href: "/dashboard/sales", icon: Banknote },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Cash Flow", href: "/dashboard/cash-flow", icon: ArrowRightLeft },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Payroll", href: "/dashboard/payroll", icon: Coins },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Declarations", href: "/dashboard/declarations", icon: FileSignature },
  { name: "Revenue & Earnings", href: "/dashboard/revenue", icon: WalletCards },
  { name: "AI Assistant", href: "/dashboard/assistant", icon: Bot },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let currentLinks = userLinks;
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
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-[0_40px_60px_-15px_rgba(0,84,214,0.1)] flex flex-col p-6 z-50 transform transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 px-2 flex justify-between items-center text-[#121c2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0">
              <LogoIcon />
            </div>
            <div>
              <h1 className="font-headline-lg text-xl font-bold tracking-tight text-primary">COMPTA AI</h1>
              <p className="font-body-sm text-[10px] text-on-surface-variant font-medium tracking-wide">Premium Fintech</p>
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
                    ? "text-primary font-bold bg-primary/10 relative before:content-[''] before:absolute before:left-0 before:w-1 before:h-8 before:bg-primary before:rounded-full"
                    : "text-on-surface-variant hover:text-primary hover:bg-white/10 hover:backdrop-blur-md"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="font-body-md text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-4">
          <button className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:scale-[1.02] cursor-pointer">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* Main Content Layout */}
      <div className="md:pl-64 min-h-screen flex flex-col pt-16 md:pt-0">
        {/* Desktop Navbar */}
        <header className="hidden md:flex justify-between items-center px-10 h-16 bg-white/40 backdrop-blur-md fixed top-0 right-0 w-[calc(100%-16rem)] z-40 border-b border-white/20 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary/50 transition-all rounded-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" strokeWidth={1.5} />
              <input
                className="w-full pl-10 pr-4 py-1.5 bg-white/50 border border-outline-variant/20 rounded-lg font-body-sm text-sm focus:outline-none focus:ring-0 focus:border-primary/50"
                placeholder="Search analytics..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 text-on-surface-variant">
            <Bell className="hover:text-primary cursor-pointer transition-colors w-5 h-5" strokeWidth={1.5} />
            <HelpCircle className="hover:text-primary cursor-pointer transition-colors w-5 h-5" strokeWidth={1.5} />
            <div className="flex items-center gap-3 ml-2 border-l border-outline-variant/30 pl-6">
              <div className="text-right">
                <p className="font-title-md text-sm font-bold text-primary">Alex Sterling</p>
                <p className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
                  Administrator
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
                © 2024 COMPTA AI. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a className="hover:text-primary transition-colors" href="#">
                Product
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Features
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Pricing
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Privacy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
