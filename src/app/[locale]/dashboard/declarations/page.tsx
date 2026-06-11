"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FileSignature,
  FileEdit,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  MessageSquare,
  Wallet,
  Clock,
  ArrowRight
} from "lucide-react";

export default function DeclarationsPage() {
  const t = useTranslations("declarationsPage");
  const [searchQuery, setSearchQuery] = useState("");

  const declarations = [
    { id: "DEC-2024-10", period: "October 2024", trader: "Ahmed Benali", accountant: "Sarah Expert", status: "Approved", date: "Nov 02, 2024", amount: "1,245,000 DZD", fee: 2000, paymentStatus: "Paid" },
    { id: "DEC-2024-11", period: "November 2024", trader: "Globex Corp", accountant: "Sarah Expert", status: "Under Review", date: "Dec 05, 2024", amount: "3,450,000 DZD", fee: 2000, paymentStatus: "Pending Payment" },
    { id: "DEC-2024-12", period: "December 2024", trader: "Acme Industries", accountant: "Unassigned", status: "Draft", date: "Jan 02, 2025", amount: "890,000 DZD", fee: 2000, paymentStatus: "Pending Payment" },
    { id: "DEC-2024-12B", period: "December 2024", trader: "Karim Logistics", accountant: "Sarah Expert", status: "Sent", date: "Jan 05, 2025", amount: "2,100,000 DZD", fee: 2000, paymentStatus: "Pending Payment" },
    { id: "DEC-2024-09", period: "September 2024", trader: "Tech Supply DZ", accountant: "Sarah Expert", status: "Rejected", date: "Oct 10, 2024", amount: "550,000 DZD", fee: 2000, paymentStatus: "Refunded" },
    { id: "DEC-2024-08", period: "August 2024", trader: "Tech Supply DZ", accountant: "Sarah Expert", status: "Approved", date: "Sep 12, 2024", amount: "720,000 DZD", fee: 2000, paymentStatus: "Processing" },
  ];

  const filteredDeclarations = declarations.filter(d => 
    d.trader.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'Draft': return { color: 'text-outline', bg: 'bg-outline-variant/20', icon: <FileEdit className="w-3 h-3" /> };
      case 'Sent': return { color: 'text-secondary', bg: 'bg-secondary/10', icon: <Send className="w-3 h-3" /> };
      case 'Under Review': return { color: 'text-primary', bg: 'bg-primary/10', icon: <Eye className="w-3 h-3" /> };
      case 'Approved': return { color: 'text-tertiary', bg: 'bg-tertiary/10', icon: <CheckCircle2 className="w-3 h-3" /> };
      case 'Rejected': return { color: 'text-error', bg: 'bg-error/10', icon: <XCircle className="w-3 h-3" /> };
      default: return { color: 'text-outline', bg: 'bg-outline-variant/20', icon: null };
    }
  };

  const getPaymentStatusConfig = (status: string) => {
    switch(status) {
      case 'Paid': return { color: 'text-tertiary', bg: 'bg-tertiary/10' };
      case 'Pending Payment': return { color: 'text-outline', bg: 'bg-outline-variant/20' };
      case 'Processing': return { color: 'text-secondary', bg: 'bg-secondary/10' };
      case 'Refunded': return { color: 'text-error', bg: 'bg-error/10' };
      default: return { color: 'text-outline', bg: 'bg-outline-variant/20' };
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">{t("title")}</h2>
          <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container transition-all cursor-pointer">
            <Plus className="w-5 h-5" />
            {t("newDeclaration")}
          </button>
        </div>
      </div>

      {/* Pipeline Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70 border-t-4 border-outline">
          <div className="flex items-center gap-2 mb-2">
            <FileEdit className="w-4 h-4 text-outline" />
            <span className="font-bold text-sm text-on-surface-variant">{t("drafts")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">1</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70 border-t-4 border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-4 h-4 text-secondary" />
            <span className="font-bold text-sm text-on-surface-variant">{t("sent")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">1</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70 border-t-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-on-surface-variant">{t("reviewing")}</span>
          </div>
          <p className="text-3xl font-bold text-on-surface">1</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70 border-t-4 border-error">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-error" />
            <span className="font-bold text-sm text-on-surface-variant">{t("rejected")}</span>
          </div>
          <p className="text-3xl font-bold text-error">1</p>
        </div>
        <div className="glass-card beveled-edge p-5 rounded-2xl bg-white/70 border-t-4 border-tertiary">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-tertiary" />
            <span className="font-bold text-sm text-on-surface-variant">{t("approved")}</span>
          </div>
          <p className="text-3xl font-bold text-tertiary">2</p>
        </div>
      </div>

      {/* Declarations Ledger */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-title-md text-lg font-bold text-on-surface flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-primary" />
            {t("declarationsLog")}
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input 
                type="text" 
                placeholder={t("search")}
                className="w-full ps-9 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("idPeriod")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("traderAccountant")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("declarationStatus")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider">{t("paymentStatus")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("feeSplit")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm">
              {filteredDeclarations.map((dec) => {
                const conf = getStatusConfig(dec.status);
                const payConf = getPaymentStatusConfig(dec.paymentStatus);
                const accShare = dec.fee * 0.9;
                const platShare = dec.fee * 0.1;
                
                return (
                  <tr key={dec.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-on-surface">{dec.id}</p>
                      <p className="text-xs text-on-surface-variant">{dec.period}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-on-surface-variant">{dec.trader}</p>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <ArrowRight className="w-3 h-3 text-outline" /> {dec.accountant}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-max ${conf.bg} ${conf.color}`}>
                        {conf.icon}
                        {dec.status === "Approved" ? t("statusApproved") : dec.status === "Draft" ? t("statusDraft") : dec.status === "Sent" ? t("statusSent") : dec.status === "Under Review" ? t("statusReview") : t("statusRejected")}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${payConf.bg} ${payConf.color}`}>
                        {dec.paymentStatus === "Paid" ? t("payPaid") : dec.paymentStatus === "Pending Payment" ? t("payPending") : dec.paymentStatus === "Processing" ? t("payProcessing") : t("payRefunded")}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-end">
                      {dec.status === 'Approved' ? (
                        <div>
                          <p className="font-mono-data font-bold text-on-surface">{dec.fee.toLocaleString()} DZD</p>
                          <div className="flex justify-end gap-2 text-[10px] mt-1 font-bold">
                            <span className="text-tertiary" title="Accountant Share (90%)">Acc: {accShare.toLocaleString()}</span>
                            <span className="text-primary" title="Platform Commission (10%)">Com: {platShare.toLocaleString()}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-outline font-bold italic">{t("awaitingApproval")}</p>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {dec.status === 'Draft' && (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer">
                            <Send className="w-3 h-3" /> {t("submit")}
                          </button>
                        )}
                        {dec.status === 'Sent' && (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer">
                            <Eye className="w-3 h-3" /> {t("review")}
                          </button>
                        )}
                        {dec.status === 'Under Review' && (
                          <>
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-tertiary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer">
                              <CheckCircle2 className="w-3 h-3" /> {t("approve")}
                            </button>
                            <button className="p-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors cursor-pointer">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {(dec.status === 'Rejected' || dec.status === 'Approved') && (
                          <div className="flex gap-2">
                            {dec.status === 'Approved' && dec.paymentStatus === 'Pending Payment' && (
                              <button className="flex items-center gap-1 px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-xs font-bold hover:bg-outline-variant/20 transition-colors cursor-pointer border border-outline-variant/30">
                                <Wallet className="w-3 h-3" /> {t("payFee")}
                              </button>
                            )}
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-xs font-bold hover:bg-outline-variant/20 transition-colors cursor-pointer border border-outline-variant/30">
                              <MessageSquare className="w-3 h-3" /> {t("notes")}
                            </button>
                          </div>
                        )}
                      </div>
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
