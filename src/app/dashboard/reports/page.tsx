"use client";

import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  Share2,
  Sparkles,
  Filter,
  MoreVertical
} from "lucide-react";

export default function ReportsPage() {
  const [data, setData] = useState({
    revenueGross: 452300.0,
    revenueAdjust: -2300.0,
    revenueTrend: "↑ 8%",
    cogsGross: 120000.0,
    cogsAdjust: 0.0,
    cogsTrend: "↑ 2%",
    opexGross: 85400.0,
    opexAdjust: -400.0,
    opexTrend: "↓ 4%",
  });

  const revenueNet = data.revenueGross + data.revenueAdjust;
  const cogsNet = data.cogsGross + data.cogsAdjust;
  const grossProfit = revenueNet - cogsNet;
  const opexNet = data.opexGross + data.opexAdjust;
  const netIncome = grossProfit - opexNet;

  const handleAdjustBudget = () => {
    const opexStr = prompt("Enter new gross Operating Expenses (currently 85,400.00 DZD):", String(data.opexGross));
    if (opexStr === null) return;
    const newOpex = parseFloat(opexStr);
    if (isNaN(newOpex)) return;

    setData({
      ...data,
      opexGross: newOpex,
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Financial Reports</h2>
          <p className="text-body-md text-on-surface-variant">Comprehensive ledger reports and compliance metrics.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Net Income Trend Chart (8 cols) */}
        <div className="col-span-12 lg:col-span-8 glass-card beveled-edge rounded-3xl p-8 relative overflow-hidden bg-white/70 min-h-[380px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-title-md text-lg font-bold text-on-surface">Net Income Trend</h3>
              <p className="text-xs text-on-surface-variant">Monthly performance overview</p>
            </div>
            <div className="flex gap-4 text-xs font-bold text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>CURRENT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-outline"></span>
                <span>PREVIOUS</span>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
              {/* Grid Lines */}
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="0" y2="0"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="200" y2="200"></line>
              {/* Area Gradient */}
              <path
                d="M0 150 Q 100 120, 200 130 T 400 80 T 600 100 T 800 40 L 800 200 L 0 200 Z"
                fill="url(#chartGradient)"
              ></path>
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 80, 203, 0.15)"></stop>
                  <stop offset="100%" stopColor="rgba(0, 80, 203, 0)"></stop>
                </linearGradient>
              </defs>
              {/* Line Path */}
              <path
                d="M0 150 Q 100 120, 200 130 T 400 80 T 600 100 T 800 40"
                fill="none"
                stroke="#0050cb"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
              {/* Interactive Point */}
              <circle cx="800" cy="40" fill="#0050cb" r="6"></circle>
              <circle cx="800" cy="40" fill="#0050cb" fillOpacity="0.2" r="12"></circle>
            </svg>
            {/* X-Axis Labels */}
            <div className="flex justify-between mt-4 text-xs font-bold text-on-surface-variant">
              <span>OCT 01</span>
              <span>OCT 08</span>
              <span>OCT 15</span>
              <span>OCT 22</span>
              <span>OCT 31</span>
            </div>
          </div>
        </div>

        {/* AI Summary Card (4 cols) */}
        <div className="col-span-12 lg:col-span-4 glass-card beveled-edge rounded-3xl p-8 bg-primary/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-title-md text-lg font-bold text-on-surface">AI Summary</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-on-surface leading-relaxed">
                Your net income has increased by <span className="font-bold text-primary">12.4%</span> compared to last month, primarily driven by a surge in digital service subscriptions.
              </p>
              <p className="text-sm text-on-surface leading-relaxed">
                Operating expenses remain well-controlled at <span className="font-bold text-tertiary">22%</span> of total revenue, which is below the industry benchmark for mid-sized fintechs.
              </p>
              <p className="text-sm text-on-surface leading-relaxed italic border-l-2 border-primary pl-4">
                &quot;Opportunity identified: Consider reallocating the unused marketing budget to R&amp;D to capitalize on the current growth trajectory.&quot;
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/40 rounded-2xl border border-white/40">
            <p className="text-xs font-bold text-on-surface-variant mb-2">QUICK ACTION</p>
            <button
              onClick={handleAdjustBudget}
              className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg border border-primary/20 hover:shadow-md transition-all cursor-pointer"
            >
              Adjust Budget Plan
            </button>
          </div>
        </div>

        {/* Financial Table (12 cols) */}
        <div className="col-span-12 glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/40">
            <h3 className="font-title-md text-lg font-bold text-on-surface">Statement Details</h3>
            <div className="flex gap-4">
              <Filter className="w-5 h-5 text-outline cursor-pointer hover:text-primary" />
              <MoreVertical className="w-5 h-5 text-outline cursor-pointer hover:text-primary" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant">CATEGORY</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-right">GROSS AMOUNT</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-right">ADJUSTMENTS</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-right">NET AMOUNT</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-right">TREND</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                {/* Revenue */}
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 font-bold text-on-surface">Revenue</td>
                  <td className="px-8 py-5 font-mono-data text-right">${data.revenueGross.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 font-mono-data text-right">(${Math.abs(data.revenueAdjust).toLocaleString("en-US", { minimumFractionDigits: 2 })})</td>
                  <td className="px-8 py-5 font-mono-data font-bold text-right text-primary">${revenueNet.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 text-right"><span className="text-tertiary font-bold">{data.revenueTrend}</span></td>
                </tr>
                {/* COGS */}
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 text-on-surface">Cost of Goods Sold (COGS)</td>
                  <td className="px-8 py-5 font-mono-data text-right">${data.cogsGross.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 font-mono-data text-right">${data.cogsAdjust.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 font-mono-data text-right text-error">(${cogsNet.toLocaleString("en-US", { minimumFractionDigits: 2 })})</td>
                  <td className="px-8 py-5 text-right"><span className="text-error font-bold">{data.cogsTrend}</span></td>
                </tr>
                {/* Gross Profit */}
                <tr className="bg-[#eff4ff]/40">
                  <td className="px-8 py-5 font-bold text-on-surface">Gross Profit</td>
                  <td className="px-8 py-5 font-mono-data text-right">--</td>
                  <td className="px-8 py-5 font-mono-data text-right">--</td>
                  <td className="px-8 py-5 font-mono-data font-black text-right">${grossProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 text-right"><span className="text-tertiary font-bold">↑ 11%</span></td>
                </tr>
                {/* Operating Expenses */}
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 text-on-surface">Operating Expenses</td>
                  <td className="px-8 py-5 font-mono-data text-right">${data.opexGross.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-5 font-mono-data text-right">(${Math.abs(data.opexAdjust).toLocaleString("en-US", { minimumFractionDigits: 2 })})</td>
                  <td className="px-8 py-5 font-mono-data text-right text-error">(${opexNet.toLocaleString("en-US", { minimumFractionDigits: 2 })})</td>
                  <td className="px-8 py-5 text-right"><span className="text-tertiary font-bold">{data.opexTrend}</span></td>
                </tr>
                {/* Net Income */}
                <tr className="bg-primary/10 border-t-2 border-primary/30">
                  <td className="px-8 py-6 font-black text-primary">Net Income</td>
                  <td className="px-8 py-6 font-mono-data text-right">--</td>
                  <td className="px-8 py-6 font-mono-data text-right">--</td>
                  <td className="px-8 py-6 font-mono-data font-black text-2xl text-right text-primary">${netIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full font-bold">↑ 12.4%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
