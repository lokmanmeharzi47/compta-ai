"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Play,
  Wallet,
  Calendar,
  Users,
  Scale,
  Sparkles,
  ChevronRight,
  Info,
  ArrowRight,
  MoreVertical
} from "lucide-react";

export default function PayrollPage() {
  const [employees, setEmployees] = useState([
    { name: "Sarah Holmes", email: "sarah.h@compta.ai", initials: "SH", role: "Senior Engineer", dept: "Technology", gross: "8,500.00 DZD", net: "6,420.50 DZD", status: "Scheduled", initialsColor: "text-primary" },
    { name: "Marcus Knight", email: "m.knight@compta.ai", initials: "MK", role: "Product Designer", dept: "Creative", gross: "7,200.00 DZD", net: "5,180.20 DZD", status: "Paid", initialsColor: "text-secondary" },
    { name: "Jane Liang", email: "jane.l@compta.ai", initials: "JL", role: "Account Manager", dept: "Growth", gross: "6,800.00 DZD", net: "4,920.00 DZD", status: "Scheduled", initialsColor: "text-tertiary" },
  ]);

  const handleAddEmployee = () => {
    const name = prompt("Enter employee name:");
    if (!name) return;
    const email = prompt("Enter email address:");
    if (!email) return;
    const role = prompt("Enter role:");
    if (!role) return;
    const dept = prompt("Enter department:");
    if (!dept) return;
    const gross = prompt("Enter gross pay:");
    if (!gross) return;

    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    const grossFormatted = gross.endsWith("DZD") ? gross : `${gross} DZD`;
    // calculate simple net pay (75% of gross)
    const numericGross = parseFloat(gross.replace(/[^0-9.]/g, ""));
    const netFormatted = isNaN(numericGross) ? grossFormatted : `${(numericGross * 0.75).toFixed(2)} DZD`;

    const newEmp = {
      name,
      email,
      initials: initials || "EM",
      role,
      dept,
      gross: grossFormatted,
      net: netFormatted,
      status: "Scheduled",
      initialsColor: "text-primary"
    };

    setEmployees([...employees, newEmp]);
  };

  const handleRunPayroll = () => {
    const updated = employees.map(emp => {
      if (emp.status === "Scheduled") {
        return { ...emp, status: "Paid" };
      }
      return emp;
    });
    setEmployees(updated);
    alert("Payroll run successfully! All scheduled employees have been marked as paid.");
  };

  return (
    <div className="space-y-8">
      {/* Page Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-background">Payroll Overview</h2>
          <p className="text-on-surface-variant mt-1">Manage employee compensation and tax compliance with AI insights.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAddEmployee}
            className="px-6 py-2.5 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary/5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            Add Employee
          </button>
          <button
            onClick={handleRunPayroll}
            className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            Run Payroll
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-primary font-mono-data text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">+2.4%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-widest mb-1">
            Total Payroll Cost
          </p>
          <h3 className="text-2xl font-bold text-on-background">120,500 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <p className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-widest mb-1">Next Pay Date</p>
          <h3 className="text-2xl font-bold text-on-background">Oct 31</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-widest mb-1">
            Active Employees
          </p>
          <h3 className="text-2xl font-bold text-on-background">{employees.length}</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl border-error/10 bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center text-error">
              <Scale className="w-6 h-6" />
            </div>
          </div>
          <p className="text-on-surface-variant font-label-caps uppercase text-[10px] tracking-widest mb-1">Tax Liability</p>
          <h3 className="text-2xl font-bold text-on-background">18,200 DZD</h3>
        </div>
      </div>

      {/* Analysis Section: Chart & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Breakdown Chart */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl relative overflow-hidden bg-white/70 flex flex-col justify-between min-h-[380px]">
          <div className="flex justify-between items-center mb-10">
            <h4 className="font-bold text-lg text-on-background">Payroll Breakdown</h4>
            <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span> Salaries
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span> Taxes
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span> Benefits
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-6 px-4">
            {/* Simplified bar chart representation */}
            <div className="w-full flex flex-col items-center group h-full justify-end">
              <div className="w-16 bg-primary/20 rounded-t-xl h-[85%] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[85%] bg-primary rounded-t-xl shadow-lg shadow-primary/20"></div>
              </div>
              <span className="mt-4 font-label-caps text-xs text-outline font-bold">Q1</span>
            </div>
            <div className="w-full flex flex-col items-center group h-full justify-end">
              <div className="w-16 bg-primary/20 rounded-t-xl h-[90%] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[90%] bg-primary rounded-t-xl"></div>
              </div>
              <span className="mt-4 font-label-caps text-xs text-outline font-bold">Q2</span>
            </div>
            <div className="w-full flex flex-col items-center group h-full justify-end">
              <div className="w-16 bg-primary/20 rounded-t-xl h-[80%] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[80%] bg-primary rounded-t-xl"></div>
              </div>
              <span className="mt-4 font-label-caps text-xs text-outline font-bold">Q3</span>
            </div>
            <div className="w-full flex flex-col items-center group h-full justify-end">
              <div className="w-16 bg-primary/20 rounded-t-xl h-[95%] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[95%] bg-primary rounded-t-xl"></div>
              </div>
              <span className="mt-4 font-label-caps text-xs text-outline font-bold">Q4</span>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-card beveled-edge p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg text-on-background">AI Insights</h4>
            </div>
            <div className="space-y-6">
              <div className="p-5 bg-white/60 rounded-2xl border border-white/40 shadow-sm">
                <p className="text-body-md text-sm text-on-background leading-relaxed">
                  &quot;Q4 tax projections suggest a <span className="text-primary font-bold">5,000 DZD credit eligibility</span> based on your recent R&amp;D hires.&quot;
                </p>
                <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 hover:underline cursor-pointer">
                  Claim Credit Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-outline mt-6">
            <Info className="w-4 h-4" />
            Based on real-time tax code updates.
          </div>
        </div>
      </div>

      {/* Employee Payroll Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/30">
          <h4 className="font-bold text-lg text-on-background">Employee Payroll Details</h4>
          <button className="text-primary font-bold flex items-center gap-1 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">
                <th className="px-8 py-5">Employee Name</th>
                <th className="px-6 py-5">Role &amp; Department</th>
                <th className="px-6 py-5">Gross Pay</th>
                <th className="px-6 py-5">Net Pay</th>
                <th className="px-6 py-5">Payment Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-white/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold ${emp.initialsColor}`}>
                        {emp.initials}
                      </div>
                      <div>
                        <p className="font-bold text-on-background">{emp.name}</p>
                        <p className="text-xs text-outline">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-on-background">{emp.role}</p>
                    <p className="text-xs text-outline">{emp.dept}</p>
                  </td>
                  <td className="px-6 py-5 font-mono-data font-bold text-on-surface">{emp.gross}</td>
                  <td className="px-6 py-5 font-mono-data font-bold text-on-surface">{emp.net}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        emp.status === "Paid"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-outline group-hover:text-primary transition-colors cursor-pointer">
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
