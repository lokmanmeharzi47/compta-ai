"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Bot,
  Paperclip,
  Mic,
  Send,
  AlertTriangle,
  PiggyBank,
  Upload,
  Share,
  History
} from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  chart?: boolean;
}

export default function AssistantPage() {
  const t = useTranslations("assistantPage");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "Analyze my expenses for Q3. How does it compare to Q2?",
    },
    {
      sender: "ai",
      text: "Analysis complete for Q3. Your total operating expenses rose by 12.4% compared to Q2. The primary driver was a significant increase in Cloud Infrastructure costs during August.",
      chart: true,
    },
    {
      sender: "ai",
      text: "Would you like me to forecast your Q4 spending based on these trends?",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputVal("");

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I have analyzed that query. Let me fetch the relevant metrics for you.";
      if (userMsg.toLowerCase().includes("revenue") || userMsg.toLowerCase().includes("predict")) {
        aiText = "Based on current linear growth, your revenue for Q4 is projected to reach 155,000, DZD representing a 14% improvement over Q3.";
      } else if (userMsg.toLowerCase().includes("risky") || userMsg.toLowerCase().includes("expense")) {
        aiText = "Risk assessment highlights AWS duplicate bills (1,240 DZD) and active subscriptions with no usage in the past 30 days (e.g. Adobe Suite test accounts).";
      } else if (userMsg.toLowerCase().includes("cash") || userMsg.toLowerCase().includes("flow")) {
        aiText = "Your cash flow index is healthy at 1.84. However, watch out for receivables coming due from Acme Corp by early next month.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    }, 1000);
  };

  const handleSuggestedPrompt = (promptText: string) => {
    setInputVal(promptText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[calc(100vh-10rem)]">
      {/* Central Chat Area (8 cols) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col justify-between h-full bg-white/40 glass-card beveled-edge rounded-3xl p-6 min-h-[600px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pe-2 max-h-[450px]">
          {messages.map((msg, i) => {
            const isUser = msg.sender === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"} gap-4`}>
                {!isUser && (
                  <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div className="max-w-[85%] space-y-4">
                  <div
                    className={`px-6 py-4 rounded-[2rem] shadow-sm border ${
                      isUser
                        ? "bg-white text-on-surface border-outline-variant/20 rounded-tr-sm"
                        : "bg-surface-container-low text-on-surface border-primary/10 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>

                  {msg.chart && (
                    <div className="glass-card beveled-edge p-6 rounded-3xl border border-primary/10 overflow-hidden bg-white/80">
                      <div className="flex justify-between items-end mb-6">
                        <div>
                          <h4 className="font-bold text-sm text-primary">Q2 vs Q3 Expenses</h4>
                          <p className="text-xs text-on-surface-variant">Comparative breakdown by category</p>
                        </div>
                        <span className="text-primary font-bold text-xl">142.5k DZD</span>
                      </div>
                      {/* Visual Chart Mockup */}
                      <div className="h-40 flex items-end gap-6 px-4">
                        <div className="flex-1 space-y-2 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-t-lg h-28 relative group">
                            <div className="absolute bottom-0 w-full bg-primary/40 h-20 rounded-t-lg transition-all"></div>
                          </div>
                          <span className="text-[10px] font-bold text-outline">Marketing</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-t-lg h-36 relative group">
                            <div className="absolute bottom-0 w-full bg-primary h-32 rounded-t-lg transition-all"></div>
                          </div>
                          <span className="text-[10px] font-bold text-outline">Cloud</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-t-lg h-20 relative group">
                            <div className="absolute bottom-0 w-full bg-primary/40 h-16 rounded-t-lg transition-all"></div>
                          </div>
                          <span className="text-[10px] font-bold text-outline">Payroll</span>
                        </div>
                        <div className="flex-1 space-y-2 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-t-lg h-24 relative group">
                            <div className="absolute bottom-0 w-full bg-primary/40 h-12 rounded-t-lg transition-all"></div>
                          </div>
                          <span className="text-[10px] font-bold text-outline">Office</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Suggested Actions Area */}
        <div className="space-y-4">
          {/* Suggested Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSuggestedPrompt(t("predictRev"))}
              className="px-4 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              {t("predictRev")}
            </button>
            <button
              onClick={() => handleSuggestedPrompt(t("showRisky"))}
              className="px-4 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              {t("showRisky")}
            </button>
            <button
              onClick={() => handleSuggestedPrompt(t("analyzeCash"))}
              className="px-4 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              {t("analyzeCash")}
            </button>
          </div>

          {/* Input Box */}
          <div className="bg-white/80 border border-outline-variant/30 p-2 rounded-[2rem] shadow-xl flex items-end gap-2 group focus-within:ring-2 focus-within:ring-primary/30 transition-all">
            <div className="flex gap-1 p-1">
              <button className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-colors cursor-pointer">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-colors cursor-pointer">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <textarea
              className="flex-grow bg-transparent border-none focus:ring-0 resize-none py-4 px-2 text-sm max-h-32 placeholder:text-outline/60 outline-none"
              placeholder={t("messageCompta")}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              className="p-4 bg-primary text-white rounded-full mb-1 me-1 active:scale-90 transition-transform shadow-lg shadow-primary/30 flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      {/* Right Side Panel (4 cols) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="glass-card beveled-edge p-6 rounded-3xl bg-white/70 flex flex-col justify-between min-h-[480px]">
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-on-surface-variant tracking-wider">{t("activeInsights")}</h3>
            {/* Anomaly Card */}
            <div className="glass-card p-4 rounded-2xl border-s-4 border-error/50 bg-white/55">
              <div className="flex items-start gap-3">
                <div className="bg-error/10 p-2 rounded-lg text-error">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-on-surface">{t("anomalyDetected")}</h4>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {t("anomalyDesc")}
                  </p>
                  <button className="mt-2 text-primary font-bold text-xs hover:underline cursor-pointer">
                    {t("reviewNow")}
                  </button>
                </div>
              </div>
            </div>

            {/* {t("savingsOp")} Card */}
            <div className="glass-card p-4 rounded-2xl border-s-4 border-tertiary bg-white/55">
              <div className="flex items-start gap-3">
                <div className="bg-tertiary/10 p-2 rounded-lg text-tertiary">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-on-surface">Savings Opportunity</h4>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {t("savingsDesc")}
                  </p>
                  <button className="mt-2 text-primary font-bold text-xs hover:underline cursor-pointer">
                    {t("automateTask")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-xs uppercase font-bold text-on-surface-variant tracking-wider">{t("contextualTools")}</h3>
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-xl hover:bg-white transition-all group bg-white/40 cursor-pointer text-start">
                <Upload className="w-5 h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-bold text-on-surface">{t("uploadInvoices")}</span>
              </button>
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-xl hover:bg-white transition-all group bg-white/40 cursor-pointer text-start">
                <Share className="w-5 h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-bold text-on-surface">{t("exportInsights")}</span>
              </button>
              <button className="flex items-center gap-3 w-full p-4 glass-card rounded-xl hover:bg-white transition-all group bg-white/40 cursor-pointer text-start">
                <History className="w-5 h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-bold text-on-surface">{t("analysisHistory")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Promotion Ad Box */}
        <div className="relative group overflow-hidden rounded-3xl h-44 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Futuristic Tech Abstract"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCveFmAjbqIz3k9uVETRIatBv9ia7Ndvh1VH3HWBCX43WmeO-mJJvabEs5B9G-LQj2L22uTrsdV7gRuNiNZazpxBlGytLA0KJu4SSVvBMHo3vr77JLuagLulZCfyR7qjFz3-inx46g-2yQ7IK3uQdCMZ2ZttU9jTCgKu8A5JXq6SzQEc9ajhkQPA8O5JNfjkzq9ZtSaIh4yzY-SeQsvPUcLWSEh5KhTKTvWZ4iSGHlfSgn_kiIs-7yx2s8_ZZtiqL5BC38wk1yowRlu"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 flex flex-col justify-end">
            <p className="text-white font-bold text-base leading-tight">{t("unlockAi")}</p>
            <p className="text-white/70 text-xs mt-1">{t("upgradePlan")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
