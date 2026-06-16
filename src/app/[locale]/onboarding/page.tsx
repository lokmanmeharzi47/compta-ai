"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const router = useRouter();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    companyName: "",
    industry: "",
    companySize: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // After onboarding, navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-8 py-6">
          <h1 className="text-white text-2xl font-bold">{t("title")}</h1>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
              {t.rich("subtitle", {
                strong: (chunks) => <span className="font-bold text-on-surface">{chunks}</span>
              })}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
              <input
                type="text"
                name="lastName"
                placeholder={t("lastName")}
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-xl px-5 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-outline"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="firstName"
                placeholder={t("firstName")}
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-xl px-5 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-outline"
              />
            </div>

            <div>
              <input
                type="text"
                name="companyName"
                placeholder={t("companyName")}
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-xl px-5 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-outline"
              />
            </div>

            <div>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-xl px-5 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-outline">{t("industry")}</option>
                <option value="tech">{t("industryTech")}</option>
                <option value="retail">{t("industryRetail")}</option>
                <option value="services">{t("industryServices")}</option>
                <option value="other">{t("industryOther")}</option>
              </select>
            </div>

            <div>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
                className="w-full bg-[#f8f9fa] border border-outline-variant/30 rounded-xl px-5 py-3.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-outline">{t("companySize")}</option>
                <option value="1-10">{t("size1to10")}</option>
                <option value="11-50">{t("size11to50")}</option>
                <option value="50+">{t("size50plus")}</option>
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#2e5cff] hover:bg-primary-container hover:text-on-primary-container text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
