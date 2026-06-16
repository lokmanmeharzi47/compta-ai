"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Download, FileSpreadsheet, Share2, Sparkles, Filter, MoreVertical,
  Upload, ChevronDown, Send
} from "lucide-react";
import { FinancialReportProvider, useFinancialReport } from "@/contexts/FinancialReportContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function ReportsDashboard() {
  const t = useTranslations("reportsPage");
  const { 
    timeFilter, setTimeFilter,
    data, setData, 
    chartData, 
    revenueNet, cogsNet, grossProfit, opexNet, netIncome, netIncomeTrendPercentage,
    aiAnalysis,
    handleImportData
  } = useFinancialReport();
  
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const [showSendRequestDropdown, setShowSendRequestDropdown] = useState(false);

  // Dialog states
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [sendType, setSendType] = useState<"bilan" | "tcr">("bilan");
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);

  // Toast state simple implementation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImport = async (type: "bilan" | "tcr", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowImportDropdown(false);
    await handleImportData(type, file);
    showToast(t("importSuccess") || "Fichier importé avec succès");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importType, setImportType] = useState<"bilan" | "tcr">("bilan");

  const triggerImport = (type: "bilan" | "tcr") => {
    setImportType(type);
    fileInputRef.current?.click();
  };

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendDialogOpen(false);
    showToast(t("sendSuccess") || "Demande envoyée avec succès");
  };

  const handleAdjustSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOpex = parseFloat(formData.get("opex") as string);
    const newRevenue = parseFloat(formData.get("revenue") as string);
    
    setData(prev => ({ 
      ...prev, 
      opexGross: !isNaN(newOpex) ? newOpex : prev.opexGross,
      revenueGross: !isNaN(newRevenue) ? newRevenue : prev.revenueGross
    }));
    
    setIsAdjustDialogOpen(false);
  };

  const handleExportExcel = () => {
    const tableData = [
      [t("category"), t("grossAmount"), t("adjustments"), t("netAmount")],
      [t("revenue"), data.revenueGross, data.revenueAdjust, revenueNet],
      [t("cogs"), data.cogsGross, data.cogsAdjust, -cogsNet],
      [t("grossProfit"), "", "", grossProfit],
      [t("opex"), data.opexGross, data.opexAdjust, -opexNet],
      [t("netIncome"), "", "", netIncome]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport");
    XLSX.writeFile(workbook, "Rapport_Financier.xlsx");
    showToast("Export Excel en cours...");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(t("title") || "Rapport Financier", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [[t("category"), t("grossAmount"), t("adjustments"), t("netAmount")]],
      body: [
        [t("revenue"), `${data.revenueGross} DZD`, `${data.revenueAdjust} DZD`, `${revenueNet} DZD`],
        [t("cogs"), `${data.cogsGross} DZD`, `${data.cogsAdjust} DZD`, `-${cogsNet} DZD`],
        [t("grossProfit"), "", "", `${grossProfit} DZD`],
        [t("opex"), `${data.opexGross} DZD`, `${data.opexAdjust} DZD`, `-${opexNet} DZD`],
        [t("netIncome"), "", "", `${netIncome} DZD`],
      ],
    });

    doc.save("Rapport_Financier.pdf");
    showToast("Export PDF en cours...");
  };

  const maxVal = Math.max(...chartData.map(d => d.current), 200000);
  const dynamicPath = chartData.map((d, i) => {
    const x = i * (800 / (chartData.length - 1 || 1));
    const y = 200 - (d.current / maxVal) * 160;
    if (i === 0) return `M0 ${y}`;
    return `T ${x} ${y}`;
  }).join(" ");

  return (
    <div className="space-y-8 relative">
      {/* Toast Overlay */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => handleImport(importType, e)} 
        className="hidden" 
        accept=".xlsx,.xls,.csv" 
      />

      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">{t("title")}</h2>
          <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-3 relative">
          <div className="relative">
            <button 
              onClick={() => setShowImportDropdown(!showImportDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
              <Upload className="w-4 h-4" />
              {t("btnImport")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showImportDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showImportDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowImportDropdown(false)} />
                <div className="absolute left-0 mt-2 w-48 bg-white border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => triggerImport("bilan")}
                    className="w-full text-start px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-secondary" />
                    {t("btnImportBilan")}
                  </button>
                  <button 
                    onClick={() => triggerImport("tcr")}
                    className="w-full text-start px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors border-t border-outline-variant/20 cursor-pointer flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-tertiary" />
                    {t("btnImportTcr")}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowSendRequestDropdown(!showSendRequestDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
              <Send className="w-4 h-4" />
              {t("btnSendRequest")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSendRequestDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showSendRequestDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSendRequestDropdown(false)} />
                <div className="absolute left-0 mt-2 w-48 bg-white border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => { setShowSendRequestDropdown(false); setSendType("bilan"); setIsSendDialogOpen(true); }}
                    className="w-full text-start px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-2">
                    <Send className="w-4 h-4 text-secondary" />
                    {t("sendRequestBilan")}
                  </button>
                  <button 
                    onClick={() => { setShowSendRequestDropdown(false); setSendType("tcr"); setIsSendDialogOpen(true); }}
                    className="w-full text-start px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors border-t border-outline-variant/20 cursor-pointer flex items-center gap-2">
                    <Send className="w-4 h-4 text-tertiary" />
                    {t("sendRequestTcr")}
                  </button>
                </div>
              </>
            )}
          </div>

          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            {t("exportPdf")}
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white/50 font-medium text-on-surface-variant hover:bg-white hover:text-primary transition-all cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" />
            {t("exportExcel")}
          </button>
          <button onClick={() => showToast("Lien copié dans le presse-papiers")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
            <Share2 className="w-4 h-4" />
            {t("share")}
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Chart Card (8 cols) */}
        <div className="col-span-12 lg:col-span-8 glass-card beveled-edge rounded-3xl p-8 relative overflow-hidden bg-white/70 min-h-[380px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-title-md text-lg font-bold text-on-surface">Évolution du Résultat Net</h3>
              <p className="text-xs text-on-surface-variant">{t("monthlyOverview")}</p>
            </div>
            <div className="flex gap-4 text-xs font-bold text-on-surface-variant">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTimeFilter("1M")}>
                <span className={`w-3 h-3 rounded-full ${timeFilter === "1M" ? 'bg-primary' : 'bg-outline'}`}></span>
                <span>1M</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setTimeFilter("3M")}>
                <span className={`w-3 h-3 rounded-full ${timeFilter === "3M" ? 'bg-primary' : 'bg-outline'}`}></span>
                <span>3M</span>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="0" y2="0"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
              <line stroke="#727687" strokeOpacity="0.1" strokeWidth="1" x1="0" x2="800" y1="200" y2="200"></line>
              
              <path
                d={`${dynamicPath} L 800 200 L 0 200 Z`}
                fill="url(#chartGradient)"
              ></path>
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 80, 203, 0.15)"></stop>
                  <stop offset="100%" stopColor="rgba(0, 80, 203, 0)"></stop>
                </linearGradient>
              </defs>
              <path
                d={dynamicPath}
                fill="none"
                stroke="#0050cb"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
              <circle cx="800" cy={200 - (chartData[chartData.length-1].current / maxVal) * 160} fill="#0050cb" r="6"></circle>
              <circle cx="800" cy={200 - (chartData[chartData.length-1].current / maxVal) * 160} fill="#0050cb" fillOpacity="0.2" r="12"></circle>
            </svg>
            <div className="flex justify-between mt-4 text-xs font-bold text-on-surface-variant">
              {chartData.map((d, i) => (
                <span key={i}>{d.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Financial Analysis Card (4 cols) */}
        <div className="col-span-12 lg:col-span-4 glass-card beveled-edge rounded-3xl p-8 bg-primary/5 flex flex-col max-h-[600px]">
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-title-md text-lg font-bold text-on-surface">AI Financial Engine</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {/* Risk & Summary */}
            <div className="p-4 rounded-xl bg-white/50 border border-white/40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-on-surface-variant">RISK LEVEL</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  aiAnalysis.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                  aiAnalysis.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{aiAnalysis.riskLevel.toUpperCase()}</span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="p-3 bg-white/30 rounded-lg border-l-4 border-l-primary">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">FRNG</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${aiAnalysis.frng.status === 'healthy' ? 'bg-green-100 text-green-700' : aiAnalysis.frng.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{aiAnalysis.frng.status}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{aiAnalysis.frng.analysis}</p>
              </div>

              <div className="p-3 bg-white/30 rounded-lg border-l-4 border-l-tertiary">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">BFR</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${aiAnalysis.bfr.status === 'healthy' ? 'bg-green-100 text-green-700' : aiAnalysis.bfr.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{aiAnalysis.bfr.status}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{aiAnalysis.bfr.analysis}</p>
              </div>

              <div className="p-3 bg-white/30 rounded-lg border-l-4 border-l-secondary">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">Trésorerie</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${aiAnalysis.tresorerie.status === 'healthy' ? 'bg-green-100 text-green-700' : aiAnalysis.tresorerie.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{aiAnalysis.tresorerie.status}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{aiAnalysis.tresorerie.analysis}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant mb-3 uppercase">Recommandations</h4>
              <div className="space-y-3">
                {aiAnalysis.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 bg-white/50 rounded-lg border border-white/40">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-bold text-on-surface">{rec.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.priority === 'Critical' ? 'bg-red-100 text-red-700' : rec.priority === 'High' ? 'bg-orange-100 text-orange-700' : rec.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>P: {rec.priority}</span>
                    </div>
                    <p className="text-xs text-primary mb-1">{rec.impact}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/40 rounded-2xl border border-white/40 flex-shrink-0">
            <p className="text-xs font-bold text-on-surface-variant mb-2">{t("quickAction")}</p>
            <button
              onClick={() => setIsAdjustDialogOpen(true)}
              className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg border border-primary/20 hover:shadow-md transition-all cursor-pointer"
            >
              {t("adjustBudgetPlan")}
            </button>
          </div>
        </div>

        {/* Financial Table (12 cols) */}
        <div className="col-span-12 glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
          <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/40">
            <h3 className="font-title-md text-lg font-bold text-on-surface">{t("statementDetails")}</h3>
            <div className="flex gap-4">
              <Filter className="w-5 h-5 text-outline cursor-pointer hover:text-primary" />
              <MoreVertical className="w-5 h-5 text-outline cursor-pointer hover:text-primary" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant">{t("category")}</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-end">{t("grossAmount")}</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-end">{t("adjustments")}</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-end">{t("netAmount")}</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant text-end">{t("trend")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 font-bold text-on-surface">{t("revenue")}</td>
                  <td className="px-8 py-5 font-mono-data text-end">{data.revenueGross.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 font-mono-data text-end">({Math.abs(data.revenueAdjust).toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD)</td>
                  <td className="px-8 py-5 font-mono-data font-bold text-end text-primary">{revenueNet.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 text-end"><span className="text-tertiary font-bold">{data.revenueTrend}</span></td>
                </tr>
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 text-on-surface">{t("cogs")}</td>
                  <td className="px-8 py-5 font-mono-data text-end">{data.cogsGross.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 font-mono-data text-end">{data.cogsAdjust.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 font-mono-data text-end text-error">({cogsNet.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD)</td>
                  <td className="px-8 py-5 text-end"><span className="text-error font-bold">{data.cogsTrend}</span></td>
                </tr>
                <tr className="bg-[#eff4ff]/40">
                  <td className="px-8 py-5 font-bold text-on-surface">{t("grossProfit")}</td>
                  <td className="px-8 py-5 font-mono-data text-end">--</td>
                  <td className="px-8 py-5 font-mono-data text-end">--</td>
                  <td className="px-8 py-5 font-mono-data font-black text-end">{grossProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 text-end"><span className="text-tertiary font-bold">↑ 11%</span></td>
                </tr>
                <tr className="hover:bg-white/20 transition-colors">
                  <td className="px-8 py-5 text-on-surface">{t("opex")}</td>
                  <td className="px-8 py-5 font-mono-data text-end">{data.opexGross.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-5 font-mono-data text-end">({Math.abs(data.opexAdjust).toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD)</td>
                  <td className="px-8 py-5 font-mono-data text-end text-error">({opexNet.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD)</td>
                  <td className="px-8 py-5 text-end"><span className="text-tertiary font-bold">{data.opexTrend}</span></td>
                </tr>
                <tr className="bg-primary/10 border-t-2 border-primary/30">
                  <td className="px-8 py-6 font-black text-primary">{t("netIncome")}</td>
                  <td className="px-8 py-6 font-mono-data text-end">--</td>
                  <td className="px-8 py-6 font-mono-data text-end">--</td>
                  <td className="px-8 py-6 font-mono-data font-black text-2xl text-end text-primary">{netIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })} DZD</td>
                  <td className="px-8 py-6 text-end">
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full font-bold">↑ {netIncomeTrendPercentage}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Send Request Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("sendRequestDialogTitle")} {sendType === "bilan" ? t("sendRequestBilan") : t("sendRequestTcr")}</DialogTitle>
            <DialogDescription>{t("sendRequestDialogDesc")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendSubmit} className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t("client")}</label>
              <input required type="text" className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={t("clientPlaceholder")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("email")}</label>
              <input required type="email" className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="client@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("message")}</label>
              <textarea required className="w-full border rounded-lg px-3 py-2 text-sm" rows={3} placeholder={t("messagePlaceholder")} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setIsSendDialogOpen(false)} className="px-4 py-2 border rounded-lg text-sm font-medium">{t("cancel")}</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">{t("sendRequestBtn")}</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Adjust Budget Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("adjustBudgetPlan")}</DialogTitle>
            <DialogDescription>{t("adjustBudgetDesc")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdjustSubmit} className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">OPEX Budget (Gross)</label>
              <input name="opex" type="number" step="0.01" defaultValue={data.opexGross} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Revenue Target</label>
              <input name="revenue" type="number" step="0.01" defaultValue={data.revenueGross} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Growth %</label>
              <input name="growth" type="number" step="0.1" defaultValue={12.4} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setIsAdjustDialogOpen(false)} className="px-4 py-2 border rounded-lg text-sm font-medium">{t("cancel")}</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">{t("apply")}</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ReportsPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FinancialReportProvider>
        <ReportsDashboard />
      </FinancialReportProvider>
    </QueryClientProvider>
  );
}
