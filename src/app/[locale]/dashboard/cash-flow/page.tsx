"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Sparkles,
  Download,
  Filter,
  Search,
  Wallet
} from "lucide-react";

export default function CashFlowPage() {
  const t = useTranslations("cashFlow");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const netCashFlow = 40000;
  const isNetPositive = netCashFlow >= 0;

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "ar" ? "ar-DZ" : "fr-FR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));

  const chartMonths = t.raw("chartMonths") as string[];

  const transactions = [
    { id: "1", typeKey: "cashIn", categoryKey: "paidSales", entity: "Acme Corp", date: "2024-10-25", amount: "+45,000.00 DZD", methodKey: "bankTransfer" },
    { id: "2", typeKey: "cashOut", categoryKey: "software", entity: "AWS", date: "2024-10-24", amount: "-14,230.00 DZD", methodKey: "creditCard" },
    { id: "3", typeKey: "cashIn", categoryKey: "investment", entity: "Venture Partners", date: "2024-10-20", amount: "+75,000.00 DZD", methodKey: "bankTransfer" },
    { id: "4", typeKey: "cashOut", categoryKey: "salaries", entityKey: "payroll", date: "2024-10-15", amount: "-65,000.00 DZD", methodKey: "bankTransfer" },
    { id: "5", typeKey: "cashOut", categoryKey: "rent", entity: "WeWork", date: "2024-10-05", amount: "-15,372.00 DZD", methodKey: "bankTransfer" },
  ];

  const entityName = (tx: typeof transactions[number]) => (tx.entityKey ? t(`entities.${tx.entityKey}`) : tx.entity ?? "");

  const filteredTransactions = transactions.filter(tx => {
    const name = entityName(tx).toLowerCase();
    const cat = t(`categories.${tx.categoryKey}`).toLowerCase();
    const matchSearch = name.includes(searchQuery.toLowerCase()) || cat.includes(searchQuery.toLowerCase());
    const matchType = filterType === "All" || tx.typeKey === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">{t("title")}</h2>
          <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer">
            <Download className="w-5 h-5" />
            {t("exportReport")}
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-tertiary font-bold text-xs bg-tertiary/10 px-2 py-1 rounded-lg">+15.2%</span>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">{t("cashIn")}</p>
          <p className="text-3xl font-bold text-on-surface">120,000 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-error font-bold text-xs bg-error/10 px-2 py-1 rounded-lg">-4.1%</span>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">{t("cashOut")}</p>
          <p className="text-3xl font-bold text-on-surface">80,000 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-primary text-white border-none shadow-xl shadow-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-on-surface font-bold text-xs bg-white/20 px-2 py-1 rounded-lg">{t("healthy")}</span>
          </div>
          <p className="text-body-sm text-white/80 font-medium">{t("netCashFlow")}</p>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-white">
              {isNetPositive ? "+" : ""}{netCashFlow.toLocaleString()} DZD
            </p>
            {isNetPositive ? (
              <TrendingUp className="w-8 h-8 text-[#4ade80]" />
            ) : (
              <TrendingDown className="w-8 h-8 text-[#f87171]" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl min-h-[380px] flex flex-col justify-between bg-white/70">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("trendTitle")}</h3>
              <p className="text-xs text-on-surface-variant">{t("trendSubtitle")}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <span className="text-xs font-medium">{t("inLegend")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="text-xs font-medium">{t("outLegend")}</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {chartMonths.map((month, idx) => {
              const inHeights = ['40%', '65%', '55%', '85%', '75%', '95%'];
              const outHeights = ['30%', '45%', '60%', '50%', '65%', '40%'];
              return (
                <div key={idx} className="flex flex-col items-center gap-4 flex-1">
                  <div className="w-full flex justify-center gap-1 h-48 items-end group">
                    <div className="w-1/3 bg-tertiary rounded-t-sm transition-all duration-500 group-hover:opacity-80" style={{ height: inHeights[idx] }}></div>
                    <div className="w-1/3 bg-error rounded-t-sm transition-all duration-500 group-hover:opacity-80" style={{ height: outHeights[idx] }}></div>
                  </div>
                  <span className="text-xs font-bold text-outline">{month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Insight & Alert Card */}
        <div className="space-y-6">
          <div className="glass-card beveled-edge p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white/70">
            <div className="absolute top-0 end-0 w-32 h-32 bg-primary/5 rounded-full -me-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-primary w-5 h-5" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("aiInsights")}</h3>
            </div>
            <p className="text-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              {t.rich("aiInsightText", {
                b: (chunks) => <span className="font-bold text-on-surface">{chunks}</span>,
              })}
            </p>
            <button className="w-full py-3 bg-primary-container/20 text-primary rounded-xl font-bold hover:bg-primary-container/30 transition-all cursor-pointer border border-primary/10">
              {t("viewInvestment")}
            </button>
          </div>

          <div className="glass-card beveled-edge p-6 rounded-3xl bg-error-container/20 border border-error/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-error w-5 h-5" />
              <h4 className="font-bold text-error">{t("liquidityAlert")}</h4>
            </div>
            <p className="text-xs text-on-surface-variant">
              {t("liquidityAlertText")}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <h3 className="font-title-md text-lg font-bold text-on-surface">{t("streams")}</h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full ps-9 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="relative">
              <select
                className="ps-8 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">{t("allTypes")}</option>
                <option value="cashIn">{t("types.cashIn")}</option>
                <option value="cashOut">{t("types.cashOut")}</option>
              </select>
              <Filter className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thType")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thEntity")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thCategory")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thMethod")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thDate")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("thAmount")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-8 text-center text-on-surface-variant">
                    {t("noTransactions")}
                  </td>
                </tr>
              )}
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${tx.typeKey === "cashIn" ? "bg-tertiary/10 text-tertiary" : "bg-error/10 text-error"
                      }`}>
                      {tx.typeKey === "cashIn" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {t(`types.${tx.typeKey}`)}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-on-surface">{entityName(tx)}</td>
                  <td className="px-8 py-5 text-on-surface-variant">{t(`categories.${tx.categoryKey}`)}</td>
                  <td className="px-8 py-5 text-on-surface-variant flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> {t(`methods.${tx.methodKey}`)}
                  </td>
                  <td className="px-8 py-5 text-on-surface-variant font-mono-data">{formatDate(tx.date)}</td>
                  <td className={`px-8 py-5 font-bold font-mono-data text-end ${tx.typeKey === "cashIn" ? "text-tertiary" : "text-error"
                    }`}>
                    {tx.amount}
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
