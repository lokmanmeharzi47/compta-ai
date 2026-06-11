"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  WalletCards,
  TrendingUp,
  Download,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  PieChart
} from "lucide-react";

export default function RevenuePage() {
  const t = useTranslations("revenuePage");
  const [activeTab, setActiveTab] = useState<"accountant" | "platform">("accountant");

  const recentTransactions = [
    { id: "TRX-8901", date: "Nov 02, 2024", declaration: "DEC-2024-10", type: "Declaration Fee", amount: 2000, accShare: 1800, platShare: 200, status: "Cleared" },
    { id: "TRX-8902", date: "Sep 12, 2024", declaration: "DEC-2024-08", type: "Declaration Fee", amount: 2000, accShare: 1800, platShare: 200, status: "Processing" },
  ];

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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant/30 pb-2">
        <button 
          onClick={() => setActiveTab("accountant")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer ${
            activeTab === "accountant" ? "border-tertiary text-tertiary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {t("accountantDash")}
        </button>
        <button 
          onClick={() => setActiveTab("platform")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer ${
            activeTab === "platform" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {t("platformDash")}
        </button>
      </div>

      {/* Accountant Dashboard */}
      {activeTab === "accountant" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-tertiary text-on-tertiary">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-400/10 rounded-2xl">
                  <WalletCards className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface text-tertiary-container mb-1">{t("availableBalance")}</p>
              <h3 className="font-headline-lg text-on-surface text-4xl font-bold">28,000 DZD</h3>
              <button className="mt-4 w-full text-on-surface py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors cursor-pointer">
                {t("withdrawFunds")}
              </button>
            </div>
            
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary/10 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-tertiary" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("lifetimeEarnings")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">93,600 DZD</h3>
            </div>

            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/10 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("approvedDecs")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">52</h3>
            </div>

            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-outline-variant/20 rounded-2xl">
                  <Clock className="w-6 h-6 text-outline" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("pendingPayments")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">3</h3>
            </div>
          </div>
        </div>
      )}

      {/* Platform Dashboard */}
      {activeTab === "platform" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-primary text-on-primary">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary/10 rounded-2xl">
                  <Building2 className="w-6 h-6 text-tertiary" />
                </div>
              </div>
              <p className="text-sm font-medium text-primary-container mb-1">{t("platformRev")}</p>
              <h3 className="font-headline-lg text-4xl font-bold text-on-surface">12,400 DZD</h3>
            </div>
            
            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <PieChart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("totalVolume")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">124,000 DZD</h3>
            </div>

            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/10 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("completedTxs")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">62</h3>
            </div>

            <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary/10 rounded-2xl">
                  <Users className="w-6 h-6 text-tertiary" />
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{t("activeAccountants")}</p>
              <h3 className="font-headline-lg text-3xl font-bold text-on-surface">14</h3>
            </div>
          </div>
        </div>
      )}

      {/* Shared Transaction Ledger */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
          <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            {t("recentLedger")}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("transactionId")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("dateRef")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("grossTotal")}</th>
                {activeTab === "accountant" && (
                  <th className="px-8 py-4 text-xs font-bold text-tertiary uppercase tracking-wider text-end">{t("yourShare")}</th>
                )}
                {activeTab === "platform" && (
                  <th className="px-8 py-4 text-xs font-bold text-primary uppercase tracking-wider text-end">{t("commission")}</th>
                )}
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-8 py-5 font-bold text-on-surface">{trx.id}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-on-surface-variant">{trx.date}</p>
                    <p className="text-xs text-on-surface-variant">Ref: {trx.declaration}</p>
                  </td>
                  <td className="px-8 py-5 font-mono-data text-end text-on-surface-variant">
                    {trx.amount.toLocaleString()} DZD
                  </td>
                  {activeTab === "accountant" && (
                    <td className="px-8 py-5 font-mono-data text-end font-bold text-tertiary">
                      +{trx.accShare.toLocaleString()} DZD
                    </td>
                  )}
                  {activeTab === "platform" && (
                    <td className="px-8 py-5 font-mono-data text-end font-bold text-primary">
                      +{trx.platShare.toLocaleString()} DZD
                    </td>
                  )}
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      trx.status === 'Cleared' ? 'bg-tertiary/10 text-tertiary' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {trx.status === "Cleared" ? t("statusCleared") : t("statusProcessing")}
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
