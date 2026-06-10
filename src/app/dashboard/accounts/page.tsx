"use client";

import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<"overview" | "journal">("overview");

  // Mock Data
  const accounts = [
    { id: "A1", type: "Bank", name: "CPA Main Business Account", balance: "2,450,000 DZD", status: "Active", number: "**** 4492" },
    { id: "A2", type: "Bank", name: "BEA Secondary (EUR)", balance: "15,200 EUR", status: "Active", number: "**** 1102" },
    { id: "A3", type: "Cash", name: "Main Office Cash Register", balance: "120,500 DZD", status: "Active", number: "CASH-01" },
  ];

  const receivables = [
    { id: "R1", customer: "Globex Corporation", invoice: "INV-2024-089", dueDate: "Oct 30, 2024", amount: "145,000 DZD", status: "Overdue" },
    { id: "R2", customer: "Acme Industries", invoice: "INV-2024-092", dueDate: "Nov 05, 2024", amount: "89,000 DZD", status: "Pending" },
    { id: "R3", customer: "Stark Ltd", invoice: "INV-2024-094", dueDate: "Nov 12, 2024", amount: "210,000 DZD", status: "Pending" },
  ];

  const payables = [
    { id: "P1", supplier: "Tech Supply DZ", bill: "BILL-T-001", dueDate: "Oct 28, 2024", amount: "45,000 DZD", status: "Overdue" },
    { id: "P2", supplier: "Office Masters", bill: "BILL-O-099", dueDate: "Nov 10, 2024", amount: "12,500 DZD", status: "Pending" },
  ];

  const journalEntries = [
    { id: "J1", date: "Oct 25, 2024 14:30", description: "Payment received for INV-2024-088", debitAccount: "Bank (CPA Main)", creditAccount: "Accounts Receivable", amount: "120,000 DZD" },
    { id: "J2", date: "Oct 24, 2024 09:15", description: "Office Supplies Purchase", debitAccount: "Office Expenses", creditAccount: "Cash (Main Office)", amount: "4,500 DZD" },
    { id: "J3", date: "Oct 23, 2024 16:00", description: "Invoice Issued to Wayne Ent.", debitAccount: "Accounts Receivable", creditAccount: "Sales Revenue", amount: "450,000 DZD" },
    { id: "J4", date: "Oct 21, 2024 10:00", description: "Payroll October 2024", debitAccount: "Salary Expense", creditAccount: "Bank (CPA Main)", amount: "890,000 DZD" },
    { id: "J5", date: "Oct 20, 2024 11:45", description: "Inventory Restock (Credit)", debitAccount: "Inventory Asset", creditAccount: "Accounts Payable", amount: "320,000 DZD" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Accounts & Ledger</h2>
          <p className="text-body-md text-on-surface-variant">Core accounting engine tracking all financial positions.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer">
            <Download className="w-5 h-5" />
            Export Ledger
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
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Cash Balance</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">120,500 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-tertiary/10 text-tertiary rounded-lg">
              <Landmark className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bank Balance</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">2,450,000 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">AR (Receivables)</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">444,000 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-error/10 text-error rounded-lg">
              <Factory className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">AP (Payables)</p>
          </div>
          <p className="text-xl font-bold text-on-surface mt-2">57,500 DZD</p>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Working Capital</p>
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
          Accounts Overview
        </button>
        <button 
          onClick={() => setActiveTab("journal")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === "journal" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Automatic Transaction Engine
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
                Liquid Accounts (Cash & Bank)
              </h3>
              <button className="text-xs font-bold text-primary hover:underline cursor-pointer">Add Account</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Type</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Account Name</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Reference</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {accounts.map(acc => (
                    <tr key={acc.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-8 py-4 font-bold text-on-surface-variant">{acc.type}</td>
                      <td className="px-8 py-4 font-bold text-on-surface">{acc.name}</td>
                      <td className="px-8 py-4 text-on-surface-variant font-mono-data">{acc.number}</td>
                      <td className="px-8 py-4">
                        <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-md">{acc.status}</span>
                      </td>
                      <td className="px-8 py-4 font-bold font-mono-data text-right text-on-surface">{acc.balance}</td>
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
                  Top Receivables (AR)
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {receivables.map(r => (
                  <div key={r.id} className="p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-on-surface">{r.customer}</p>
                      <p className="text-xs text-on-surface-variant font-mono-data">{r.invoice} • Due: {r.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold font-mono-data text-tertiary text-sm">{r.amount}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${r.status === 'Overdue' ? 'text-error' : 'text-outline'}`}>
                        {r.status}
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
                  Top Payables (AP)
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {payables.map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-on-surface">{p.supplier}</p>
                      <p className="text-xs text-on-surface-variant font-mono-data">{p.bill} • Due: {p.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold font-mono-data text-error text-sm">{p.amount}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${p.status === 'Overdue' ? 'text-error' : 'text-outline'}`}>
                        {p.status}
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
              Real-Time Accounting Journal
            </h3>
            <p className="text-sm text-on-surface-variant">
              Every action inside COMPTA AI automatically triggers double-entry bookkeeping ledgers.
            </p>
          </div>
          <div className="p-8">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/40 before:to-transparent">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-on-surface text-sm">{entry.description}</span>
                      <span className="text-[10px] text-outline font-mono-data">{entry.date}</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="flex justify-between items-center text-xs p-2 bg-surface-container rounded-md">
                        <span className="text-on-surface-variant font-bold">Debit</span>
                        <span className="font-mono-data">{entry.debitAccount}</span>
                        <span className="font-mono-data font-bold text-on-surface">{entry.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs p-2 bg-surface-container rounded-md">
                        <span className="text-on-surface-variant font-bold">Credit</span>
                        <span className="font-mono-data">{entry.creditAccount}</span>
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
