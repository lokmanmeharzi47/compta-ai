"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { generateFinancialAnalysis, RawFinancialData, AIAnalysisOutput } from "@/lib/ai-financial-engine";

export type TimeFilter = "1M" | "3M" | "6M" | "12M" | "YTD";

export interface ChartMetric {
  date: string;
  current: number;
  previous: number;
}

export interface FinancialData {
  revenueGross: number;
  revenueAdjust: number;
  revenueTrend: string;
  cogsGross: number;
  cogsAdjust: number;
  cogsTrend: string;
  opexGross: number;
  opexAdjust: number;
  opexTrend: string;
}

interface FinancialReportContextType {
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  data: FinancialData;
  setData: React.Dispatch<React.SetStateAction<FinancialData>>;
  rawFinData: RawFinancialData;
  setRawFinData: React.Dispatch<React.SetStateAction<RawFinancialData>>;
  chartData: ChartMetric[];
  setChartData: React.Dispatch<React.SetStateAction<ChartMetric[]>>;
  revenueNet: number;
  cogsNet: number;
  grossProfit: number;
  opexNet: number;
  netIncome: number;
  netIncomeTrendPercentage: string;
  aiAnalysis: AIAnalysisOutput;
  isLoading: boolean;
  handleImportData: (type: "bilan" | "tcr", file: File) => Promise<void>;
}

const FinancialReportContext = createContext<FinancialReportContextType | undefined>(undefined);

export const FinancialReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1M");

  const [data, setData] = useState<FinancialData>({
    revenueGross: 452300.0,
    revenueAdjust: -2300.0,
    revenueTrend: "↑ 8%",
    cogsGross: 120000.0,
    cogsAdjust: 0.0,
    cogsTrend: "↑ 2%",
    opexGross: 85400.0,
    opexAdjust: -400.0,
    opexTrend: "↓ 4%",
  });

  const [rawFinData, setRawFinData] = useState<RawFinancialData>({
    capitauxPropres: 50000000,
    empruntsLT: 25000000,
    immobilisations: 60000000,
    stocks: 35000000,
    creancesClients: 15000000,
    dettesFournisseurs: 35000000,
    tresorerieActif: 10000000,
    tresoreriePassif: 10000000,
    revenus: 452300.0,
    charges: 205400.0
  });

  const [chartData, setChartData] = useState<ChartMetric[]>([
    { date: "OCT 01", current: 150000, previous: 130000 },
    { date: "OCT 08", current: 160000, previous: 135000 },
    { date: "OCT 15", current: 180000, previous: 140000 },
    { date: "OCT 22", current: 200000, previous: 150000 },
    { date: "OCT 31", current: 210000, previous: 180000 },
  ]);

  const { isLoading } = useQuery({
    queryKey: ["financialData", timeFilter],
    queryFn: async () => {
      // API call placeholder
      return null;
    },
    enabled: false 
  });

  const revenueNet = data.revenueGross + data.revenueAdjust;
  const cogsNet = data.cogsGross + data.cogsAdjust;
  const grossProfit = revenueNet - cogsNet;
  const opexNet = data.opexGross + data.opexAdjust;
  const netIncome = grossProfit - opexNet;

  const netIncomeTrendPercentage = "12.4%";

  // Trigger AI engine on data change
  const aiAnalysis = useMemo(() => {
    // Sync UI table values into raw data for accurate simulation
    const updatedRaw = {
        ...rawFinData,
        revenus: revenueNet,
        charges: opexNet + cogsNet
    };
    return generateFinancialAnalysis(updatedRaw);
  }, [rawFinData, revenueNet, opexNet, cogsNet]);

  const handleImportData = async (type: "bilan" | "tcr", file: File) => {
    // Mock parsing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (type === "bilan") {
      setRawFinData(prev => ({
        ...prev,
        stocks: prev.stocks * 1.15,
        creancesClients: prev.creancesClients * 0.9,
      }));
    } else {
      setData(prev => ({
        ...prev,
        revenueGross: prev.revenueGross * 1.12,
        cogsGross: prev.cogsGross * 1.05
      }));
    }

    // Simulate chart data changing to visually reflect the new imported data
    setChartData(prev => prev.map(point => ({
      ...point,
      current: Math.round(point.current * (1 + (Math.random() * 0.3 - 0.1))), // Random change between -10% and +20%
      previous: Math.round(point.previous * (1 + (Math.random() * 0.2 - 0.1))) 
    })));
  };

  const value = {
    timeFilter,
    setTimeFilter,
    data,
    setData,
    rawFinData,
    setRawFinData,
    chartData,
    setChartData,
    revenueNet,
    cogsNet,
    grossProfit,
    opexNet,
    netIncome,
    netIncomeTrendPercentage,
    aiAnalysis,
    isLoading,
    handleImportData
  };

  return (
    <FinancialReportContext.Provider value={value}>
      {children}
    </FinancialReportContext.Provider>
  );
};

export const useFinancialReport = () => {
  const context = useContext(FinancialReportContext);
  if (!context) {
    throw new Error("useFinancialReport must be used within a FinancialReportProvider");
  }
  return context;
};
