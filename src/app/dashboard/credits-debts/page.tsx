"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  AlertTriangle,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  Clock,
  CheckCircle2,
  Search,
  Plus
} from "lucide-react";

export default function CreditDebtPage() {
  const [activeTab, setActiveTab] = useState<"receivables" | "payables">("receivables");
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: "C1", name: "Ahmed Benali", total: 50000, paid: 20000, due: "Jul 15, 2026", status: "Partially Paid" },
    { id: "C2", name: "Globex Corp", total: 120000, paid: 0, due: "Jun 10, 2026", status: "Overdue" },
    { id: "C3", name: "Sarah Trading", total: 80000, paid: 80000, due: "Aug 01, 2026", status: "Paid" },
  ];

  const suppliers = [
    { id: "S1", name: "SARL Tech Distribution", total: 120000, paid: 70000, due: "Jul 10, 2026", status: "Partially Paid" },
    { id: "S2", name: "Office Plus", total: 25000, paid: 0, due: "Jun 05, 2026", status: "Overdue" },
    { id: "S3", name: "Web Services Co", total: 60000, paid: 30000, due: "Jun 15, 2026", status: "Due This Week" },
  ];

  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredSuppliers = suppliers.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Credit & Debt Management</h2>
          <p className="text-body-md text-on-surface-variant">Monitor outstanding receivables and payables in real-time.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Credit Dashboards (KPIs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Receivables KPI */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border-l-4 border-l-tertiary">
          <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
            <ArrowDownRight className="w-5 h-5 text-tertiary" />
            Customer Receivables
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total</p>
              <p className="text-xl font-bold text-tertiary">250,000 DZD</p>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Overdue</p>
              <p className="text-xl font-bold text-error">45,000 DZD</p>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <CalendarClock className="w-3 h-3" /> Due This Week
              </p>
              <p className="text-xl font-bold text-on-surface">80,000 DZD</p>
            </div>
          </div>
        </div>

        {/* Supplier Payables KPI */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 border-l-4 border-l-error">
          <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
            <ArrowUpRight className="w-5 h-5 text-error" />
            Supplier Payables
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total</p>
              <p className="text-xl font-bold text-error">180,000 DZD</p>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Overdue</p>
              <p className="text-xl font-bold text-error">25,000 DZD</p>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <CalendarClock className="w-3 h-3" /> Due This Week
              </p>
              <p className="text-xl font-bold text-on-surface">60,000 DZD</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card beveled-edge p-6 rounded-3xl relative overflow-hidden bg-white/70">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary w-5 h-5" />
            <h3 className="font-title-md text-lg font-bold text-on-surface">AI Credit Insights</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/20">
              <p className="font-bold text-sm text-on-surface mb-2">Risky Customers Detected</p>
              <p className="text-xs text-on-surface-variant">
                Globex Corp has historically paid 14 days late on average. We predict a high probability of delay for their upcoming invoice.
              </p>
              <button className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer">View Details</button>
            </div>
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="font-bold text-sm text-primary mb-2">Cash Flow Optimization</p>
              <p className="text-xs text-on-surface-variant">
                If you collect 50% of the &quot;Due This Week&quot; receivables, you can easily cover the supplier payables without touching core cash reserves.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-error w-5 h-5" />
            <h3 className="font-title-md text-lg font-bold text-on-surface">Smart Reminders</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-error-container/30 border border-error/10 rounded-xl flex gap-3">
              <Clock className="text-error w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-error">Customer Overdue</p>
                <p className="text-[10px] text-on-surface-variant">Globex Corp (120,000 DZD) is 3 days late. Send reminder?</p>
              </div>
            </div>
            <div className="p-3 bg-secondary-container/30 border border-outline-variant/20 rounded-xl flex gap-3">
              <CreditCard className="text-on-surface-variant w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Supplier Payment Due</p>
                <p className="text-[10px] text-on-surface-variant">Web Services Co (30,000 DZD remaining) due in 3 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Ledgers */}
      <div className="flex gap-4 border-b border-outline-variant/30 pb-2">
        <button 
          onClick={() => setActiveTab("receivables")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer ${
            activeTab === "receivables" ? "border-tertiary text-tertiary" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Customer Receivables
        </button>
        <button 
          onClick={() => setActiveTab("payables")}
          className={`px-4 py-2 font-bold text-sm transition-colors border-b-2 cursor-pointer ${
            activeTab === "payables" ? "border-error text-error" : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Supplier Payables
        </button>
      </div>

      {/* Ledger Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-title-md text-lg font-bold text-on-surface">
            {activeTab === "receivables" ? "Accounts Receivable Ledger" : "Accounts Payable Ledger"}
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === "receivables" ? "customers" : "suppliers"}...`} 
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">
                  {activeTab === "receivables" ? "Customer" : "Supplier"}
                </th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Total Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Paid</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Remaining Balance</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Due Date</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {(activeTab === "receivables" ? filteredCustomers : filteredSuppliers).map((item) => {
                const balance = item.total - item.paid;
                const isPaid = balance === 0;

                return (
                  <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-5 font-bold text-on-surface">{item.name}</td>
                    <td className="px-8 py-5 font-mono-data text-right text-on-surface-variant">
                      {item.total.toLocaleString()} DZD
                    </td>
                    <td className="px-8 py-5 font-mono-data text-right text-primary font-bold">
                      {item.paid.toLocaleString()} DZD
                    </td>
                    <td className="px-8 py-5 font-mono-data text-right font-bold text-on-surface">
                      {balance.toLocaleString()} DZD
                    </td>
                    <td className="px-8 py-5 font-mono-data text-on-surface-variant">
                      {item.due}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Overdue' ? 'bg-error/10 text-error' :
                        item.status === 'Paid' ? 'bg-tertiary/10 text-tertiary' :
                        item.status === 'Due This Week' ? 'bg-secondary/10 text-secondary' :
                        'bg-outline-variant/20 text-on-surface-variant'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {!isPaid ? (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-on-background text-white rounded-lg text-xs font-bold hover:bg-primary transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                          <Plus className="w-3 h-3" /> Record Payment
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-tertiary text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
