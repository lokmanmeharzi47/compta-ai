"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Wallet,
  CheckCircle2,
  ChevronLeft,
  Mail,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-mesh min-h-screen flex items-center justify-center font-body-md text-on-surface p-6 sm:p-12 relative overflow-hidden bg-[#f8f9ff]">
      {/* Aesthetic Decorative Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] -z-10"></div>

      {/* Auth Container */}
      <main className="w-full max-w-[480px] z-10">
        {/* Brand Identity Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <Wallet className="w-8 h-8 text-on-primary-container" />
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">COMPTA AI</h1>
          <p className="font-label-caps text-xs text-outline font-bold uppercase tracking-widest">Premium Fintech</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="glass-card rounded-[32px] p-8 sm:p-12 relative overflow-hidden bg-white/80 backdrop-blur-md border border-white/20 shadow-[0_40px_60px_-15px_rgba(0,84,214,0.1)]">
          {/* Subtle Beveled Edge Light Effect */}
          <div className="absolute inset-0 border-t border-l border-white/40 rounded-[32px] pointer-events-none"></div>
          <div className="relative z-10">
            {submitted ? (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-title-md text-xl font-bold text-on-background mb-2">Check Your Email</h2>
                  <p className="font-body-sm text-sm text-on-surface-variant max-w-[280px] mx-auto">
                    We have sent password recovery instructions to your email address.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20">
                  <Link
                    className="inline-flex items-center gap-2 font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors group font-bold"
                    href="/login"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="font-title-md text-xl font-bold text-on-background mb-2">Reset Your Password</h2>
                  <p className="font-body-sm text-sm text-on-surface-variant max-w-[280px] mx-auto">
                    Enter the email address associated with your account and we&apos;ll send you a recovery link.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs text-on-surface-variant font-bold block ml-1" htmlFor="email">
                      Email address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        className="w-full pl-12 pr-4 py-4 bg-white/50 border border-outline-variant/40 rounded-2xl font-body-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none text-on-surface"
                        id="email"
                        name="email"
                        placeholder="name@company.com"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      type="submit"
                    >
                      Send Reset Link
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
                {/* Back to Login */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <Link
                    className="inline-flex items-center gap-2 font-body-sm text-sm text-on-surface-variant hover:text-primary transition-colors group font-bold"
                    href="/login"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <ShieldCheck className="text-outline w-5 h-5 shrink-0" />
          <span className="font-label-caps text-xs text-outline font-bold uppercase">Bank-grade Security</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-4 text-center hidden md:block">
        <p className="font-body-sm text-xs text-outline font-bold">© 2024 COMPTA AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
