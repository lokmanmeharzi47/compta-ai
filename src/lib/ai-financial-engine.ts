export interface RawFinancialData {
  capitauxPropres: number;
  empruntsLT: number;
  immobilisations: number;
  stocks: number;
  creancesClients: number;
  dettesFournisseurs: number;
  tresorerieActif: number;
  tresoreriePassif: number;
  revenus: number;
  charges: number;
}

export interface Recommendation {
  priority: "High" | "Moderate" | "Low" | "Critical";
  title: string;
  impact: string;
  description: string;
}

export interface FinancialMetric {
  value: number;
  status: "healthy" | "warning" | "critical";
  analysis: string;
}

export interface AIAnalysisOutput {
  frng: FinancialMetric;
  bfr: FinancialMetric;
  tresorerie: FinancialMetric;
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  summary: string;
  recommendations: Recommendation[];
}

export function generateFinancialAnalysis(data: RawFinancialData): AIAnalysisOutput {
  // --- CALCULATION ---
  const capitauxPermanents = data.capitauxPropres + data.empruntsLT;
  const frng = capitauxPermanents - data.immobilisations;
  const bfr = (data.stocks + data.creancesClients) - data.dettesFournisseurs;
  const tresorerieNet = frng - bfr; // or tresorerieActif - tresoreriePassif

  const currentAssets = data.stocks + data.creancesClients + data.tresorerieActif;
  const currentLiabilities = data.dettesFournisseurs + data.tresoreriePassif;
  
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio = currentLiabilities > 0 ? (data.creancesClients + data.tresorerieActif) / currentLiabilities : 0;
  
  const totalAssets = data.immobilisations + currentAssets;
  const financialAutonomy = totalAssets > 0 ? data.capitauxPropres / totalAssets : 0;
  
  const grossMargin = data.revenus > 0 ? (data.revenus - data.charges) / data.revenus : 0;

  // --- STATUS & ANALYSIS ---
  const frngStatus = frng > 0 ? "healthy" : frng === 0 ? "warning" : "critical";
  const bfrStatus = bfr > 0 ? "warning" : "healthy"; // Positive BFR means cash is tied up
  const tnStatus = tresorerieNet > 0 ? "healthy" : tresorerieNet === 0 ? "warning" : "critical";

  // FRNG Analysis
  let frngAnalysis = "";
  if (frngStatus === "healthy") {
    frngAnalysis = `Votre entreprise dispose d'un Fonds de Roulement Net Global positif de ${frng.toLocaleString("fr-DZ")} DZD. Les capitaux permanents couvrent intégralement les investissements à long terme.`;
  } else {
    frngAnalysis = `Votre Fonds de Roulement Net Global est négatif de ${frng.toLocaleString("fr-DZ")} DZD, indiquant un déséquilibre structurel grave nécessitant un refinancement.`;
  }

  // BFR Analysis
  let bfrAnalysis = "";
  if (bfrStatus === "warning") {
    bfrAnalysis = `Votre cycle d'exploitation consomme ${bfr.toLocaleString("fr-DZ")} DZD de liquidités, ce qui augmente le besoin de financement à court terme.`;
  } else {
    bfrAnalysis = `Votre Besoin en Fonds de Roulement est négatif (${bfr.toLocaleString("fr-DZ")} DZD). Vos fournisseurs financent votre cycle d'exploitation.`;
  }

  // TN Analysis
  let tnAnalysis = "";
  if (tnStatus === "healthy") {
    tnAnalysis = `Excellente position de trésorerie nette (${tresorerieNet.toLocaleString("fr-DZ")} DZD), offrant une forte capacité d'autofinancement.`;
  } else if (tnStatus === "warning") {
    tnAnalysis = `Position de trésorerie correcte mais sous tension. À surveiller étroitement.`;
  } else {
    tnAnalysis = `Critique. Votre trésorerie est dans le rouge (${tresorerieNet.toLocaleString("fr-DZ")} DZD). Un financement immédiat est requis.`;
  }

  // Risk Level
  let riskLevel: "Low" | "Moderate" | "High" | "Critical" = "Low";
  let criticalCount = [frngStatus, tnStatus].filter(s => s === "critical").length;
  if (criticalCount >= 2) riskLevel = "Critical";
  else if (criticalCount === 1) riskLevel = "High";
  else if (frngStatus === "warning" || bfrStatus === "warning") riskLevel = "Moderate";

  // Summary
  const summary = `Votre structure financière affiche une autonomie de ${(financialAutonomy * 100).toFixed(1)}% avec un ratio de liquidité générale de ${currentRatio.toFixed(2)}. ${riskLevel === 'Low' ? "L'entreprise présente une base solide pour la croissance." : "Des actions correctives sont requises pour stabiliser la structure."}`;

  // Recommendations
  const recommendations: Recommendation[] = [];
  
  if (bfr > 0) {
    if (data.stocks > data.creancesClients) {
      recommendations.push({
        priority: "High",
        title: "Réduction des stocks dormants",
        impact: "Optimisation de la liquidité",
        description: "Mettre en place une gestion en flux tendu pour libérer le capital immobilisé en stock."
      });
    } else {
      recommendations.push({
        priority: "High",
        title: "Accélération du recouvrement",
        impact: "Amélioration du cash flow",
        description: "Réduire le délai de paiement client pour diminuer le besoin en fonds de roulement."
      });
    }
  }

  if (data.dettesFournisseurs > (data.creancesClients * 1.5) && tnStatus === "critical") {
    recommendations.push({
      priority: "Critical",
      title: "Renégociation des délais fournisseurs",
      impact: "Soulagement de la trésorerie",
      description: "Étendre les échéances fournisseurs pour éviter une rupture de paiement."
    });
  }

  if (grossMargin < 0.2) {
    recommendations.push({
      priority: "Moderate",
      title: "Réduction des charges d'exploitation",
      impact: "Amélioration de la rentabilité",
      description: `Vos charges (${data.charges.toLocaleString("fr-DZ")}) rognent vos marges. Identifiez les coûts non essentiels.`
    });
  }

  if (frngStatus === "critical") {
    recommendations.push({
      priority: "Critical",
      title: "Renforcement des capitaux",
      impact: "Stabilité structurelle",
      description: "Envisager une augmentation de capital ou un prêt à long terme pour couvrir les actifs immobilisés."
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: "Low",
      title: "Stratégie de placement",
      impact: "Génération de revenus passifs",
      description: "Placer l'excédent de trésorerie sur des comptes à terme pour optimiser le rendement."
    });
  }

  return {
    frng: { value: frng, status: frngStatus, analysis: frngAnalysis },
    bfr: { value: bfr, status: bfrStatus, analysis: bfrAnalysis },
    tresorerie: { value: tresorerieNet, status: tnStatus, analysis: tnAnalysis },
    riskLevel,
    summary,
    recommendations: recommendations.slice(0, 4) // max 4 recommendations
  };
}
