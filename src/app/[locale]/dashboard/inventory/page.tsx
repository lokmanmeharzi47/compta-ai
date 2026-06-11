"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Grid,
  List,
  Plus,
  Wallet,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Truck,
  Clock,
  Package,
  Edit2,
  MoreVertical,
  Lightbulb
} from "lucide-react";

export default function InventoryPage() {
  const t = useTranslations("inventoryPage");
  const [items, setItems] = useState([
    {
      name: "Nexus Core V1",
      sku: "NX-4092-B",
      price: "499.00 DZD",
      qty: 1240,
      status: "IN STOCK",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtXibl3c7wDNsx-JMqBejq3_h-A67v0S3ue3QYtcGk4BAOGzMloHnYStsY4txKiTeRLeL8qv5Sgrt9kFQlKld6xOnJPqYjlCkAXzFVb_NITMH0d9OoVBCM-Ztp6WLXLCbGi8knXfsVB2QI3OEptuxqKZuFVjZ3Sbq7Y_3I5EJZ91x-3lKlIraMHTFp2Y1kjAD8-p_6NsXM0imBTe_ltkXl0-PWxcSj8Um_Xowt7eV6zgwIwV4Wm2CQkAi34Dcq60xPGei-lTAJzy1i",
    },
    {
      name: "Aura Studio Pods",
      sku: "AU-8812-S",
      price: "299.00 DZD",
      qty: 12,
      status: "LOW STOCK",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIKb7b_2i88ffYVVXULE_T1ncyZdyPDrfcxGPHxFC17aC-6QSQphGfr72L3B1fuDTf8XQQjeS1nGRKMtvXMhHAu-qg4QsnFGRfnqxg8tbgNRlVxGO8al4fzsZBw122T7ucq39J3X-W9wOvhIZxd71ZebSd2Vu6zqV5Sf26W6HwO54479KqrmajG-Gx0cbZpZKOZ1pHmKidvPlLSL6XaEO1JPxw6Ar0bgXqvuDwIYiYdsztIjefsSYwHbZviNFDSMlyBzyppaISHL0h",
    },
    {
      name: "Chronos Elite",
      sku: "CH-0012-G",
      price: "1,250.00 DZD",
      qty: 45,
      status: "IN STOCK",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmCDI9OP7btR8Y7fk_7mHpT7yFdHirUBUrzGW_fc6HL5obIqD6hoZkAB_cXwe5BP-aUkZQl9SnJHKepwZD_Dk9fwyzbDvN6H_HhZkOE7Gj97N4OygIMd7rCK3GvXa6evZ0jLccKoogfA4Rxu8Yi6iAhts2AnvxjRPGkl_cmPcjQ7CtItmVWeUVLT-P-gfnIEzBKSiBjskBTAQXWjYFK6DBpkhAk-8z3wGnyle9BJqP6xolRlwX3ljbFCJiJJhregQWUVA1PUh8mU2_",
    },
    {
      name: "Vision Pro Cam",
      sku: "VI-5521-X",
      price: "899.00 DZD",
      qty: 310,
      status: "IN STOCK",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP1gUgoDzwA5LrBS3VXU1AQbCpP_-N61zxyQ7uBOloImSCvfl4j218RIRnJAdrwnEmmD32wLRfg3MUIoP5NKiyauG7V0dA22w7qlZ7w4_IBr4-3KNC-Oym97E8K1iyyLamzjYxPXF4fN64Tekn_27WtNJ2aWpLoePnoXx1_1DtYSIVm1TCQOC51sk52qIgVQSfcMXX-VfYhcrqaWVqKFQ1u1sIazHeMODghLZlPWBbhGNsBmY0hlSzdNjb0jt9rxvshOfuP7ulWum",
    },
  ]);

  const [isGridView, setIsGridView] = useState(true);

  const handleEditQty = (index: number) => {
    const newQtyStr = prompt(`Enter new quantity for ${items[index].name}:`, String(items[index].qty));
    if (newQtyStr === null) return;
    const newQty = parseInt(newQtyStr, 10);
    if (isNaN(newQty)) return;

    const updated = [...items];
    updated[index].qty = newQty;
    updated[index].status = newQty <= 15 ? "LOW STOCK" : "IN STOCK";
    setItems(updated);
  };

  const handleReorderLowStock = () => {
    const updated = items.map((item) => {
      if (item.status === "LOW STOCK") {
        return { ...item, qty: item.qty + 100, status: "IN STOCK" as const };
      }
      return item;
    });
    setItems(updated);
    alert("Low stock items reordered successfully! Quantity increased by 100 for all low stock items.");
  };

  const handleAddNewItem = () => {
    const name = prompt("Enter product name:");
    if (!name) return;
    const price = prompt("Enter price (e.g. 499.00 DZD):");
    if (!price) return;
    const qtyStr = prompt("Enter quantity:");
    if (!qtyStr) return;
    const qty = parseInt(qtyStr, 10) || 0;

    const newItem = {
      name,
      sku: `NX-${Math.floor(1000 + Math.random() * 9000)}-B`,
      price: price.endsWith("DZD") ? price : `${price} DZD`,
      qty,
      status: qty <= 15 ? ("LOW STOCK" as const) : ("IN STOCK" as const),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP1gUgoDzwA5LrBS3VXU1AQbCpP_-N61zxyQ7uBOloImSCvfl4j218RIRnJAdrwnEmmD32wLRfg3MUIoP5NKiyauG7V0dA22w7qlZ7w4_IBr4-3KNC-Oym97E8K1iyyLamzjYxPXF4fN64Tekn_27WtNJ2aWpLoePnoXx1_1DtYSIVm1TCQOC51sk52qIgVQSfcMXX-VfYhcrqaWVqKFQ1u1sIazHeMODghLZlPWBbhGNsBmY0hlSzdNjb0jt9rxvshOfuP7ulWum",
    };

    setItems([...items, newItem]);
  };

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">{t("title")}</h2>
          <p className="text-body-md text-on-surface-variant">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/40 p-1 rounded-xl border border-outline-variant/30">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isGridView ? "bg-white text-primary shadow-sm" : "text-outline hover:text-primary"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                !isGridView ? "bg-white text-primary shadow-sm" : "text-outline hover:text-primary"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleAddNewItem}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:scale-102 transition-all cursor-pointer shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" /> {t("addProduct")}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-3xl relative overflow-hidden bg-white/70">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase font-bold text-on-surface-variant tracking-wider mb-1">
                {t("totalStockValue")}
              </p>
              <h3 className="text-3xl font-bold text-on-surface">1,245,800.00 DZD</h3>
            </div>
            <span className="p-2 bg-green-100 text-green-700 rounded-lg">
              <Wallet className="w-6 h-6" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-green-700 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>4.2% increase from last month</span>
          </div>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl relative overflow-hidden bg-white/70">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase font-bold text-on-surface-variant tracking-wider mb-1">
                {t("lowStockItems")}
              </p>
              <h3 className="text-3xl font-bold text-on-surface">
                {items.filter((item) => item.status === "LOW STOCK").length} Items
              </h3>
            </div>
            <span className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-amber-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>{t("requiresAttention")}</span>
          </div>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-3xl relative overflow-hidden bg-white/70">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase font-bold text-on-surface-variant tracking-wider mb-1">
                {t("incomingShipments")}
              </p>
              <h3 className="text-3xl font-bold text-on-surface">8 Pending</h3>
            </div>
            <span className="p-2 bg-primary/10 text-primary rounded-lg">
              <Truck className="w-6 h-6" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-primary text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>{t("nextArrival")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Grid and Low Stock Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Low Stock Alert Section */}
          {items.some((item) => item.status === "LOW STOCK") && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between backdrop-blur-sm gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 text-white">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-on-background">{t("lowStockAlert")}</h4>
                  <p className="text-sm text-on-surface-variant">
                    {t("lowStockDesc")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReorderLowStock}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
              >
                {t("reorderNow")}
              </button>
            </div>
          )}

          {/* Products Bento Grid or List View */}
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`glass-card beveled-edge p-4 rounded-3xl hover:border-primary/40 transition-all group relative bg-white/40 ${
                    item.status === "LOW STOCK" ? "border-amber-500/20" : ""
                  }`}
                >
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={item.name} className="w-full h-full object-cover" src={item.img} />
                    <div
                      className={`absolute top-2 end-2 px-2 py-1 rounded-lg text-[9px] font-black tracking-widest ${
                        item.status === "LOW STOCK" ? "bg-amber-500 text-white" : "bg-green-600 text-white"
                      }`}
                    >
                      {item.status === "LOW STOCK" ? t("statusLowStock") : t("statusInStock")}
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-bold text-base text-on-surface">{item.name}</h5>
                        <p className="font-mono-data text-xs text-outline font-bold">{t("sku")}: {item.sku}</p>
                      </div>
                      <span className="font-bold text-base text-primary">{item.price}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">{t("quantity")}</span>
                        <span
                          className={`font-mono-data text-sm font-bold ${
                            item.status === "LOW STOCK" ? "text-amber-500" : "text-on-surface"
                          }`}
                        >
                          {item.qty} {t("units")}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEditQty(idx)}
                        className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
              <table className="w-full text-start">
                <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{t("product")}</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{t("sku")}</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{t("price")}</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{t("quantity")}</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{t("status")}</th>
                    <th className="px-6 py-4 text-end"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-on-surface">{item.name}</td>
                      <td className="px-6 py-4 text-on-surface-variant font-mono-data">{item.sku}</td>
                      <td className="px-6 py-4 text-primary font-bold">{item.price}</td>
                      <td className="px-6 py-4 font-mono-data text-on-surface font-bold">{item.qty}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            item.status === "LOW STOCK" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-end">
                        <button
                          onClick={() => handleEditQty(idx)}
                          className="text-primary hover:text-primary-dark font-bold text-xs underline cursor-pointer"
                        >
                          {t("edit")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Analytics Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* {t("inventoryTurnover")} Chart */}
          <div className="glass-card beveled-edge p-6 rounded-3xl h-full flex flex-col justify-between bg-white/70">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-on-background">Inventory Turnover</h4>
                <MoreVertical className="text-outline cursor-pointer w-5 h-5" />
              </div>
              <p className="text-xs text-on-surface-variant mb-6">
                {t("turnoverDesc")}
              </p>
              {/* Custom Chart Visualization */}
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">Nexus Core V1</span>
                    <span className="font-mono-data font-bold text-primary">8.4x</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">Chronos Elite</span>
                    <span className="font-mono-data font-bold text-primary">6.2x</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "62%" }}></div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">Vision Pro Cam</span>
                    <span className="font-mono-data font-bold text-primary">5.1x</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "51%" }}></div>
                  </div>
                </div>
                {/* Item 4 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">Aura Studio Pods</span>
                    <span className="font-mono-data font-bold text-primary">4.8x</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
                {/* Item 5 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">Zenith Drone</span>
                    <span className="font-mono-data font-bold text-primary">3.9x</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "39%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
              <Lightbulb className="text-primary w-5 h-5 shrink-0" />
              <p className="text-xs text-on-surface-variant leading-tight">
                {t("aiSuggestion")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleAddNewItem}
        className="fixed bottom-8 end-8 h-14 w-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
