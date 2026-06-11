"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Landmark,
  Banknote,
  Users,
  Factory,
  ArrowRightLeft,
  Download,
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  Wallet
} from "lucide-react";

export default function AccountsLedgerPage() {
  const t = useTranslations("accounts");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"overview" | "journal">("overview");

  const bcp47 = locale === "ar" ? "ar-DZ" : "fr-FR";
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(bcp47, { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));
  const formatDateTime = (iso: string) =>
    new Intl.DateTimeFormat(bcp47, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  const journalDescriptions = t.raw("journalDescriptions") as string[];

  // Mock data — numbers/refs are locale-neutral; status/type/name use keys.
  const accounts = [
    { id: "A1", typeKey: "bank", nameKey: "cpaMain", balance: "2,450,000 DZD", statusKey: "active", number: "**** 4492" },
    { id: "A2", typeKey: "bank", nameKey: "beaEur", balance: "15,200 EUR", statusKey: "active", number: "**** 1102" },
    { id: "A3", typeKey: "cash", nameKey: "cashRegister", balance: "120,500 DZD", statusKey: "active", number: "CASH-01" },
  ];

  const receivables = [
    { id: "R1", customer: "Globex Corporation", invoice: "INV-2024-089", dueDate: "2024-10-30", amount: "145,000 DZD", statusKey: "overdue" },
    { id: "R2", customer: "Acme Industries", invoice: "INV-2024-092", dueDate: "2024-11-05", amount: "89,000 DZD", statusKey: "pending" },
    { id: "R3", customer: "Stark Ltd", invoice: "INV-2024-094", dueDate: "2024-11-12", amount: "210,000 DZD", statusKey: "pending" },
  ];

  const payables = [
    { id: "P1", supplier: "Tech Supply DZ", bill: "BILL-T-001", dueDate: "2024-10-28", amount: "45,000 DZD", statusKey: "overdue" },
    { id: "P2", supplier: "Office Masters", bill: "BILL-O-099", dueDate: "2024-11-10", amount: "12,500 DZD", statusKey: "pending" },
  ];

  const journalEntries = [
    { id: "J1", date: "2024-10-25T14:30", descIndex: 0, debitKey: "bankCpaMain", creditKey: "ar", amount: "120,000 DZD" },
    { id: "J2", date: "2024-10-24T09:15", descIndex: 1, debitKey: "officeExpenses", creditKey: "cashMainOffice", amount: "4,500 DZD" },
    { id: "J3", date: "2024-10-23T16:00", descIndex: 2, debitKey: "ar", creditKey: "salesRevenue", amount: "450,000 DZD" },
    { id: "J4", date: "2024-10-21T10:00", descIndex: 3, debitKey: "salaryExpense", creditKey: "bankCpaMain", amount: "890,000 DZD" },
    { id: "J5", date: "2024-10-20T11:45", descIndex: 4, debitKey: "inventoryAsset", creditKey: "ap", amount: "320,000 DZD" },
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
            {t("exportLedger")}
          </button>
        </div>
      </div>

      {/* Financial Position KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Banknote className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t("kpiCash")}</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">120,500 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-tertiary/10 text-tertiary rounded-lg">
              <Landmark className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t("kpiBank")}</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">2,450,000 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t("kpiAR")}</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">444,000 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-error/10 text-error rounded-lg">
              <Factory className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t("kpiAP")}</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">57,500 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t("kpiWorkingCapital")}</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">2,957,000 DZD</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant/30 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer ${
            activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {t("tabOverview")}
        </button>
        <button
          onClick={() => setActiveTab("journal")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "journal" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {t("tabJournal")}
        </button>
      </div>

      {/* Tab Content: Accounts Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Bank & Cash Accounts */}
          <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/70">
            <div className="px-8 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
              <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                {t("liquidAccounts")}
              </h3>
              <button className="text-xs font-bold text-primary hover:underline cursor-pointer">{t("addAccount")}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thType")}</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thAccountName")}</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thReference")}</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thStatus")}</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("thBalance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {accounts.map(acc => (
                    <tr key={acc.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-8 py-4 font-bold text-on-surface-variant">{t(`types.${acc.typeKey}`)}</td>
                      <td className="px-8 py-4 font-bold text-on-surface">{t(`accNames.${acc.nameKey}`)}</td>
                      <td className="px-8 py-4 text-on-surface-variant font-mono-data">{acc.number}</td>
                      <td className="px-8 py-4">
                        <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-md">{t(`statuses.${acc.statusKey}`)}</span>
                      </td>
                      <td className="px-8 py-4 font-bold font-mono-data text-end text-on-surface">{acc.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Accounts Receivable */}
            <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/70">
              <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
                <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
                  <ArrowDownRight className="w-5 h-5 text-tertiary" />
                  {t("topReceivables")}
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {receivables.map(r => (
                  <div key={r.id} className="p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-on-surface">{r.customer}</p>
                      <p className="text-xs text-on-surface-variant font-mono-data">{r.invoice} • {t("due")}: {formatDate(r.dueDate)}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-bold font-mono-data text-tertiary text-sm">{r.amount}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${r.statusKey === 'overdue' ? 'text-error' : 'text-outline'}`}>
                        {t(`statuses.${r.statusKey}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accounts Payable */}
            <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/70">
              <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
                <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-error" />
                  {t("topPayables")}
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {payables.map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-on-surface">{p.supplier}</p>
                      <p className="text-xs text-on-surface-variant font-mono-data">{p.bill} • {t("due")}: {formatDate(p.dueDate)}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-bold font-mono-data text-error text-sm">{p.amount}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${p.statusKey === 'overdue' ? 'text-error' : 'text-outline'}`}>
                        {t(`statuses.${p.statusKey}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Transaction Engine Journal */}
      {activeTab === "journal" && (
        <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/70">
          <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40">
            <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2 mb-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              {t("realtimeJournal")}
            </h3>
            <p className="text-sm text-on-surface-variant">
              {t("journalSubtitle")}
            </p>
          </div>
          <div className="p-8">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ms-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/40 before:to-transparent">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-on-surface text-sm">{journalDescriptions[entry.descIndex]}</span>
                      <span className="text-[10px] text-outline font-mono-data">{formatDateTime(entry.date)}</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="flex justify-between items-center text-xs p-2 bg-surface-container rounded-md">
                        <span className="text-on-surface-variant font-bold">{t("debit")}</span>
                        <span className="font-mono-data">{t(`ledgerAccounts.${entry.debitKey}`)}</span>
                        <span className="font-mono-data font-bold text-on-surface">{entry.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-2 bg-surface-container rounded-md">
                        <span className="text-on-surface-variant font-bold">{t("credit")}</span>
                        <span className="font-mono-data">{t(`ledgerAccounts.${entry.creditKey}`)}</span>
                        <span className="font-mono-data font-bold text-on-surface">{entry.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
