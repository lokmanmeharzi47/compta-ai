"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  WalletCards,
  TrendingUp,
  Download,
  CheckCircle2,
  BarChart3,
  Target,
  Award,
  ArrowUpRight,
  Filter,
  Calendar,
  ChevronDown
} from "lucide-react";

export default function RevenuePage() {
  const t = useTranslations("revenuePage");
  const [activeFilter, setActiveFilter] = useState("thisMonth");

  const recentTransactions = [
    { id: "TRD-001", date: "12/06/2026", customer: "Client A", service: "Service Premium", amount: 15000, profit: 2000, status: "Completed" },
    { id: "TRD-002", date: "13/06/2026", customer: "Client B", service: "Service Gold", amount: 25000, profit: 3500, status: "Completed" },
    { id: "TRD-003", date: "14/06/2026", customer: "Client C", service: "Consulting", amount: 8000, profit: 1200, status: "Pending" },
    { id: "TRD-004", date: "14/06/2026", customer: "Client D", service: "Software License", amount: 45000, profit: 8000, status: "Completed" },
    { id: "TRD-005", date: "15/06/2026", customer: "Client E", service: "Support Package", amount: 5000, profit: 800, status: "Completed" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">{t("title")}</h2>
          <p className="text-body-md text-on-surface-variant mt-1">{t("subtitle")}</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer bg-white/50 backdrop-blur-md">
              <Download className="w-5 h-5 text-primary" />
              {t("exportReport")}
              <ChevronDown className="w-4 h-4 ml-1 opacity-60" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-outline-variant/20 rounded-xl shadow-xl shadow-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100">
              <div className="py-2">
                <button className="w-full text-start px-4 py-2 hover:bg-surface-container text-sm font-medium transition-colors cursor-pointer">{t("exportPdf")}</button>
                <button className="w-full text-start px-4 py-2 hover:bg-surface-container text-sm font-medium transition-colors cursor-pointer">{t("exportCsv")}</button>
                <button className="w-full text-start px-4 py-2 hover:bg-surface-container text-sm font-medium transition-colors cursor-pointer">{t("exportExcel")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between border-b border-outline-variant/30 pb-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Filter className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-on-surface whitespace-nowrap">{t("filters")}:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["today", "last7Days", "last30Days", "thisMonth", "thisYear"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFilter === filter
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
                  }`}
              >
                {t(filter as any)}
              </button>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant/30 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all cursor-pointer whitespace-nowrap">
          <Calendar className="w-4 h-4 text-primary" />
          {t("customRange")}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500              ">
        {/* Card 1: Total Revenue */}
        <div className="glass-card beveled-edge p-6 rounded-3xl  text-tertiary shadow-xl shadow-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary/40 rounded-2xl ">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("totalRevenue")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface ">124,000 DZD</h3>
        </div>

        {/* Card 2: Net Profit */}
        <div className="glass-card beveled-edge p-6 rounded-3xl  text-tertiary shadow-xl shadow-tertiary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary/20 rounded-2xl">
              <WalletCards className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("netProfit")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">32,500 DZD</h3>
        </div>

        {/* Card 3: Completed Transactions */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("completedTransactions")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">62</h3>
        </div>

        {/* Card 4: Total Sales Volume */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("totalSalesVolume")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">450,000 DZD</h3>
        </div>

        {/* Card 5: Average Profit */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("averageProfit")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">524 DZD</h3>
        </div>

        {/* Card 6: Success Rate */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">{t("successRate")}</p>
          <h3 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">96%</h3>
        </div>
      </div>

      {/* Revenue Analytics Section */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
        <h3 className="font-title-lg text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          {t("revenueAnalytics")}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Growth Chart Mock */}
          <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/60 border border-outline-variant/30 col-span-1 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-on-surface">{t("revenueGrowth")}</h4>
              <span className="text-sm font-bold text-tertiary bg-tertiary/10 px-3 py-1 rounded-full">+14.2%</span>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                {[1, 2, 3, 4, 5].map((i) => <div key={i} className="border-b border-on-surface w-full h-0"></div>)}
              </div>
              {/* Bars */}
              {[30, 45, 40, 60, 55, 80, 75, 90, 85, 100].map((height, i) => (
                <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all duration-300 relative group" style={{ height: `${height}%` }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-300" style={{ height: `${height * 0.7}%` }}></div>
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-xs font-bold py-1 px-2 rounded whitespace-nowrap transition-opacity z-10 pointer-events-none">
                    {(height * 1200).toLocaleString()} DZD
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant font-bold mt-4 px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
          </div>

          {/* Right Column: Mini charts */}
          <div className="space-y-6">
            {/* Monthly Profit */}
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/60 border border-outline-variant/30 h-[calc(50%-0.75rem)]">
              <h4 className="font-bold text-on-surface mb-2">{t("monthlyProfit")}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-on-surface">32,500 DZD</span>
                <span className="text-sm font-bold text-tertiary flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> 8%</span>
              </div>
              <div className="h-16 flex items-end gap-1.5 mt-auto">
                {[40, 50, 45, 60, 70, 65, 80].map((h, i) => (
                  <div key={i} className="w-full bg-tertiary rounded-t-md hover:bg-tertiary/80 transition-colors" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

            {/* Transaction Trends */}
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/60 border border-outline-variant/30 h-[calc(50%-0.75rem)]">
              <h4 className="font-bold text-on-surface mb-2">{t("transactionTrends")}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-on-surface">62</span>
                <span className="text-sm font-bold text-secondary flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> 12%</span>
              </div>
              {/* Line Chart Mock with SVG */}
              <div className="h-16 w-full relative mt-auto">
                <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d overflow-visible">
                  <path d="M0 30 Q 10 20, 20 25 T 40 15 T 60 20 T 80 5 T 100 10" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary drop-shadow-md" />
                  <path d="M0 30 Q 10 20, 20 25 T 40 15 T 60 20 T 80 5 T 100 10 L 100 40 L 0 40 Z" fill="currentColor" className="text-secondary/10" />
                  <circle cx="20" cy="25" r="2.5" fill="currentColor" className="text-secondary hover:r-4 transition-all" />
                  <circle cx="40" cy="15" r="2.5" fill="currentColor" className="text-secondary hover:r-4 transition-all" />
                  <circle cx="60" cy="20" r="2.5" fill="currentColor" className="text-secondary hover:r-4 transition-all" />
                  <circle cx="80" cy="5" r="2.5" fill="currentColor" className="text-secondary hover:r-4 transition-all" />
                  <circle cx="100" cy="10" r="2.5" fill="currentColor" className="text-secondary hover:r-4 transition-all" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trader Revenue Ledger */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
          <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            {t("traderLedger")}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("transactionId")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("date")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("customer")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("productService")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("amount")}</th>
                <th className="px-8 py-4 text-xs font-bold text-tertiary uppercase tracking-wider text-end">{t("profit")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-8 py-5 font-bold text-on-surface">{trx.id}</td>
                  <td className="px-8 py-5 font-bold text-on-surface-variant">{trx.date}</td>
                  <td className="px-8 py-5 text-on-surface font-medium">{trx.customer}</td>
                  <td className="px-8 py-5 text-on-surface-variant">{trx.service}</td>
                  <td className="px-8 py-5 font-mono-data text-end text-on-surface font-bold">
                    {trx.amount.toLocaleString()} DZD
                  </td>
                  <td className="px-8 py-5 font-mono-data text-end font-bold text-tertiary">
                    +{trx.profit.toLocaleString()} DZD
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${trx.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 'bg-secondary/10 text-secondary'
                      }`}>
                      {trx.status === "Completed" ? t("statusCompleted") : t("statusPending")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
