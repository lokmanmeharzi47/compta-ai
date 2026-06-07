"use client";

import React, { useState } from "react";
import {
  Upload,
  Plus,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Filter,
  Download,
  FileCheck,
  AlertTriangle,
  MoreVertical
} from "lucide-react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { vendor: "Amazon Web Services", initials: "AW", color: "bg-orange-100 text-orange-600", category: "Cloud", date: "Oct 12, 2024", amount: "14,230.45 DZD", receipt: "task" },
    { vendor: "Slack Technologies", initials: "SL", color: "bg-blue-100 text-blue-600", category: "Cloud", date: "Oct 10, 2024", amount: "2,450.00 DZD", receipt: "task" },
    { vendor: "WeWork Manhattan", initials: "WM", color: "bg-slate-100 text-slate-600", category: "Rent", date: "Oct 05, 2024", amount: "15,372.00 DZD", receipt: "error" },
    { vendor: "Meta Ads Manager", initials: "FB", color: "bg-purple-100 text-purple-600", category: "Marketing", date: "Oct 02, 2024", amount: "8,450.12 DZD", receipt: "task" },
  ]);

  const handleAddExpense = () => {
    const vendorPrompt = prompt("Enter vendor name:");
    if (!vendorPrompt) return;
    const amountPrompt = prompt("Enter amount (e.g. 1,200.00 DZD):");
    if (!amountPrompt) return;
    const categoryPrompt = prompt("Enter category (e.g. Cloud, Rent, Marketing):");
    if (!categoryPrompt) return;

    const initials = vendorPrompt.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    const newExpense = {
      vendor: vendorPrompt,
      initials: initials || "EX",
      color: "bg-primary/10 text-primary",
      category: categoryPrompt,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount: amountPrompt.endsWith("DZD") ? amountPrompt : `${amountPrompt} DZD`,
      receipt: "task"
    };

    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="space-y-8">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Expense Tracking</h2>
          <p className="text-body-md text-on-surface-variant">Automated ledger entries and real-time expense reporting.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/40 hover:bg-surface-container font-bold text-on-surface transition-all cursor-pointer">
            <Upload className="w-5 h-5" />
            Upload Receipt
          </button>
          <button
            onClick={handleAddExpense}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-2xl flex flex-col justify-between bg-white/70">
          <div>
            <span className="text-xs uppercase font-bold text-outline tracking-widest">Total Expenses</span>
            <h3 className="text-3xl font-bold text-on-background mt-1">85,400 DZD</h3>
          </div>
          <div className="flex items-center gap-1 text-error text-xs font-bold mt-4">
            <TrendingUp className="w-4 h-4" />
            12% from last month
          </div>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl flex flex-col justify-between bg-white/70">
          <div>
            <span className="text-xs uppercase font-bold text-outline tracking-widest">Budget Utilization</span>
            <h3 className="text-3xl font-bold text-on-background mt-1">72%</h3>
          </div>
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "72%" }}></div>
          </div>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl flex flex-col justify-between bg-white/70">
          <div>
            <span className="text-xs uppercase font-bold text-outline tracking-widest">Top Category</span>
            <h3 className="text-xl font-bold text-on-background mt-1">Cloud Services</h3>
          </div>
          <p className="text-xs text-on-surface-variant mt-4">42% of total spend</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl border-error/20 flex flex-col justify-between bg-white/70">
          <div>
            <span className="text-xs uppercase font-bold text-error tracking-widest">Flagged Anomalies</span>
            <h3 className="text-3xl font-bold text-error mt-1">2</h3>
          </div>
          <p className="text-xs text-error mt-4 font-bold flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> Immediate attention
          </p>
        </div>
      </div>

      {/* Middle Section: AI and Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Card */}
        <div className="lg:col-span-1 glass-card beveled-edge p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between border-primary/10 bg-white/70">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg text-primary">Cost Saving Insight</h4>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              &quot;Anomaly detected: <span className="font-bold text-on-background">AWS spending is 18% higher</span> than projected. AI suggests reviewing unused instances and reserved capacity.&quot;
            </p>
          </div>
          <button className="w-full py-3 bg-primary-container/10 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary-container/20 transition-all cursor-pointer">
            Apply AI Optimization
          </button>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl bg-white/70">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="font-bold text-lg text-on-background">Spending by Category</h4>
              <p className="text-xs text-on-surface-variant">Last 30 days distribution</p>
            </div>
            <select className="bg-transparent border-none text-xs font-bold text-primary focus:ring-0 cursor-pointer outline-none">
              <option>Current Month</option>
              <option>Previous Month</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Custom Donut SVG */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="none" r="16" stroke="#e6eeff" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="16" stroke="#0050cb" strokeDasharray="42 100" strokeLinecap="round" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="16" stroke="#645efb" strokeDasharray="25 100" strokeDashoffset="-42" stroke-linecap="round" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="16" stroke="#006274" strokeDasharray="18 100" strokeDashoffset="-67" stroke-linecap="round" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="16" stroke="#727687" strokeDasharray="15 100" strokeDashoffset="-85" stroke-linecap="round" strokeWidth="3"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-on-background">85.4k DZD</span>
              </div>
            </div>
            <div className="flex-grow grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant">Cloud Services</span>
                  <span className="font-bold text-sm text-on-surface">35,868 DZD</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#645efb]"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant">Salaries</span>
                  <span className="font-bold text-sm text-on-surface">21,350 DZD</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#006274]"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant">Rent &amp; Office</span>
                  <span className="font-bold text-sm text-on-surface">15,372 DZD</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-outline"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant">Marketing</span>
                  <span className="font-bold text-sm text-on-surface">12,810 DZD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/30">
          <h4 className="font-bold text-lg text-on-background">Expense List</h4>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Vendor</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Category</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-center">Receipt</th>
                <th className="px-8 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {expenses.map((expense, idx) => (
                <tr key={idx} className="hover:bg-white/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${expense.color}`}>
                        {expense.initials}
                      </div>
                      <span className="font-bold text-on-surface">{expense.vendor}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                       {expense.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-on-surface-variant font-mono-data">{expense.date}</td>
                  <td className={`px-8 py-5 font-bold ${expense.category === "Cloud" ? "text-error" : "text-on-surface"}`}>
                    {expense.amount}
                  </td>
                  <td className="px-8 py-5 text-center">
                    {expense.receipt === "task" ? (
                      <FileCheck className="w-5 h-5 text-primary mx-auto" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-outline mx-auto" />
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-outline hover:text-primary cursor-pointer">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
