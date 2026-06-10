"use client";

import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const transactions = [
    { id: "1", type: "Cash In", category: "Paid Sales", entity: "Acme Corp", date: "Oct 25, 2024", amount: "+45,000.00 DZD", method: "Bank Transfer", status: "Completed" },
    { id: "2", type: "Cash Out", category: "Software", entity: "AWS", date: "Oct 24, 2024", amount: "-14,230.00 DZD", method: "Credit Card", status: "Completed" },
    { id: "3", type: "Cash In", category: "Investment", entity: "Venture Partners", date: "Oct 20, 2024", amount: "+75,000.00 DZD", method: "Bank Transfer", status: "Completed" },
    { id: "4", type: "Cash Out", category: "Salaries", entity: "Payroll", date: "Oct 15, 2024", amount: "-65,000.00 DZD", method: "Bank Transfer", status: "Completed" },
    { id: "5", type: "Cash Out", category: "Rent", entity: "WeWork", date: "Oct 05, 2024", amount: "-15,372.00 DZD", method: "Bank Transfer", status: "Completed" },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchSearch = t.entity.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "All" || t.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Cash Flow Management</h2>
          <p className="text-body-md text-on-surface-variant">Real-time overview of incoming and outgoing liquidity.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer">
            <Download className="w-5 h-5" />
            Export Report
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
          <p className="text-body-sm text-on-surface-variant font-medium">Cash In</p>
          <p className="text-3xl font-bold text-on-surface">120,000 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-error font-bold text-xs bg-error/10 px-2 py-1 rounded-lg">-4.1%</span>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Cash Out</p>
          <p className="text-3xl font-bold text-on-surface">80,000 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-primary text-white border-none shadow-xl shadow-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-white font-bold text-xs bg-white/20 px-2 py-1 rounded-lg">Healthy</span>
          </div>
          <p className="text-body-sm text-white/80 font-medium">Net Cash Flow</p>
          <p className="text-3xl font-bold text-white">+40,000 DZD</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl min-h-[380px] flex flex-col justify-between bg-white/70">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-title-md text-lg font-bold text-on-surface">Cash Flow Trend</h3>
              <p className="text-xs text-on-surface-variant">Monthly incoming vs outgoing liquidity</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <span className="text-xs font-medium">In</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="text-xs font-medium">Out</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map((month, idx) => {
               const inHeights = ['40%', '65%', '55%', '85%', '75%', '95%'];
               const outHeights = ['30%', '45%', '60%', '50%', '65%', '40%'];
               return (
                <div key={month} className="flex flex-col items-center gap-4 flex-1">
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-primary w-5 h-5" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">AI Insights</h3>
            </div>
            <p className="text-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              &quot;Your net cash flow is strongly positive. <span className="font-bold text-on-surface">Consider investing surplus cash</span> (approx. 20,000 DZD) into high-yield short-term options to maximize capital efficiency.&quot;
            </p>
            <button className="w-full py-3 bg-primary-container/20 text-primary rounded-xl font-bold hover:bg-primary-container/30 transition-all cursor-pointer border border-primary/10">
              View Investment Options
            </button>
          </div>

          <div className="glass-card beveled-edge p-6 rounded-3xl bg-error-container/20 border border-error/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-error w-5 h-5" />
              <h4 className="font-bold text-error">Liquidity Alert</h4>
            </div>
            <p className="text-xs text-on-surface-variant">
              Upcoming scheduled payments (Rent & Payroll) next week will reduce cash balance by 80,372 DZD.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <h3 className="font-title-md text-lg font-bold text-on-surface">Cash Flow Streams</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input 
                type="text" 
                placeholder="Search entity or category..." 
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="relative">
              <select 
                className="pl-8 pr-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Cash In">Cash In</option>
                <option value="Cash Out">Cash Out</option>
              </select>
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Entity</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Category</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Method</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-8 text-center text-on-surface-variant">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${
                      tx.type === "Cash In" ? "bg-tertiary/10 text-tertiary" : "bg-error/10 text-error"
                    }`}>
                      {tx.type === "Cash In" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-on-surface">{tx.entity}</td>
                  <td className="px-8 py-5 text-on-surface-variant">{tx.category}</td>
                  <td className="px-8 py-5 text-on-surface-variant flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> {tx.method}
                  </td>
                  <td className="px-8 py-5 text-on-surface-variant font-mono-data">{tx.date}</td>
                  <td className={`px-8 py-5 font-bold font-mono-data text-right ${
                    tx.type === "Cash In" ? "text-tertiary" : "text-error"
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
