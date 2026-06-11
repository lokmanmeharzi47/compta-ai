"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  TrendingUp,
  Receipt,
  Wallet,
  Coins,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export default function DashboardHome() {
  const t = useTranslations("dashboardHome");
  const months = t.raw("months") as string[];
  const chartBars = [40, 30, 60, 45, 80, 55, 75, 60, 95, 65, 90, 70];

  return (
    <div className="space-y-6">
      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-xs uppercase tracking-wider mb-1">
            {t("totalRevenue")}
          </p>
          <h3 className="font-headline-lg text-3xl font-bold text-on-background">124,500 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error/10 rounded-lg text-error">
              <Receipt className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded-full">-3.2%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-xs uppercase tracking-wider mb-1">
            {t("expenses")}
          </p>
          <h3 className="font-headline-lg text-3xl font-bold text-on-background">45,210 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-full">+8.1%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-xs uppercase tracking-wider mb-1">
            {t("profit")}
          </p>
          <h3 className="font-headline-lg text-3xl font-bold text-on-background">79,290 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <p className="text-on-surface-variant font-label-caps text-xs uppercase tracking-wider mb-1">
            {t("cashBalance")}
          </p>
          <h3 className="font-headline-lg text-3xl font-bold text-on-background">210,400 DZD</h3>
        </div>
      </div>

      {/* AI INSIGHT CARD */}
      <div className="glass-card beveled-edge p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 relative overflow-hidden bg-white/70">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-title-md text-lg text-primary font-semibold mb-1">
              {t("aiInsightTitle")}
            </h4>
            <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl">
              {t.rich("aiInsightText", {
                b1: (chunks) => <span className="font-bold text-primary">{chunks}</span>,
                b2: (chunks) => <span className="font-bold text-on-background">{chunks}</span>,
              })}
            </p>
          </div>
          <button className="md:ms-auto px-6 py-3 bg-on-background text-white hover:bg-primary rounded-xl font-bold transition-all shrink-0 active:scale-95 cursor-pointer">
            {t("applySuggestion")}
          </button>
        </div>
        {/* Decorative element */}
        <div className="absolute -end-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CHARTS & TRANSACTIONS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue vs Expenses Chart Card */}
          <div className="glass-card beveled-edge p-8 rounded-3xl min-h-[400px] flex flex-col bg-white/70">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-title-md text-lg font-bold">{t("revenueVsExpenses")}</h3>
                <p className="text-xs text-on-surface-variant">{t("performanceSubtitle")}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium">{t("revenue")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="text-xs font-medium">{t("expenses")}</span>
                </div>
              </div>
            </div>
            {/* Chart Grid */}
            <div className="flex-1 w-full flex items-end gap-2 px-2 h-48">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-lg transition-all ${
                    i % 2 === 0
                      ? "bg-primary/20 hover:bg-primary/40"
                      : "bg-secondary-container/20 hover:bg-secondary-container/40"
                  }`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-outline font-mono-data">
              {months.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="glass-card beveled-edge p-8 rounded-3xl bg-white/70">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-lg font-bold">{t("recentTransactions")}</h3>
              <button className="text-primary font-bold text-sm hover:underline cursor-pointer">{t("viewAll")}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-start text-outline font-label-caps tracking-widest text-xs border-b border-outline-variant/30">
                    <th className="pb-4 font-bold text-start">{t("thCompany")}</th>
                    <th className="pb-4 font-bold text-start">{t("thCategory")}</th>
                    <th className="pb-4 font-bold text-start">{t("thDate")}</th>
                    <th className="pb-4 font-bold text-start">{t("thAmount")}</th>
                    <th className="pb-4 font-bold text-start">{t("thStatus")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr className="group hover:bg-primary/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">
                          A
                        </div>
                        <span className="font-body-md font-bold text-sm">Adobe Systems</span>
                      </div>
                    </td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("catSoftware")}</td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("date1")}</td>
                    <td className="py-4 font-mono-data font-bold text-sm">-499.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary/10 text-tertiary">{t("statusPaid")}</span>
                    </td>
                  </tr>
                  <tr className="group hover:bg-primary/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">
                          S
                        </div>
                        <span className="font-body-md font-bold text-sm">Stripe Inc.</span>
                      </div>
                    </td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("catPaymentGateway")}</td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("date2")}</td>
                    <td className="py-4 font-mono-data font-bold text-sm">+12,400.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary/10 text-tertiary">{t("statusPaid")}</span>
                    </td>
                  </tr>
                  <tr className="group hover:bg-primary/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">
                          G
                        </div>
                        <span className="font-body-md font-bold text-sm">Google Cloud</span>
                      </div>
                    </td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("catInfrastructure")}</td>
                    <td className="py-4 text-on-surface-variant text-sm">{t("date3")}</td>
                    <td className="py-4 font-mono-data font-bold text-sm">-2,150.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-error/10 text-error">{t("statusPending")}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="space-y-6">
          {/* Expense Breakdown */}
          <div className="glass-card beveled-edge p-8 rounded-3xl bg-white/70">
            <h3 className="font-title-md text-lg font-bold mb-6">{t("expenseBreakdown")}</h3>
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#e6eeff" strokeWidth="12"></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#0050cb"
                  strokeDasharray="160 251"
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#645efb"
                  strokeDasharray="80 251"
                  strokeDashoffset="-160"
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#006274"
                  strokeDasharray="40 251"
                  strokeDashoffset="-240"
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-outline tracking-wider font-bold">{t("total")}</span>
                <span className="font-bold text-2xl text-on-surface">45.2k DZD</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium">{t("software")}</span>
                </div>
                <span className="font-mono-data text-sm font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="text-sm font-medium">{t("marketing")}</span>
                </div>
                <span className="font-mono-data text-sm font-bold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="text-sm font-medium">{t("operations")}</span>
                </div>
                <span className="font-mono-data text-sm font-bold">15%</span>
              </div>
            </div>
          </div>

          {/* SMART ALERTS */}
          <div className="glass-card beveled-edge p-8 rounded-3xl bg-white/70">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-error w-6 h-6" />
              <h3 className="font-title-md text-lg font-bold">{t("priorityAlerts")}</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-error-container/30 border border-error/10 rounded-2xl">
                <p className="font-bold text-error text-sm mb-1">{t("lowLiquidityTitle")}</p>
                <p className="text-xs text-on-surface-variant">
                  {t("lowLiquidityText")}
                </p>
                <button className="mt-3 text-xs font-bold text-error underline hover:text-error/80 transition-colors cursor-pointer">
                  {t("optimizeRunway")}
                </button>
              </div>
              <div className="p-4 bg-surface-container-high border border-outline-variant/20 rounded-2xl">
                <p className="font-bold text-on-surface text-sm mb-1">{t("invoiceOverdueTitle")}</p>
                <p className="text-xs text-on-surface-variant">
                  {t("invoiceOverdueText")}
                </p>
                <button className="mt-3 text-xs font-bold text-primary underline hover:text-primary/80 transition-colors cursor-pointer">
                  {t("sendReminder")}
                </button>
              </div>
            </div>
          </div>

          {/* Promo Card */}
          <div className="rounded-3xl p-8 bg-on-background text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-title-md text-lg font-bold text-white mb-2">{t("autoTaxTitle")}</h4>
              <p className="text-xs text-outline-variant mb-6">
                {t("autoTaxText")}
              </p>
              <button className="w-full py-3 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold transition-all active:scale-95 cursor-pointer">
                {t("activateNow")}
              </button>
            </div>
            <div className="absolute -top-10 -end-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
