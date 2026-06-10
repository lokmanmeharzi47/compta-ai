"use client";

import React, { useState } from "react";
import {
  Users,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  Check,
  X,
  Mail,
  MoreVertical,
  Key
} from "lucide-react";

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: "U1", name: "Alex Sterling", email: "alex@compta.ai", role: "Admin", status: "Active", lastLogin: "2 mins ago" },
    { id: "U2", name: "Ahmed Benali", email: "ahmed.b@merchant.com", role: "Trader", status: "Active", lastLogin: "1 hour ago" },
    { id: "U3", name: "Sarah Expert", email: "sarah@expert-comptable.dz", role: "Accountant", status: "Active", lastLogin: "5 hours ago" },
    { id: "U4", name: "Karim Logistics", email: "karim@logistics.dz", role: "Trader", status: "Inactive", lastLogin: "2 days ago" },
  ];

  const permissions = [
    { feature: "Sales & Expenses Management", trader: true, accountant: "read", admin: true },
    { feature: "Inventory & Invoices", trader: true, accountant: "read", admin: true },
    { feature: "Financial Reports", trader: true, accountant: true, admin: true },
    { feature: "Declaration Review & Approval", trader: false, accountant: true, admin: true },
    { feature: "User & Role Management", trader: false, accountant: false, admin: true },
    { feature: "System Settings", trader: false, accountant: false, admin: true },
  ];

  const renderPermission = (val: boolean | string) => {
    if (val === true) return <Check className="w-5 h-5 text-tertiary mx-auto" />;
    if (val === false) return <X className="w-5 h-5 text-error mx-auto opacity-50" />;
    if (val === "read") return <Search className="w-5 h-5 text-primary mx-auto" />;
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">User Management</h2>
          <p className="text-body-md text-on-surface-variant">Role-Based Access Control (RBAC) and system permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container transition-all cursor-pointer">
          <UserPlus className="w-5 h-5" />
          Invite User
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded-lg">All Active</span>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Total Users</p>
          <p className="text-3xl font-bold text-on-surface">1,248</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Active Traders</p>
          <p className="text-3xl font-bold text-on-surface">1,102</p>
        </div>

        <div className="glass-card beveled-edge p-6 rounded-2xl bg-white/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant font-medium">Certified Accountants</p>
          <p className="text-3xl font-bold text-on-surface">142</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User Directory */}
        <div className="lg:col-span-2 glass-card beveled-edge rounded-3xl overflow-hidden bg-white/40">
          <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
            <h3 className="font-title-md text-lg font-bold text-on-surface">User Directory</h3>
            <div className="relative w-48">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-outline-variant/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff]/60 border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-outline uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-bold text-outline uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-bold text-outline uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{u.name}</p>
                          <p className="text-xs text-on-surface-variant flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'Admin' ? 'bg-primary/10 text-primary' :
                        u.role === 'Accountant' ? 'bg-tertiary/10 text-tertiary' :
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-xs font-bold ${
                        u.status === 'Active' ? 'text-tertiary' : 'text-outline'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-tertiary' : 'bg-outline'}`}></div>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-mono-data text-xs">{u.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-outline hover:text-primary transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Key className="text-primary w-5 h-5" />
            <h3 className="font-title-md text-lg font-bold text-on-surface">Permission Matrix</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-xs font-bold text-outline tracking-wider">
                  <th className="pb-3">Feature</th>
                  <th className="pb-3 text-center">Trader</th>
                  <th className="pb-3 text-center">Acc.</th>
                  <th className="pb-3 text-center">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {permissions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-colors">
                    <td className="py-3 font-medium text-on-surface">{p.feature}</td>
                    <td className="py-3">{renderPermission(p.trader)}</td>
                    <td className="py-3">{renderPermission(p.accountant)}</td>
                    <td className="py-3">{renderPermission(p.admin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/20 flex gap-4 text-xs text-on-surface-variant justify-center">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-tertiary" /> Full Access</span>
            <span className="flex items-center gap-1"><Search className="w-3 h-3 text-primary" /> View Only</span>
            <span className="flex items-center gap-1"><X className="w-3 h-3 text-error" /> Blocked</span>
          </div>
        </div>

      </div>
    </div>
  );
}
