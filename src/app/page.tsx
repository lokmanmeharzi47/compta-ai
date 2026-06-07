"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  Check,
  Globe,
  Mail,
  Users
} from "lucide-react";

// Sleek Abstract Geometric Logo
const LogoIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0054d6" />
        <stop offset="100%" stopColor="#4b41e1" />
      </linearGradient>
      <linearGradient id="logo-g2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00f5d4" />
        <stop offset="100%" stopColor="#0054d6" />
      </linearGradient>
    </defs>
    <path
      d="M14 6C9.58 6 6 9.58 6 14c0 3.31 2.01 6.16 4.88 7.37L15 15.5l-4.12-4.12A3.99 3.99 0 0114 10c1.1 0 2.09.45 2.83 1.17l3.54-3.54A7.95 7.95 0 0014 6z"
      fill="url(#logo-g1)"
    />
    <path
      d="M18 26c4.42 0 8-3.58 8-8 0-3.31-2.01-6.16-4.88-7.37L17 16.5l4.12 4.12A3.99 3.99 0 0118 22c-1.1 0-2.09-.45-2.83-1.17l-3.54 3.54A7.95 7.95 0 0018 26z"
      fill="url(#logo-g2)"
    />
    <circle
      cx="16"
      cy="16"
      r="3"
      fill="#FFFFFF"
    />
    <circle
      cx="16"
      cy="16"
      r="2"
      fill="url(#logo-g1)"
    />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; hasChart?: boolean }>>([
    {
      sender: "user",
      text: `"Compare our net profit margin from Q3 to Q4 and identify the main cost drivers."`
    },
    {
      sender: "ai",
      text: "Your net profit margin grew by 12.4% in Q4. This was primarily driven by a 15% reduction in cloud infrastructure costs.",
      hasChart: true
    }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text: chatInput }];
    setMessages(newMsgs);
    setChatInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Analyzing "${chatInput}"... Based on our current projection, your growth is solid with standard operational margins remaining within 22-25%. Let me know if you would like me to generate a detailed CSV statement or a bar chart.`
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
            <a className="hover:text-primary transition-colors font-bold" href="#features">Features</a>
            <a className="hover:text-primary transition-colors font-bold" href="#demo">AI Demo</a>
            <a className="hover:text-primary transition-colors font-bold" href="#pricing">Pricing</a>
            <a className="hover:text-primary transition-colors font-bold" href="#about">About</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              Get Started
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
              The Intelligence Layer for Finance
            </div>
            <h1 className="font-display-lg text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-on-surface">
              AI-Powered Cloud <span className="text-primary">Accounting</span> for Modern Businesses
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the future of finance with intelligent analytics, automated bookkeeping, and real-time insights powered by advanced neural models.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl shadow-primary/30 flex items-center gap-2 group hover:translate-y-[-2px] transition-all">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
              <a href="#demo" className="px-8 py-4 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-bold text-lg hover:bg-surface-container-low transition-all">
                Watch Demo
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
                <div className="absolute top-10 right-10 glass-card p-6 rounded-2xl w-64 text-left border border-white/60 bg-white/80 backdrop-blur-md shadow-lg hidden sm:block">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-xs text-on-surface-variant font-bold tracking-wider uppercase">Growth Rate</span>
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

        {/* Trusted By */}
        <section className="py-16 bg-white/30 border-y border-outline-variant/10">
          <h4 className="text-center font-label-caps text-xs text-outline mb-10 tracking-[0.2em] font-bold uppercase">
            POWERING THE NEXT GENERATION OF FINTECH
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 transition-all duration-500 px-6">
            {/* Stripe */}
            <div className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-[#635BFF] transition-colors duration-300 cursor-default select-none">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.93 12.3c0-2.03-1.06-3.13-2.9-3.13-2.18 0-3.32 1.34-3.32 3.23 0 2.53 1.48 3.56 3.4 3.56 1.83 0 2.92-.8 3.58-1.57l-1.45-1.12c-.44.47-1.1.86-2 .86-1.1 0-1.62-.5-1.66-1.37h4.86c.02-.1.02-.27.02-.46zm-4.54-1c0-.9.6-1.34 1.54-1.34.9 0 1.4.44 1.4 1.34H9.39zm9.03 2.05V10.1h-2.14v5.3c0 .87.35 1.1 1.07 1.1h1.07v-1.74c-.45 0-.67-.04-.67-.34v-1.08h1.67zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span className="font-display-lg text-lg tracking-tight font-extrabold">stripe</span>
            </div>

            {/* Plaid */}
            <div className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-black transition-colors duration-300 cursor-default select-none">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
              <span className="font-display-lg text-lg tracking-tight font-extrabold uppercase">plaid</span>
            </div>

            {/* Brex */}
            <div className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-orange-600 transition-colors duration-300 cursor-default select-none">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-display-lg text-lg tracking-tight font-extrabold">brex</span>
            </div>

            {/* Deel */}
            <div className="flex items-center gap-1 text-on-surface-variant font-bold hover:text-blue-600 transition-colors duration-300 cursor-default select-none">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v18M3 12h18M12 3l9 9-9 9-9-9 9-9z" />
              </svg>
              <span className="font-display-lg text-lg tracking-tight font-extrabold">deel.</span>
            </div>

            {/* Revolut */}
            <div className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-indigo-600 transition-colors duration-300 cursor-default select-none">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
              </svg>
              <span className="font-display-lg text-lg tracking-tight font-extrabold uppercase font-mono">revolut</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20" id="features">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">Precision Engineering for Your Financial Stack</h2>
              <p className="text-on-surface-variant text-lg">We&apos;ve automated the heavy lifting so you can focus on scaling. Our AI modules integrate seamlessly with your existing workflow.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
              View all capabilities <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Smart Accounting */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.15)] transition-all">
                <Calculator className="w-7 h-7" stroke="url(#primary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">Smart Accounting</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Automated ledger entries and cross-platform reconciliation with 99.9% accuracy.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Learn more <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>

            {/* AI Financial Assistant */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_rgba(75,65,225,0.15)] transition-all">
                <Bot className="w-7 h-7" stroke="url(#secondary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">AI Financial Assistant</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Chat with your data using natural language queries. Get instant answers to complex queries.</p>
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                Try Assistant <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>

            {/* Financial Reports */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/20 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 group-hover:border-tertiary/50 group-hover:shadow-[0_0_20px_rgba(0,98,116,0.15)] transition-all">
                <BarChart3 className="w-7 h-7" stroke="url(#primary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">Financial Reports</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Real-time balance sheets and P&L statements generated automatically for every cycle.</p>
              <div className="flex items-center gap-2 text-tertiary font-bold text-sm">
                Explore Reports <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>

            {/* Inventory */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:border-orange-500/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all">
                <Package className="w-7 h-7" stroke="url(#accent-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">Inventory Management</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Track stock levels across multiple warehouses with predictive low-stock alerts.</p>
              <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                Configure Stock <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 group-hover:border-rose-500/50 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all">
                <BellRing className="w-7 h-7" stroke="url(#glow-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">Smart Alerts</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Instant notifications on budget variances and suspicious transaction activity.</p>
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                Setup Alerts <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>

            {/* AI Forecasting */}
            <div className="glass-card p-8 rounded-[32px] group hover:bg-white transition-all duration-300 bg-white/70 border border-outline-variant/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all">
                <LineChart className="w-7 h-7" stroke="url(#secondary-grad)" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">AI Forecasting</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">Predictive cash flow modeling based on historical data and market trends.</p>
              <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
                See Projections <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* AI Showcase: Chat Interface */}
        <section className="py-20 bg-surface-container-low overflow-hidden" id="demo">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display-lg text-4xl mb-6 font-bold leading-tight text-on-surface">Your Personal CFO, Available 24/7</h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                Stop digging through spreadsheets. Just ask Compta AI anything about your business performance, and get a detailed analysis in seconds.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">Natural Language Queries</span>
                    <p className="text-on-surface-variant text-sm">Ask questions just like you would a human accountant.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">Deep Profit Analysis</span>
                    <p className="text-on-surface-variant text-sm">Understand exactly where your margins are shrinking.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 w-5 h-5" stroke="url(#success-grad)" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold text-on-surface">Instant Data Visuals</span>
                    <p className="text-on-surface-variant text-sm">AI generates charts automatically based on your conversation.</p>
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
                      <h4 className="font-bold text-on-surface text-sm">Compta AI Assistant</h4>
                      <span className="text-[10px] text-primary flex items-center gap-1 font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Analyzing Data
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="text-on-surface-variant cursor-pointer w-5 h-5" strokeWidth={1.5} />
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.sender === "user" ? (
                        <div className="bg-primary px-5 py-3 rounded-2xl rounded-tr-none text-white text-sm max-w-[80%] shadow-lg">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="glass-card bg-white px-5 py-3 rounded-2xl rounded-tl-none text-on-surface text-sm max-w-[85%] border border-outline-variant/20 shadow-md">
                          <p className={msg.hasChart ? "mb-4" : ""}>{msg.text}</p>
                          {msg.hasChart && (
                            <div className="bg-[#eff4ff] rounded-xl p-4 border border-outline-variant/30">
                              <img
                                className="rounded-lg mb-3 w-full h-32 object-cover"
                                alt="Quarterly Profit Chart"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeGLqmKARHm7e08ijJ_k98L9qp4vda5uA-mmLCE7JaXw3oVb1rNe2yzn7EIOFEQnRHKkq4YEs_P172NRr8qSmLyXg77eMCTG0rofhnSshmH-lNvyX8S6H1Gvnjq1r7SClv1CcL2rWgRQOChUywmpf-yGABaO7nMe6Ci91Q8M0UZvr0lQaXliIqybQYbGtqk901vv-flrAJ665hZPaRFG9TEBBK84W8yGe8QjuvL_pTCMO5Xhk0h7M2cqJKcaI_nE1S8NEgJ3k8xd_I"
                              />
                              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium font-mono-data">
                                <span>Q3 Profit: 142,500 DZD</span>
                                <span>Q4 Profit: 160,200 DZD</span>
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
                      placeholder="Ask about your financial growth..."
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-[1.05] transition-transform">
                      <Send className="w-4 h-4" strokeWidth={1.5} />
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
            <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">High-Fidelity Financial Intelligence</h2>
            <p className="text-on-surface-variant text-lg">Every data point is tracked, analyzed, and visualized in real-time, giving you total clarity over your financial health.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-on-surface">Monthly Revenue</h4>
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
                <span className="text-xs text-on-surface-variant font-mono-data">Updated 2m ago</span>
              </div>
            </div>

            {/* Growth Analysis */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md overflow-hidden relative">
              <h4 className="font-bold text-on-surface mb-6">Growth Trajectory</h4>
              <img
                className="w-full h-40 object-cover rounded-xl mb-4 opacity-80"
                alt="Growth graph trajectory"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChtg_TOhZQCb5xnTNV5yNVX_MXd1RPLcT12yjiVPVkV7dxuwgjxuDgdoTwnaniQoc5tn8HkY5peAJ3Mx24Ds4YfcNG8PB3WecCJ4K8tIuvEEQTTSULLsVtjMy_w9IxqSWL4QuN98D0OHkJKWRzw2p9aeG83YhwmgPaxgrYy_Fk0mLca6V3wzBgODaCzbCe2b1BbNaU0WzVzR6Yj9cXkFNVR1sPvuqdwCqIxRr_fg1Vzp6AM0ADdcXSScTPo1GP6Z86RmEapwKmyBhf"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface-container/60">
                  <span className="block text-[10px] font-label-caps text-on-surface-variant font-bold uppercase tracking-wider">New Users</span>
                  <span className="text-lg font-bold text-on-surface">1,240</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container/60">
                  <span className="block text-[10px] font-label-caps text-on-surface-variant font-bold uppercase tracking-wider">LTV</span>
                  <span className="text-lg font-bold text-on-surface">4,500 DZD</span>
                </div>
              </div>
            </div>

            {/* Cash Flow */}
            <div className="glass-card p-6 rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
              <h4 className="font-bold text-on-surface mb-6">Cash Flow Health</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">OPERATING</span>
                    <span className="text-primary">85,200 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">INVESTING</span>
                    <span className="text-on-surface">-12,400 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-on-surface"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-wider">FINANCING</span>
                    <span className="text-secondary">40,000 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-secondary"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-on-surface">Total Liquidity</span>
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
              <h2 className="font-display-lg text-4xl mb-4 font-bold text-on-surface">Scalable Plans for Every Stage</h2>
              <p className="text-on-surface-variant text-lg">From garage startup to global enterprise, choose the intelligence tier that fits your growth velocity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="glass-card p-10 rounded-[32px] flex flex-col items-center text-center border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
                <span className="font-label-caps text-xs text-on-surface-variant mb-4 font-bold tracking-widest uppercase">STARTER</span>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-display-lg font-bold text-on-surface">200 DZD</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
                <ul className="w-full space-y-4 mb-10 text-on-surface-variant text-sm">
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    Basic AI Assistant
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    Real-time Reconciliation
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    Up to 500 Transactions
                  </li>
                </ul>
                <Link href="/register" className="w-full py-4 rounded-xl border border-outline-variant/40 font-bold hover:bg-surface-container-high transition-colors text-on-surface">
                  Select Starter
                </Link>
              </div>

              {/* Professional */}
              <div className="glass-card p-10 rounded-[32px] flex flex-col items-center text-center border border-primary/20 bg-white shadow-2xl scale-105 relative z-10">
                <div className="absolute -top-4 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black tracking-widest uppercase">
                  MOST POPULAR
                </div>
                <span className="font-label-caps text-xs text-primary mb-4 font-bold tracking-widest uppercase">PROFESSIONAL</span>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display-lg font-bold text-primary">500 DZD</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
                <ul className="w-full space-y-4 mb-10 text-on-surface text-sm font-medium">
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    Advanced AI Assistant (GPT-4)
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    Predictive Cash Flow Analysis
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    Unlimited Transactions
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" stroke="url(#success-grad)" strokeWidth={1.5} />
                    Team Collaboration Tools
                  </li>
                </ul>
                <Link href="/register" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                  Get Started Pro
                </Link>
              </div>

              {/* Enterprise */}
              <div className="glass-card p-10 rounded-[32px] flex flex-col items-center text-center border border-white/60 bg-white/70 backdrop-blur-md shadow-md">
                <span className="font-label-caps text-xs text-on-surface-variant mb-4 font-bold tracking-widest uppercase">ENTERPRISE</span>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-display-lg font-bold text-on-surface">Custom</span>
                </div>
                <ul className="w-full space-y-4 mb-10 text-on-surface-variant text-sm">
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    Custom LLM Training
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    Dedicated Account Manager
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                    White-glove Onboarding
                  </li>
                </ul>
                <Link href="/register" className="w-full py-4 rounded-xl border border-outline-variant/40 font-bold hover:bg-surface-container-high transition-colors text-on-surface">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display-lg text-4xl md:text-5xl text-white mb-6 font-bold">Ready to automate your financial future?</h2>
              <p className="text-white/80 text-lg mb-10">Join 10,000+ companies already using Compta AI to drive intelligent growth.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-10 py-5 rounded-2xl bg-white text-primary font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
                  Get Started for Free
                </Link>
              </div>
              <p className="mt-6 text-white/60 text-sm">No credit card required • 14-day free trial</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest/30 pt-20 pb-10 border-t border-outline-variant/30">
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
                The world&apos;s first AI-native accounting engine. Empowering founders and finance teams with superhuman precision.
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
              <h5 className="font-bold text-on-surface mb-6 text-sm">Product</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#features">Features</a></li>
                <li><a className="hover:text-primary transition-colors" href="#demo">AI Assistant</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-6 text-sm">Resources</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API Reference</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-6 text-sm">Company</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-outline-variant/30 text-xs text-outline font-bold">
            <p>© 2024 Compta AI Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-on-surface transition-colors" href="#">Cookie Policy</a>
              <a className="hover:text-on-surface transition-colors" href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
