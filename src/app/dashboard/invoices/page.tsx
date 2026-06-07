"use client";

import React, { useState } from "react";
import {
  Plus,
  Wallet,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Download,
  Printer,
  Share2,
  Building
} from "lucide-react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([
    { id: "INV-2024-001", client: "Nexus Systems", initials: "NS", clientColor: "text-primary bg-primary/10", date: "Oct 12, 2024", amount: "12,000.00 DZD", status: "Paid" },
    { id: "INV-2024-002", client: "Acme Corp", initials: "A", clientColor: "text-secondary bg-secondary/10", date: "Oct 14, 2024", amount: "8,450.00 DZD", status: "Sent" },
    { id: "INV-2024-003", client: "Vortex Media", initials: "V", clientColor: "text-error bg-error/10", date: "Oct 05, 2024", amount: "2,100.00 DZD", status: "Overdue" },
    { id: "INV-2024-004", client: "Digital Labs", initials: "DL", clientColor: "text-on-surface-variant bg-slate-100", date: "Oct 16, 2024", amount: "15,700.00 DZD", status: "Draft" },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(invoices[1]);

  const handleAddInvoice = () => {
    const clientName = prompt("Enter client name:");
    if (!clientName) return;
    const amountVal = prompt("Enter amount (e.g. 5,500.00 DZD):");
    if (!amountVal) return;

    const initials = clientName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const invoiceNum = `INV-2024-00${invoices.length + 1}`;

    const newInvoice = {
      id: invoiceNum,
      client: clientName,
      initials: initials || "CL",
      clientColor: "text-primary bg-primary/10",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount: amountVal.endsWith("DZD") ? amountVal : `${amountVal} DZD`,
      status: "Sent" as const
    };

    setInvoices([newInvoice, ...invoices]);
    setSelectedInvoice(newInvoice);
  };

  return (
    <div className="space-y-8">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Invoice Management</h2>
          <p className="text-body-md text-on-surface-variant">Streamline your billing and track receivables in real-time.</p>
        </div>
        <button
          onClick={handleAddInvoice}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Create New Invoice
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-on-surface-variant font-mono-data text-xs font-bold">+12.5%</span>
          </div>
          <p className="text-sm text-on-surface-variant font-medium">Total Outstanding</p>
          <h3 className="text-3xl font-bold text-on-surface">142,384.50 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-100 text-error rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-error font-mono-data text-xs font-bold">Urgent</span>
          </div>
          <p className="text-sm text-on-surface-variant font-medium">Overdue</p>
          <h3 className="text-3xl font-bold text-on-surface">12,490.00 DZD</h3>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-tertiary font-mono-data text-xs font-bold">Target Met</span>
          </div>
          <p className="text-sm text-on-surface-variant font-medium">Paid this Month</p>
          <h3 className="text-3xl font-bold text-on-surface">45,200.00 DZD</h3>
        </div>
      </div>

      {/* Main Content Splitted */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Invoice Table Container */}
        <div className="flex-1 w-full glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/40">
            <h4 className="font-bold text-lg text-on-surface">Recent Invoices</h4>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-outline-variant/40 rounded-lg text-xs font-bold hover:bg-white/50 transition-colors text-on-surface cursor-pointer">
                Filters
              </button>
              <button className="px-4 py-2 border border-outline-variant/40 rounded-lg text-xs font-bold hover:bg-white/50 transition-colors text-on-surface cursor-pointer">
                Export CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Issue Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {invoices.map((invoice, idx) => {
                  const isSelected = selectedInvoice.id === invoice.id;
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedInvoice(invoice)}
                      className={`transition-colors cursor-pointer group ${
                        isSelected
                          ? "bg-primary/5 border-l-4 border-primary"
                          : "hover:bg-primary/5"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono-data text-primary text-sm font-bold">{invoice.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${invoice.clientColor}`}>
                            {invoice.initials}
                          </div>
                          <span className="font-bold text-sm text-on-surface">{invoice.client}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{invoice.date}</td>
                      <td className="px-6 py-4 font-bold text-sm text-on-surface">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            invoice.status === "Paid"
                              ? "bg-tertiary/10 text-tertiary"
                              : invoice.status === "Sent"
                              ? "bg-primary/10 text-primary"
                              : invoice.status === "Overdue"
                              ? "bg-error/10 text-error"
                              : "bg-outline/10 text-on-surface-variant"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-outline-variant/30 bg-white/30 flex justify-center">
            <button className="text-sm font-bold text-primary hover:underline cursor-pointer">
              View All Invoices
            </button>
          </div>
        </div>

        {/* Invoice Preview Panel */}
        <div className="w-full xl:w-[400px]">
          <div className="glass-card beveled-edge rounded-3xl sticky top-24 overflow-hidden border border-primary/10 shadow-2xl bg-white">
            <div className="p-6 border-b border-outline-variant/30 bg-[#eff4ff]/60 flex justify-between items-center">
              <span className="font-bold text-on-surface text-sm">Preview</span>
              <div className="flex gap-2 text-on-surface-variant">
                <button className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-8 bg-white min-h-[500px] flex flex-col justify-between">
              {/* Invoice Layout */}
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4 shadow-md shadow-primary/20">
                      <Building className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-on-surface text-sm">COMPTA AI</h5>
                    <p className="text-[10px] text-on-surface-variant leading-tight">
                      123 Financial District
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-3xl font-bold text-on-surface">{selectedInvoice.amount}</h4>
                    <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-[8px] font-black rounded uppercase tracking-wider">
                      Due Nov 14, 2024
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="font-bold text-[9px] text-on-surface-variant tracking-wider uppercase mb-2">BILL TO</p>
                    <p className="font-bold text-on-surface text-sm">{selectedInvoice.client}</p>
                    <p className="text-[10px] text-on-surface-variant leading-tight">
                      Attn: Billing Dept
                      <br />
                      456 Enterprise Way
                      <br />
                      Mountain View, CA 94043
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[9px] text-on-surface-variant tracking-wider uppercase mb-2">
                      INVOICE DETAILS
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      Number: <span className="text-on-surface font-bold">{selectedInvoice.id}</span>
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      Issued: <span className="text-on-surface font-bold">{selectedInvoice.date}</span>
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      Terms: <span className="text-on-surface font-bold">Net 30</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-4">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="text-on-surface-variant font-bold border-b border-outline-variant/20">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                      <tr>
                        <td className="py-3 font-medium text-on-surface">Cloud Infrastructure - Q4 Subscription</td>
                        <td className="text-right py-3">1</td>
                        <td className="text-right py-3">{selectedInvoice.amount}</td>
                        <td className="text-right py-3">{selectedInvoice.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-outline-variant/30 pt-6 mt-8 flex justify-between items-center text-xs">
                <span className="font-bold text-on-surface">Total Amount</span>
                <span className="text-lg font-bold text-primary">{selectedInvoice.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
