"use client";

import React from "react";
import {
  TrendingUp,
  Receipt,
  Wallet,
  Coins,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export default function DashboardHome() {
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
            Total Revenue
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
            Expenses
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
            Profit
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
            Cash Balance
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
              Smart Optimization Insight
            </h4>
            <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl">
              Your profits increased <span className="font-bold text-primary">12%</span> compared to last month. Recommendation:{" "}
              <span className="font-bold text-on-background">Increase marketing spend by 5%</span> to capitalize on current customer
              acquisition trends.
            </p>
          </div>
          <button className="md:ml-auto px-6 py-3 bg-on-background text-white hover:bg-primary rounded-xl font-bold transition-all shrink-0 active:scale-95 cursor-pointer">
            Apply Suggestion
          </button>
        </div>
        {/* Decorative element */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CHARTS & TRANSACTIONS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue vs Expenses Chart Card */}
          <div className="glass-card beveled-edge p-8 rounded-3xl min-h-[400px] flex flex-col bg-white/70">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-title-md text-lg font-bold">Revenue vs Expenses</h3>
                <p className="text-xs text-on-surface-variant">Performance over the last 12 months</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="text-xs font-medium">Expenses</span>
                </div>
              </div>
            </div>
            {/* Chart Grid */}
            <div className="flex-1 w-full flex items-end gap-2 px-2 h-48">
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[40%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[30%] transition-all hover:bg-secondary-container/40"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[60%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[45%] transition-all hover:bg-secondary-container/40"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[80%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[55%] transition-all hover:bg-secondary-container/40"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[75%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[60%] transition-all hover:bg-secondary-container/40"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[95%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[65%] transition-all hover:bg-secondary-container/40"></div>
              <div className="flex-1 bg-primary/20 rounded-t-lg h-[90%] transition-all hover:bg-primary/40"></div>
              <div className="flex-1 bg-secondary-container/20 rounded-t-lg h-[70%] transition-all hover:bg-secondary-container/40"></div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-outline font-mono-data">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
              <span>JUN</span>
              <span>JUL</span>
              <span>AUG</span>
              <span>SEP</span>
              <span>OCT</span>
              <span>NOV</span>
              <span>DEC</span>
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="glass-card beveled-edge p-8 rounded-3xl bg-white/70">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-lg font-bold">Recent Transactions</h3>
              <button className="text-primary font-bold text-sm hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-outline font-label-caps tracking-widest text-xs border-b border-outline-variant/30">
                    <th className="pb-4 font-bold">Company</th>
                    <th className="pb-4 font-bold">Category</th>
                    <th className="pb-4 font-bold">Date</th>
                    <th className="pb-4 font-bold">Amount</th>
                    <th className="pb-4 font-bold">Status</th>
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
                    <td className="py-4 text-on-surface-variant text-sm">Software Subscription</td>
                    <td className="py-4 text-on-surface-variant text-sm">Oct 24, 2024</td>
                    <td className="py-4 font-mono-data font-bold text-sm">-499.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary/10 text-tertiary">Paid</span>
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
                    <td className="py-4 text-on-surface-variant text-sm">Payment Gateway</td>
                    <td className="py-4 text-on-surface-variant text-sm">Oct 22, 2024</td>
                    <td className="py-4 font-mono-data font-bold text-sm">+12,400.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary/10 text-tertiary">Paid</span>
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
                    <td className="py-4 text-on-surface-variant text-sm">Infrastructure</td>
                    <td className="py-4 text-on-surface-variant text-sm">Oct 21, 2024</td>
                    <td className="py-4 font-mono-data font-bold text-sm">-2,150.00 DZD</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-error/10 text-error">Pending</span>
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
            <h3 className="font-title-md text-lg font-bold mb-6">Expense Breakdown</h3>
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
                <span className="text-[10px] text-outline tracking-wider font-bold">TOTAL</span>
                <span className="font-bold text-2xl text-on-surface">45.2k DZD</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium">Software</span>
                </div>
                <span className="font-mono-data text-sm font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="text-sm font-medium">Marketing</span>
                </div>
                <span className="font-mono-data text-sm font-bold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="text-sm font-medium">Operations</span>
                </div>
                <span className="font-mono-data text-sm font-bold">15%</span>
              </div>
            </div>
          </div>

          {/* SMART ALERTS */}
          <div className="glass-card beveled-edge p-8 rounded-3xl bg-white/70">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-error w-6 h-6" />
              <h3 className="font-title-md text-lg font-bold">Priority Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-error-container/30 border border-error/10 rounded-2xl">
                <p className="font-bold text-error text-sm mb-1">Low liquidity warning</p>
                <p className="text-xs text-on-surface-variant">
                  Projected cash flow indicates a potential deficit in 14 days.
                </p>
                <button className="mt-3 text-xs font-bold text-error underline hover:text-error/80 transition-colors cursor-pointer">
                  Optimize Runway
                </button>
              </div>
              <div className="p-4 bg-surface-container-high border border-outline-variant/20 rounded-2xl">
                <p className="font-bold text-on-surface text-sm mb-1">Invoice overdue</p>
                <p className="text-xs text-on-surface-variant">
                  Invoice #INV-9902 from Globex Corp is 3 days overdue (4,200 DZD).
                </p>
                <button className="mt-3 text-xs font-bold text-primary underline hover:text-primary/80 transition-colors cursor-pointer">
                  Send Reminder
                </button>
              </div>
            </div>
          </div>

          {/* Promo Card */}
          <div className="rounded-3xl p-8 bg-on-background text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-title-md text-lg font-bold text-white mb-2">Ready for Auto-Tax?</h4>
              <p className="text-xs text-outline-variant mb-6">
                Let COMPTA AI handle your quarterly filings automatically.
              </p>
              <button className="w-full py-3 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold transition-all active:scale-95 cursor-pointer">
                Activate Now
              </button>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
