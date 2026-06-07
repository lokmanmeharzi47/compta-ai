"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  Banknote,
  Gauge,
  TrendingUp,
  Hourglass,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function SalesPage() {
  const [salesList, setSalesList] = useState([
    { name: "Jordan Smith", initials: "JS", color: "text-primary bg-primary/10", date: "Oct 24, 2023", service: "Enterprise License", amount: "18,400.00 DZD", status: "Completed" },
    { name: "Apex Corp", initials: "AC", color: "text-secondary bg-secondary/10", date: "Oct 23, 2023", service: "Custom API Integration", amount: "12,000.00 DZD", status: "In Progress" },
    { name: "Lumina Media", initials: "LM", color: "text-primary bg-primary/10", date: "Oct 22, 2023", service: "Professional Tier", amount: "4,500.00 DZD", status: "Completed" },
    { name: "Tech Hub", initials: "TH", color: "text-error bg-error/10", date: "Oct 21, 2023", service: "Consultation Service", amount: "2,800.00 DZD", status: "Cancelled" },
  ]);

  const handleAddSale = () => {
    const namePrompt = prompt("Enter customer name:");
    if (!namePrompt) return;
    const amountPrompt = prompt("Enter amount (e.g. 5,000.00 DZD):");
    if (!amountPrompt) return;
    const servicePrompt = prompt("Enter product/service:");
    if (!servicePrompt) return;

    const initials = namePrompt.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    const newSale = {
      name: namePrompt,
      initials: initials || "US",
      color: "text-primary bg-primary/10",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      service: servicePrompt,
      amount: amountPrompt.endsWith("DZD") ? amountPrompt : `${amountPrompt} DZD`,
      status: "Completed"
    };

    setSalesList([newSale, ...salesList]);
  };

  return (
    <div className="space-y-8">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Sales Management</h2>
          <p className="text-body-md text-on-surface-variant">Real-time revenue monitoring and performance insights.</p>
        </div>
        <button
          onClick={handleAddSale}
          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Sale
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Banknote className="w-6 h-6" />
            </div>
            <span className="text-tertiary font-bold text-xs bg-tertiary/10 px-2 py-1 rounded-lg">+12.5%</span>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Total Sales</p>
          <p className="text-3xl font-bold text-on-surface">450,200 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Gauge className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Average Deal Size</p>
          <p className="text-3xl font-bold text-on-surface">12,500 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Sales Growth</p>
          <p className="text-3xl font-bold text-tertiary">+15%</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-outline-variant/20 flex items-center justify-center text-on-surface">
              <Hourglass className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Pending Deals</p>
          <p className="text-3xl font-bold text-on-surface">24</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl min-h-[380px] flex flex-col justify-between bg-white/70">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-title-md text-lg font-bold text-on-surface">Monthly Sales Performance</h3>
            <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[40%] group-hover:h-[45%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">JAN</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[65%] group-hover:h-[70%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">FEB</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[55%] group-hover:h-[60%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">MAR</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[85%] group-hover:h-[90%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">APR</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[75%] group-hover:h-[80%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">MAY</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 h-[95%] group-hover:h-[100%]"></div>
              </div>
              <span className="text-xs font-bold text-outline">JUN</span>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-card beveled-edge p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white/70">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-primary w-5 h-5" />
            <h3 className="font-title-md text-lg font-bold text-on-surface">AI Sales Insight</h3>
          </div>
          <div className="flex-1">
            <p className="text-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              &quot;Your sales in the <span className="font-bold text-on-surface">Tech sector</span> have increased by <span className="text-tertiary font-bold">22%</span> this quarter. Consider allocating more lead gen budget here.&quot;
            </p>
            <div className="p-4 bg-white/40 rounded-2xl border border-white/40 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Opportunity Score</span>
                <span className="text-sm font-bold text-primary">94/100</span>
              </div>
              <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-colors cursor-pointer">
            Apply Strategy
          </button>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/40">
          <h3 className="font-title-md text-lg font-bold text-on-surface">Recent Sales</h3>
          <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline cursor-pointer">
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Customer Name</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Product/Service</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {salesList.map((sale, i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${sale.color}`}>
                        {sale.initials}
                      </div>
                      <span className="font-body-md font-bold text-sm text-on-surface">{sale.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-on-surface-variant text-sm">{sale.date}</td>
                  <td className="px-8 py-5 text-on-surface-variant text-sm">{sale.service}</td>
                  <td className="px-8 py-5 font-mono-data text-on-surface font-bold text-sm">{sale.amount}</td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        sale.status === "Completed"
                          ? "bg-tertiary/10 text-tertiary"
                          : sale.status === "In Progress"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      {sale.status}
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
