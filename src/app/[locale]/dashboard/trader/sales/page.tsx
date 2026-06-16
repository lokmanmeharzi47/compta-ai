"use client";

import React, { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  PlusCircle,
  Banknote,
  Gauge,
  TrendingUp,
  Hourglass,
  Sparkles,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  CreditCard,
  Wallet,
  Building
} from "lucide-react";

// Canonical (stable) values are used for logic; labels are translated for display.
const STATUS_SLUG: Record<string, string> = {
  "Completed": "completed",
  "In Progress": "inProgress",
  "Cancelled": "cancelled",
};
const PAYMENT_SLUG: Record<string, string> = {
  "Cash": "cash",
  "Bank Transfer": "bankTransfer",
  "Credit Card": "creditCard",
  "CCP Payment": "ccp",
  "BaridiMob": "baridiMob",
  "Custom": "custom",
};

export default function SalesPage() {
  const t = useTranslations("sales");
  const locale = useLocale();

  const [salesList, setSalesList] = useState([
    { id: "1", name: "Jordan Smith", initials: "JS", color: "text-primary bg-primary/10", date: "2023-10-24", service: "Enterprise License", amount: "18,400.00 DZD", status: "Completed", paymentMethod: "Bank Transfer" },
    { id: "2", name: "Apex Corp", initials: "AC", color: "text-secondary bg-secondary/10", date: "2023-10-23", service: "Custom API Integration", amount: "12,000.00 DZD", status: "In Progress", paymentMethod: "Credit Card" },
    { id: "3", name: "Lumina Media", initials: "LM", color: "text-primary bg-primary/10", date: "2023-10-22", service: "Professional Tier", amount: "4,500.00 DZD", status: "Completed", paymentMethod: "CCP Payment" },
    { id: "4", name: "Tech Hub", initials: "TH", color: "text-error bg-error/10", date: "2023-10-21", service: "Consultation Service", amount: "2,800.00 DZD", status: "Cancelled", paymentMethod: "Cash" },
  ]);

  // Search and Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");

  // Modal & Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    service: "",
    status: "Completed",
    paymentMethod: "Bank Transfer"
  });

  const paymentMethods = ["Cash", "Bank Transfer", "Credit Card", "CCP Payment", "BaridiMob", "Custom"];
  const statuses = ["Completed", "In Progress", "Cancelled"];
  const chartMonths = t.raw("chartMonths") as string[];

  const statusLabel = (s: string) => t(`statuses.${STATUS_SLUG[s] ?? "completed"}`);
  const paymentLabel = (m: string) => t(`payments.${PAYMENT_SLUG[m] ?? "custom"}`);
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "ar" ? "ar-DZ" : "fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));

  // Computed filtered list
  const filteredSales = useMemo(() => {
    return salesList.filter(sale => {
      const matchesSearch = sale.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sale.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || sale.status === filterStatus;
      const matchesPayment = filterPayment === "All" || sale.paymentMethod === filterPayment;
      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [salesList, searchQuery, filterStatus, filterPayment]);

  const openModal = (sale?: typeof salesList[number]) => {
    if (sale) {
      setEditingId(sale.id);
      setFormData({
        name: sale.name,
        amount: sale.amount.replace(" DZD", ""),
        service: sale.service,
        status: sale.status,
        paymentMethod: sale.paymentMethod || "Bank Transfer"
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        amount: "",
        service: "",
        status: "Completed",
        paymentMethod: "Bank Transfer"
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.service) return;

    const initials = formData.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "US";
    const amountFormatted = formData.amount.endsWith("DZD") ? formData.amount : `${formData.amount} DZD`;

    if (editingId) {
      setSalesList(salesList.map(sale =>
        sale.id === editingId
          ? { ...sale, ...formData, initials, amount: amountFormatted }
          : sale
      ));
    } else {
      const newSale = {
        id: Date.now().toString(),
        name: formData.name,
        initials,
        color: "text-primary bg-primary/10",
        date: new Date().toISOString().slice(0, 10),
        service: formData.service,
        amount: amountFormatted,
        status: formData.status,
        paymentMethod: formData.paymentMethod
      };
      setSalesList([newSale, ...salesList]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm(t("confirmDelete"))) {
      setSalesList(salesList.filter(s => s.id !== id));
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Cash": return <Banknote className="w-4 h-4" />;
      case "Bank Transfer": return <Building className="w-4 h-4" />;
      case "Credit Card": return <CreditCard className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
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
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          {t("createNewSale")}
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
          <p className="text-body-sm text-on-surface-variant font-medium">{t("totalSales")}</p>
          <p className="text-3xl font-bold text-on-surface">450,200 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Gauge className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">{t("avgDealSize")}</p>
          <p className="text-3xl font-bold text-on-surface">12,500 DZD</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">{t("salesGrowth")}</p>
          <p className="text-3xl font-bold text-tertiary">+15%</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-outline-variant/20 flex items-center justify-center text-on-surface">
              <Hourglass className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">{t("pendingDeals")}</p>
          <p className="text-3xl font-bold text-on-surface">24</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-card beveled-edge p-8 rounded-3xl min-h-[380px] flex flex-col justify-between bg-white/70">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-title-md text-lg font-bold text-on-surface">{t("monthlyPerformance")}</h3>
            <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer outline-none">
              <option>{t("last6Months")}</option>
              <option>{t("yearToDate")}</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {chartMonths.map((month, idx) => {
               const heights = ['40%', '65%', '55%', '85%', '75%', '95%'];
               return (
                <div key={idx} className="flex flex-col items-center gap-4 flex-1">
                  <div className="w-full bg-primary/10 rounded-t-xl relative group h-48">
                    <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-500 group-hover:h-full" style={{ height: heights[idx] }} ></div>
                  </div>
                  <span className="text-xs font-bold text-outline">{month}</span>
                </div>
               )
            })}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-card beveled-edge p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white/70">
          <div className="absolute top-0 end-0 w-32 h-32 bg-primary/5 rounded-full -me-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-primary w-5 h-5" />
            <h3 className="font-title-md text-lg font-bold text-on-surface">{t("aiInsightTitle")}</h3>
          </div>
          <div className="flex-1">
            <p className="text-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              {t.rich("aiInsightText", {
                b: (chunks) => <span className="font-bold text-on-surface">{chunks}</span>,
                g: (chunks) => <span className="text-tertiary font-bold">{chunks}</span>,
              })}
            </p>
            <div className="p-4 bg-white/40 rounded-2xl border border-white/40 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">{t("opportunityScore")}</span>
                <span className="text-sm font-bold text-primary">94/100</span>
              </div>
              <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-colors cursor-pointer">
            {t("applyStrategy")}
          </button>
        </div>
      </div>

      {/* Advanced Search & Filtering + Table */}
      <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
        <div className="px-8 py-6 border-b border-outline-variant/30 bg-white/40 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <h3 className="font-title-md text-lg font-bold text-on-surface">{t("recentSales")}</h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full ps-9 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="ps-8 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">{t("allStatuses")}</option>
                  {statuses.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
                </select>
                <Filter className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className="ps-8 pe-4 py-2 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                >
                  <option value="All">{t("allPayments")}</option>
                  {paymentMethods.map(m => <option key={m} value={m}>{paymentLabel(m)}</option>)}
                </select>
                <Wallet className="w-4 h-4 absolute start-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thCustomer")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thDate")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thService")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thAmount")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-center">{t("thStatus")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-start">{t("thPayment")}</th>
                <th className="px-8 py-4 text-xs font-bold text-outline uppercase tracking-wider text-end">{t("thActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-8 text-center text-on-surface-variant">
                    {t("noRecords")}
                  </td>
                </tr>
              )}
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${sale.color}`}>
                        {sale.initials}
                      </div>
                      <span className="font-body-md font-bold text-sm text-on-surface">{sale.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-on-surface-variant text-sm">{formatDate(sale.date)}</td>
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
                      {statusLabel(sale.status)}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      {getPaymentIcon(sale.paymentMethod)}
                      <span>{paymentLabel(sale.paymentMethod)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-end">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(sale)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(sale.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-lg glass-card beveled-edge p-8 rounded-3xl bg-white shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-lg text-2xl font-bold text-on-surface">
                {editingId ? t("modalEditTitle") : t("modalCreateTitle")}
              </h3>
              <button onClick={closeModal} className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">{t("fName")}</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder={t("fNamePlaceholder")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">{t("fAmount")}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    placeholder={t("fAmountPlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">{t("fStatus")}</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    {statuses.map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">{t("fService")}</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                  placeholder={t("fServicePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">{t("fPayment")}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                  value={formData.paymentMethod}
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                >
                  {paymentMethods.map(m => <option key={m} value={m}>{paymentLabel(m)}</option>)}
                </select>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer">
                  {t("cancel")}
                </button>
                <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer">
                  {editingId ? t("saveChanges") : t("createSale")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
