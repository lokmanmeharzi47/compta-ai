"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calculator,
  Bot,
  BarChart3,
  Package,
  BellRing,
  LineChart,
  CheckCircle2,
  MoreVertical,
  Send,
  Globe,
  Mail,
  Users
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

export default function Home() {
  const t = useTranslations("landing");
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; hasChart?: boolean }>>([
    {
      sender: "user",
      text: t("chatUserMessage")
    },
    {
      sender: "ai",
      text: t("chatAiMessage"),
      hasChart: true
    }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text: chatInput }];
    setMessages(newMsgs);
    const query = chatInput;
    setChatInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: t("chatAiResponse", { query })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden bg-mesh min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center">
        <nav className="max-w-7xl w-full flex items-center justify-between px-8 py-3 glass-card rounded-full border border-outline-variant/30 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoIcon />
            </div>
            <span className="font-display-lg text-xl tracking-tight text-on-surface font-bold">COMPTA AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-on-surface-variant font-medium text-sm">
            <a className="hover:text-primary transition-colors font-bold" href="#features">{tNav("features")}</a>
            <a className="hover:text-primary transition-colors font-bold" href="#demo">{tNav("demo")}</a>
            <a className="hover:text-primary transition-colors font-bold" href="#pricing">{tNav("pricing")}</a>
            <a className="hover:text-primary transition-colors font-bold" href="#about">{tNav("about")}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="glass" />
            <Link href="/login" className="hidden sm:inline px-6 py-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">
              {tNav("login")}
            </Link>
            <Link href="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              {tNav("getStarted")}
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-12 relative mb-20">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase mb-4">
              <Sparkles className="w-4 h-4" stroke="url(#primary-grad)" strokeWidth={1.5} />
              {t("badge")}
            </div>
            <h1 className="font-display-lg text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-on-surface">
              {t.rich("heroTitle", { h: (chunks) => <span className="text-primary">{chunks}</span> })}
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl shadow-primary/30 flex items-center gap-2 group hover:translate-y-[-2px] transition-all">
                {t("startFreeTrial")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" strokeWidth={1.5} />
              </Link>
              <a href="#demo" className="px-8 py-4 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-bold text-lg hover:bg-surface-container-low transition-all">
                {t("watchDemo")}
              </a>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="w-full mt-12 relative max-w-5xl">
            <div className="glass-card rounded-[32px] p-4 border border-white/40 shadow-2xl overflow-hidden bg-white/70 backdrop-blur-md">
              <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 overflow-hidden aspect-video relative">
                <img
                  className="w-full h-full object-cover"
                  alt="A professional clean high-fidelity financial dashboard interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt3vObPiUXD0He565O6E1ZRgUBFcC9-CwqRXYcduhZ-TY7XNz3mbKG-8iU89qA1uzhqS5ZctdkxaKs1X9EOLOcSK6GpsjGkC1JG7mjUPKkOqJXfyP-WpuqvyVmWD_FT-OEDafaHARkUVA2XzhJIgY9Y8oQVDFNWsQuhsW4XXrVL58eVeVr2rEWtX9udnBknOWGh35x3f3PQ2Q-ikAbIO3xfT3y720k9lXj1ovbiPzV6VlLp1g4SUBORB5afxmxTk1mkWc_foszEjvf"
                />
                {/* Floating Glass Widgets */}
                <div className="absolute top-10 end-10 glass-card p-6 rounded-2xl w-64 text-start border border-white/60 bg-white/80 backdrop-blur-md shadow-lg hidden sm:block">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-xs text-on-surface-variant font-bold tracking-wider uppercase">{t("growthRate")}</span>
                    <TrendingUp className="w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-bold text-on-surface">+24.8%</div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full mt-4">
                    <div className="w-3/4 h-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>       

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20" id="features">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">{t("featuresTitle")}</h2>
              <p className="text-on-surface-variant text-lg">{t("featuresSubtitle")}</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
              {t("viewAllCapabilities")} <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Smart Accounting */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.15)] transition-all">
                <Calculator className="w-7 h-7" stroke="url(#primary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature1Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature1Desc")}</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                {t("feature1Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>

            {/* AI Financial Assistant */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_rgba(75,65,225,0.15)] transition-all">
                <Bot className="w-7 h-7" stroke="url(#secondary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature2Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature2Desc")}</p>
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                {t("feature2Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>

            {/* Financial Reports */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/20 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 group-hover:border-tertiary/50 group-hover:shadow-[0_0_20px_rgba(0,98,116,0.15)] transition-all">
                <BarChart3 className="w-7 h-7" stroke="url(#primary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature3Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature3Desc")}</p>
              <div className="flex items-center gap-2 text-tertiary font-bold text-sm">
                {t("feature3Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>

            {/* Inventory */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:border-orange-500/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all">
                <Package className="w-7 h-7" stroke="url(#accent-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature4Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature4Desc")}</p>
              <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                {t("feature4Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:border-rose-500/50 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all">
                <BellRing className="w-7 h-7" stroke="url(#glow-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature5Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature5Desc")}</p>
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                {t("feature5Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>

            {/* AI Forecasting */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
                <LineChart className="w-7 h-7" stroke="url(#secondary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{t("feature6Title")}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">{t("feature6Desc")}</p>
              <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
                {t("feature6Cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* AI Showcase: Chat Interface */}
        <section className="py-20 bg-surface-container-low overflow-hidden" id="demo">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display-lg text-4xl mb-6 font-bold leading-tight text-on-surface">{t("demoTitle")}</h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                {t("demoSubtitle")}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">{t("demoPoint1Title")}</span>
                    <p className="text-on-surface-variant text-sm">{t("demoPoint1Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">{t("demoPoint2Title")}</span>
                    <p className="text-on-surface-variant text-sm">{t("demoPoint2Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">{t("demoPoint3Title")}</span>
                    <p className="text-on-surface-variant text-sm">{t("demoPoint3Desc")}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative">
              {/* Glassmorphic Chat Window */}
              <div className="glass-card rounded-[32px] h-[540px] flex flex-col overflow-hidden shadow-2xl relative border border-white/40 bg-white/70 backdrop-blur-md">
                <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-white/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
                      <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{t("chatAssistantName")}</h4>
                      <span className="text-[10px] text-primary flex items-center gap-1 font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> {t("chatStatus")}
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="text-on-surface-variant cursor-pointer w-5 h-5" strokeWidth={1.5} />
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.sender === "user" ? (
                        <div className="bg-primary px-5 py-3 rounded-2xl rounded-te-none text-white text-sm max-w-[80%] shadow-lg">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="glass-card bg-white px-5 py-3 rounded-2xl rounded-ts-none text-on-surface text-sm max-w-[85%] border border-outline-variant/20 shadow-md">
                          <p className={msg.hasChart ? "mb-4" : ""}>{msg.text}</p>
                          {msg.hasChart && (
                            <div className="bg-[#eff4ff] rounded-xl p-4 border border-outline-variant/30">
                              <img
                                className="rounded-lg mb-3 w-full h-32 object-cover"
                                alt="Quarterly Profit Chart"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeGLqmKARHm7e08ijJ_k98L9qp4vda5uA-mmLCE7JaXw3oVb1rNe2yzn7EIOFEQnRHKkq4YEs_P172NRr8qSmLyXg77eMCTG0rofhnSshmH-lNvyX8S6H1Gvnjq1r7SClv1CcL2rWgRQOChUywmpf-yGABaO7nMe6Ci91Q8M0UZvr0lQaXliIqybQYbGtqk901vv-flrAJ665hZPaRFG9TEBBK84W8yGe8QjuvL_pTCMO5Xhk0h7M2cqJKcaI_nE1S8NEgJ3k8xd_I"
                              />
                              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium font-mono-data">
                                <span>{t("chartQ3")}</span>
                                <span>{t("chartQ4")}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="p-4 bg-white/40 border-t border-outline-variant/20">
                  <div className="flex items-center gap-3 bg-white border border-outline-variant/40 rounded-2xl px-4 py-2">
                    <input
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none text-on-surface"
                      placeholder={t("chatPlaceholder")}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-[1.05] transition-transform">
                      <Send className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Showcase */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">{t("analyticsTitle")}</h2>
            <p className="text-on-surface-variant text-lg">{t("analyticsSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-on-surface">{t("monthlyRevenue")}</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">+12%</span>
              </div>
              <div className="h-48 w-full flex items-end gap-2 px-2">
                <div className="flex-1 bg-primary/10 rounded-t-lg h-24"></div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-32"></div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-28"></div>
                <div className="flex-1 bg-primary/10 rounded-t-lg h-40"></div>
                <div className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t-lg h-44 shadow-lg shadow-primary/20"></div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="text-2xl font-display-lg font-bold text-on-surface">284,500 DZD</div>
                <span className="text-xs text-on-surface-variant font-mono-data">{t("updatedAgo")}</span>
              </div>
            </div>

            {/* Growth Analysis */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md overflow-hidden relative">
              <h4 className="font-bold text-on-surface mb-6">{t("growthTrajectory")}</h4>
              <img
                className="w-full h-40 object-cover rounded-xl mb-4 opacity-80"
                alt="Growth graph trajectory"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChtg_TOhZQCb5xnTNV5yNVX_MXd1RPLcT12yjiVPVkV7dxuwgjxuDgdoTwnaniQoc5tn8HkY5peAJ3Mx24Ds4YfcNG8PB3WecCJ4K8tIuvEEQTTSULLsVtjMy_w9IxqSWL4QuN98D0OHkJKWRzw2p9aeG83YhwmgPaxgrYy_Fk0mLca6V3wzBgODaCzbCe2b1BbNaU0WzVzR6Yj9cXkFNVR1sPvuqdwCqIxRr_fg1Vzp6AM0ADdcXSScTPo1GP6Z86RmEapwKmyBhf"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface-container/60">
                  <span className="block text-[10px] font-label-caps text-on-surface-variant font-bold uppercase tracking-wider">{t("newUsers")}</span>
                  <span className="text-lg font-bold text-on-surface">1,240</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container/60">
                  <span className="block text-[10px] font-label-caps text-on-surface-variant font-bold uppercase tracking-wider">{t("ltv")}</span>
                  <span className="text-lg font-bold text-on-surface">4,500 DZD</span>
                </div>
              </div>
            </div>

            {/* Cash Flow */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
              <h4 className="font-bold text-on-surface mb-6">{t("cashFlowHealth")}</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">{t("operating")}</span>
                    <span className="text-primary">85,200 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">{t("investing")}</span>
                    <span className="text-on-surface">-12,400 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-on-surface"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">{t("financing")}</span>
                    <span className="text-secondary">40,000 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-secondary"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-on-surface">{t("totalLiquidity")}</span>
                  <span className="text-xl font-display-lg font-bold text-primary">1.2M DZD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-surface-container-low/50" id="pricing">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">{t("pricingTitle")}</h2>
              <p className="text-on-surface-variant text-lg">{t("pricingSubtitle")}</p>
            </div>
            <div className="flex justify-center max-w-md mx-auto">
              {/* Professional */}
              <div className="glass-card p-10 rounded-[32px] w-full flex flex-col items-center text-center border border-primary/20 bg-white shadow-2xl relative z-10">
                <div className="absolute -top-4 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black tracking-widest uppercase">
                  {t("mostPopular")}
                </div>
                <span className="font-label-caps text-xs text-primary mb-4 font-bold tracking-widest uppercase">{t("professional")}</span>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display-lg font-bold text-primary">2500 DZD</span>
                  <span className="text-on-surface-variant">{t("perMonth")}</span>
                </div>
                <ul className="w-full space-y-4 mb-10 text-on-surface text-sm font-medium">
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    {t("planFeature1")}
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    {t("planFeature2")}
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    {t("planFeature3")}
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    {t("planFeature4")}
                  </li>
                </ul>
                <Link href="/register" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                  {t("getStartedPro")}
                </Link>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs uppercase tracking-wider">
                  {t("freeTrial14")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display-lg text-4xl md:text-5xl text-white mb-6 font-bold">{t("ctaTitle")}</h2>
              <p className="text-white/80 text-lg mb-10">{t("ctaSubtitle")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-10 py-5 rounded-2xl bg-white text-primary font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
                  {t("ctaButton")}
                </Link>
              </div>
              <p className="mt-6 text-white/60 text-sm">{t("ctaNote")}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest/30 pt-20 pb-10 border-t border-outline-variant/30" id="about">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6">
                  <LogoIcon />
                </div>
                <span className="font-display-lg text-lg tracking-tight text-on-surface font-bold">COMPTA AI</span>
              </div>
              <p className="text-on-surface-variant max-w-xs mb-8 leading-relaxed text-sm">
                {t("footerTagline")}
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
                  <Globe className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
                  <Users className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-6 text-sm">{t("footerProduct")}</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#features">{t("footerFeatures")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#demo">{t("footerAiAssistant")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerIntegrations")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerSecurity")}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-6 text-sm">{t("footerResources")}</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerDocumentation")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerApiReference")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerBlog")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerHelpCenter")}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-6 text-sm">{t("footerCompany")}</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerAboutUs")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerCareers")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerLegal")}</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">{t("footerPrivacy")}</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-outline-variant/30 text-xs text-outline font-bold">
            <p>{t("footerCopyright")}</p>
            <div className="flex gap-8">
              <a className="hover:text-on-surface transition-colors" href="#">{t("footerTerms")}</a>
              <a className="hover:text-on-surface transition-colors" href="#">{t("footerCookies")}</a>
              <a className="hover:text-on-surface transition-colors" href="#">{t("footerSecurity")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
