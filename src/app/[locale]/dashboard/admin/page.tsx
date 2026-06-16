"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Shield,
  Users,
  Briefcase,
  FileSignature,
  PieChart,
  Percent,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Activity,
  AlertTriangle
} from "lucide-react";

export default function AdminPanelPage() {
  const [commission, setCommission] = useState(10);
  const t = useTranslations("adminPanel");

  const accountants = [
    { id: "ACC-01", name: "Sarah Expert", email: "sarah@expert.dz", certification: "CPA-2024-DZ", status: t("statusApproved") },
    { id: "ACC-02", name: "Mohammed Audit", email: "m.audit@finance.dz", certification: "CPA-2023-DZ", status: t("statusPending") },
    { id: "ACC-03", name: "Karima Tax", email: "karima@tax.dz", certification: t("na"), status: t("statusSuspended") },
  ];

  const activityLogs = [
    { id: 1, user: t("userAdmin"), action: t("logUpdatedCommission", { commission: 10 }), time: t("time10mins"), type: "system" },
    { id: 2, user: t("userSystem"), action: t("logPaymentSplit", { period: "DEC-2024-10" }), time: t("time1hour"), type: "financial" },
    { id: 3, user: "Mohammed Audit", action: t("logCpaCredentials"), time: t("time2hours"), type: "security" },
    { id: 4, user: t("userTrader"), action: t("logFailedLogin"), time: t("time5hours"), type: "alert" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col justify-between items-start gap-2">
        <h2 className="font-headline-lg text-3xl font-bold text-on-surface flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          {t("title")}
        </h2>
        <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
      </div>

      {/* Platform Analytics KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <Users className="w-4 h-4" />
            <span className="font-bold text-xs">{t("totalUsers")}</span>
          </div>
          <p className="text-2xl font-bold text-on-surface">1,248</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <Users className="w-4 h-4" />
            <span className="font-bold text-xs">{t("activeTraders")}</span>
          </div>
          <p className="text-2xl font-bold text-on-surface">1,102</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-tertiary">
            <Briefcase className="w-4 h-4" />
            <span className="font-bold text-xs">{t("accountants")}</span>
          </div>
          <p className="text-2xl font-bold text-on-surface">142</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <FileSignature className="w-4 h-4" />
            <span className="font-bold text-xs">{t("declarations")}</span>
          </div>
          <p className="text-2xl font-bold text-on-surface">4,520</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-primary text-white md:col-span-2">
          <div className="flex items-center gap-2 mb-2 text-primary-container">
            <PieChart className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">{t("monthlyGrowth")}</span>
          </div>
          <p className="text-2xl font-bold text-on-surface">+ 14.5%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Commission & Logs */}
        <div className="space-y-8">
          {/* Commission Management */}
          <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
            <div className="flex items-center gap-2 mb-4">
              <Percent className="w-5 h-5 text-tertiary" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("commissionSettings")}</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">{t("commissionDesc")}</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-on-surface">{t("platformCut")}</span>
                  <span className="text-tertiary">{commission}%</span>
                </div>
                <input
                  type="range"
                  min="0" max="30"
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full h-2 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-tertiary"
                />
              </div>
              <div className="flex justify-between text-sm font-bold pt-4 border-t border-outline-variant/30">
                <span className="text-on-surface-variant">{t("accountantShare")}</span>
                <span className="text-primary">{100 - commission}%</span>
              </div>
              <button className="w-full py-2 bg-on-surface text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors cursor-pointer mt-4">
                {t("saveSettings")}
              </button>
            </div>
          </div>

          {/* Activity & Security Logs */}
          <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("systemLogs")}</h3>
            </div>
            <div className="space-y-4">
              {activityLogs.map(log => (
                <div key={log.id} className="flex gap-3 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className={`mt-1 p-1.5 rounded-full h-max ${log.type === 'system' ? 'bg-primary/10 text-primary' :
                      log.type === 'financial' ? 'bg-tertiary/10 text-tertiary' :
                        log.type === 'security' ? 'bg-secondary/10 text-secondary' :
                          'bg-error/10 text-error'
                    }`}>
                    {log.type === 'system' && <Lock className="w-3 h-3" />}
                    {log.type === 'financial' && <PieChart className="w-3 h-3" />}
                    {log.type === 'security' && <Shield className="w-3 h-3" />}
                    {log.type === 'alert' && <AlertTriangle className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{log.action}</p>
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <Users className="w-2.5 h-2.5" /> {log.user} • {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Accountant Verification Table */}
        <div className="lg:col-span-2 glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40 flex flex-col">
          <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-secondary" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("approvalSystem")}</h3>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("thAccountant")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("thCredentials")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("thStatus")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">{t("thActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                {accountants.map(acc => (
                  <tr key={acc.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-on-surface">{acc.name}</p>
                      <p className="text-xs text-on-surface-variant">{acc.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono-data text-xs text-on-surface-variant font-bold border border-outline-variant/50 px-2 py-1 rounded-lg">
                        {acc.certification}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${acc.status === t("statusApproved") ? 'bg-tertiary/10 text-tertiary' :
                          acc.status === t("statusPending") ? 'bg-secondary/10 text-secondary' :
                            'bg-error/10 text-error'
                        }`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {acc.status === t("statusPending") && (
                        <div className="flex items-center justify-end gap-2">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-tertiary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer">
                            <CheckCircle2 className="w-3 h-3" /> {t("approve")}
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg text-xs font-bold hover:bg-error/20 transition-colors cursor-pointer">
                            <XCircle className="w-3 h-3" /> {t("reject")}
                          </button>
                        </div>
                      )}
                      {acc.status === t("statusApproved") && (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-xs font-bold hover:bg-outline-variant/20 transition-colors cursor-pointer border border-outline-variant/30">
                          <Clock className="w-3 h-3" /> {t("suspend")}
                        </button>
                      )}
                      {acc.status === t("statusSuspended") && (
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors cursor-pointer">
                          <CheckCircle2 className="w-3 h-3" /> {t("reinstate")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
