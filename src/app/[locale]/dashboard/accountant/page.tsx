"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  Users,
  FileSignature,
  BellRing,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  MessageSquare,
  Clock,
  Send,
  AlertCircle,
  SquareDashedMousePointerIcon,
  Upload,
  Inbox,
  Share2,
  FileSpreadsheet,
  LineChart
} from "lucide-react";

export default function AccountantPortalPage() {
  const t = useTranslations("accountantPortal");
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    { id: "C-101", name: "Ahmed Benali", industry: "Retail", activeDeclarations: 1, debt: 0, status: t("statusInProgress") },
    { id: "C-102", name: "Globex Corp", industry: "Technology", activeDeclarations: 2, debt: 45000, status: t("statusInProgress") },
    { id: "C-103", name: "Tech Supply DZ", industry: "Distribution", activeDeclarations: 0, debt: 0, status: t("statusRequested") },
    { id: "C-104", name: "Karim Logistics", industry: "Transport", activeDeclarations: 1, debt: 15000, status: t("statusInProgress") },
  ];

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCases = [
    { id: "DEC-2024-11", trader: "Globex Corp", status: t("statusUnderReview"), due: "Dec 15, 2024" },
    { id: "DEC-2024-12B", trader: "Karim Logistics", status: t("statusSent"), due: "Jan 20, 2025" },
    { id: "annual-bilan-2025", trader: "tcr 2025", status: t("statusUnderReview"), due: "Mar 31, 2025" },
  ];

  const notifications = [
    { id: 1, title: t("notifNewDeclTitle"), text: t("notifNewDeclText", { trader: "Karim Logistics", id: "annual financial statement" }), time: t("time2hours"), type: "info" },
    { id: 2, title: t("notifDeadlineTitle"), text: t("notifDeadlineText", { trader: "Globex Corp" }), time: t("time5hours"), type: "warning" },
    { id: 3, title: t("notifPaymentTitle"), text: t("notifPaymentText", { trader: "Ahmed Benali", amount: "2,000 DZD", id: "DEC-2024-10" }), time: t("time1day"), type: "success" },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col justify-between items-start gap-2">
        <h2 className="font-headline-lg text-3xl font-bold text-on-surface flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-tertiary" />
          {t("title")}
        </h2>
        <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
      </div>

      {/* Accountant KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Users className="w-4 h-4" />
            <span className="font-bold text-xs">{t("assignedClients")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">24</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-tertiary">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-bold text-xs">{t("approvedSubmissions")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">54</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-secondary text-on-surface">
          <div className="flex items-center gap-2 mb-2 text-secondary-container">
            <FileSignature className="w-4 h-4" />
            <span className="font-bold text-xs">{t("pendingReviews")}</span>
          </div>
          <p className="text-3xl font-bold">2</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-error">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-xs">{t("upcomingDeadlines")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">1</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Upload className="w-4 h-4" />
            <span className="font-bold text-xs">{t("uploadedStatements")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Case Tracking & Notifications */}
        <div className="space-y-8">

          {/* Quick Case Status Tracking */}
          <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
            <div className="flex items-center gap-2 mb-6">
              <FileSignature className="w-5 h-5 text-secondary" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("actionRequired")}</h3>
            </div>
            <div className="space-y-3">
              {pendingCases.map(c => (
                <div key={c.id} className="p-4 bg-white/50 border border-outline-variant/30 rounded-2xl flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-on-surface break-words">{c.id}</p>
                      <p className="text-xs text-on-surface-variant font-bold mt-0.5 truncate">{c.trader}</p>
                    </div>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.status === t('statusSent') ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                      }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{t("due")} {c.due}</span>
                    </p>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <button title={t("btnAccept")} className="p-1.5 rounded-lg bg-tertiary/10 text-tertiary hover:bg-tertiary/20 transition-colors cursor-pointer">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button title={t("btnReject")} className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors cursor-pointer">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button title={t("btnReview")} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title={t("btnInbox")} className="p-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors cursor-pointer">
                        <Inbox className="w-4 h-4" />
                      </button>
                      <button title={t("btnShare")} className="p-1.5 rounded-lg bg-outline-variant/30 text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
            <div className="flex items-center gap-2 mb-6">
              <BellRing className="w-5 h-5 text-on-surface" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("notificationsTitle")}</h3>
            </div>
            <div className="space-y-4">
              {notifications.map(n => (
                <div key={n.id} className="flex gap-3 pb-4 border-b border-outline-variant/20 last:border-0 last:pb-0">
                  <div className={`mt-1 p-1.5 rounded-full h-max ${n.type === 'info' ? 'bg-secondary/10 text-secondary' :
                    n.type === 'success' ? 'bg-tertiary/10 text-tertiary' :
                      'bg-error/10 text-error'
                    }`}>
                    {n.type === 'info' && <Send className="w-3 h-3" />}
                    {n.type === 'success' && <CheckCircle2 className="w-3 h-3" />}
                    {n.type === 'warning' && <AlertCircle className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{n.title}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{n.text}</p>
                    <p className="text-[10px] text-outline font-bold mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Client Management Directory */}
        <div className="lg:col-span-2 glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40 flex flex-col">
          <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-title-md text-lg font-bold text-on-surface">{t("clientDirectory")}</h3>
            </div>
            <div className="relative w-48">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder={t("searchClients")}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("thTrader")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-center">{t("thActiveDeclarations")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">{t("thOutstandingDebt")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("thStatus")}</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">{t("thActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                {filteredClients.map(c => (
                  <tr key={c.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-on-surface">{c.name}</p>
                      <p className="text-xs text-on-surface-variant font-medium mt-0.5">{c.industry}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${c.activeDeclarations > 0 ? 'bg-secondary/10 text-secondary' : 'bg-outline-variant/20 text-on-surface-variant'
                        }`}>
                        {c.activeDeclarations}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-mono-data font-bold">
                      {c.debt > 0 ? (
                        <span className="text-error">{c.debt.toLocaleString()} DZD</span>
                      ) : (
                        <span className="text-tertiary">0 DZD</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${c.status === t('statusInProgress') ? 'text-tertiary' : 'text-outline'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${c.status === t('statusInProgress') ? 'bg-tertiary' : 'bg-outline'}`}></div>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 flex justify-end gap-2">
                      <button title={t("btnContact")} className="p-2 border border-outline-variant/50 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-outline hover:text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button title={t("btnOpen")} className="p-2 border border-outline-variant/50 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-outline hover:text-tertiary">
                        <SquareDashedMousePointerIcon className="w-4 h-4" />
                      </button>
                      <button title={t("btnImportExcel")} className="p-2 border border-outline-variant/50 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-outline hover:text-secondary">
                        <FileSpreadsheet className="w-4 h-4" />
                      </button>
                      <button title={t("btnFinancialAnalysis")} className="p-2 border border-outline-variant/50 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-outline hover:text-primary">
                        <LineChart className="w-4 h-4" />
                      </button>
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
