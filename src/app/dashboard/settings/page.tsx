"use client";

import React, { useState } from "react";
import {
  Building,
  Banknote,
  Landmark,
  Users,
  Brain,
  Shield,
  Info,
  Camera,
  Sparkles,
  UserPlus,
  Send
} from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Sterling Digital Agency");
  const [currency, setCurrency] = useState("DZD - Algerian Dinar (DZD)");
  const [address, setAddress] = useState("7500 Rialto Blvd, Suite 250, Austin, TX 78735, United States");
  const [aiCategorization, setAiCategorization] = useState(true);
  const [activeTab, setActiveTab] = useState("company");

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [teamMembers, setTeamMembers] = useState([
    { name: "Jane Doe", email: "jane@sterlingdigital.com", initials: "JD", role: "Owner" }
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      name: inviteEmail.split("@")[0].split(".").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      email: inviteEmail.trim(),
      initials: inviteEmail.slice(0, 2).toUpperCase(),
      role: inviteRole
    };

    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail("");
    alert(`Invite sent to ${inviteEmail}!`);
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Settings</h2>
        <p className="text-body-md text-on-surface-variant">Configure your fintech workspace and security features.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar (left) */}
        <div className="w-full lg:w-1/4 space-y-1">
          <button
            onClick={() => setActiveTab("company")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "company"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Building className="w-5 h-5" />
            Company Profile
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "billing"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Banknote className="w-5 h-5" />
            Billing
          </button>
          <button
            onClick={() => setActiveTab("tax")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "tax"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Landmark className="w-5 h-5" />
            Tax Settings
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "roles"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Users className="w-5 h-5" />
            User Roles
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "ai"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Brain className="w-5 h-5" />
            AI Preferences
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border ${
              activeTab === "security"
                ? "bg-white border-primary/20 text-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-low border-transparent"
            }`}
          >
            <Shield className="w-5 h-5" />
            Security
          </button>
        </div>

        {/* Main Settings Form (right) */}
        <div className="w-full lg:w-3/4 space-y-8">
          {/* Section: Company Details */}
          <div className="glass-card beveled-edge rounded-2xl p-8 bg-white/70">
            <h3 className="font-title-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Company Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex items-center gap-6 pb-6 border-b border-outline-variant/20">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-outline-variant hover:border-primary transition-all cursor-pointer">
                    <Camera className="w-8 h-8 text-on-surface-variant" />
                    <span className="text-[10px] font-bold text-primary tracking-wider uppercase mt-1">UPLOAD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Company Logo</h4>
                  <p className="text-on-surface-variant text-xs mt-0.5">PNG, JPG or GIF. Max 5MB.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Company Name
                </label>
                <input
                  className="w-full bg-white/50 border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Default Currency
                </label>
                <select
                  className="w-full bg-white/50 border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm appearance-none cursor-pointer"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>DZD - Algerian Dinar (DZD)</option>
                  <option>EUR - Euro (€)</option>
                  <option>GBP - British Pound (£)</option>
                  <option>CAD - Canadian Dollar (C$)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Headquarters Address
                </label>
                <textarea
                  className="w-full bg-white/50 border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm resize-none"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: AI Features */}
          <div className="glass-card beveled-edge rounded-2xl p-8 bg-white/70 border-l-4 border-l-primary">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">AI-Powered Automatic Categorization</h3>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    Our neural engine automatically sorts expenses and revenue into tax-ready buckets.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={aiCategorization}
                  onChange={(e) => setAiCategorization(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-outline-variant rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>

          {/* Section: Team Management */}
          <div className="glass-card beveled-edge rounded-2xl p-8 bg-white/70">
            <h3 className="font-title-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Invite Team Member
            </h3>
            <form onSubmit={handleSendInvite} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2 w-full">
                <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Email Address
                </label>
                <input
                  className="w-full bg-white/50 border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  placeholder="colleague@company.com"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-48 space-y-2">
                <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Assigned Role
                </label>
                <select
                  className="w-full bg-white/50 border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm appearance-none cursor-pointer"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Accountant</option>
                  <option>Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-secondary text-white px-6 py-3.5 rounded-xl font-bold hover:bg-secondary/90 transition-all flex items-center gap-2 shadow-lg shadow-secondary/10 cursor-pointer"
              >
                Send Invite
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <h4 className="text-xs uppercase font-bold text-on-surface-variant tracking-wider">Active Members</h4>
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl border border-white/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface leading-none">{member.name}</p>
                      <p className="text-on-surface-variant text-xs mt-1">{member.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-wider">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-8 py-3 text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors rounded-xl cursor-pointer">
              Discard Changes
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
