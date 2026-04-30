export type AutomationOpportunityScope = "categories" | "topics" | "subtopics";

export type AutomationOpportunityReference = {
  scope: AutomationOpportunityScope;
  id: string;
  title: string;
  description: string;
  detail: string;
  interactionsAnnual: string;
  totalCallVolumePercent: string;
  annualSavingsBadge: string;
  cardBody: string;
};

export const automationOpportunityReferences = {
  billingPayments: {
    scope: "categories",
    id: "billing-payments",
    title: "Disruption Rebooking",
    description: "High-volume category with repeatable rebooking and rerouting flows.",
    detail: "84K disrupted travelers overnight · strong automation potential",
    interactionsAnnual: "612,400",
    totalCallVolumePercent: "12.4",
    annualSavingsBadge: "$3.76M Annual Savings",
    cardBody:
      "Automating disruption rebooking could save $3.76M annually across 612K traveler-impacting events. Agents are commonly rebuilding multi-leg itineraries, reissuing tickets, and applying SLA credit during weather and operational disruptions.",
  },
  billExplanation: {
    scope: "topics",
    id: "topics-bill-explanation",
    title: "Itinerary Receipt Explanation",
    description: "162K automatable calls · 3.6% of total mix.",
    detail: "$420K annual savings · 4:00 avg duration",
    interactionsAnnual: "162,000",
    totalCallVolumePercent: "3.6",
    annualSavingsBadge: "$420K Annual Savings",
    cardBody:
      "Automating itinerary receipt explanation could save $420K annually across 162K interactions. Agents are commonly walking travelers through fare line items, taxes, and ancillary charges on multi-leg bookings.",
  },
  chargeBreakdown: {
    scope: "subtopics",
    id: "subtopics-charge-breakdown",
    title: "Refund & Voucher Status",
    description: "Repeat refund-status questions fit deterministic triage.",
    detail: "94K sub-topic volume · 2.4% automation potential",
    interactionsAnnual: "94,200",
    totalCallVolumePercent: "2.4",
    annualSavingsBadge: "$280K Annual Savings",
    cardBody:
      "Automating refund and voucher status could save $280K annually across 94K interactions. Agents are commonly pulling refund timelines, validating voucher balances, and explaining settlement windows.",
  },
  cardServices: {
    scope: "categories",
    id: "card-services",
    title: "Baggage Tracking & Claims",
    description: "Highly standardized lookup, claim, and reroute flows.",
    detail: "32,300 automatable volume · $720K annual savings",
    interactionsAnnual: "32,300",
    totalCallVolumePercent: "6.7",
    annualSavingsBadge: "$720K Annual Savings",
    cardBody:
      "Automating baggage tracking and claims could save $720K annually across 32K interactions. Agents are commonly handling delayed-bag locates, claim filings, and pickup coordination.",
  },
  cardActivation: {
    scope: "topics",
    id: "topics-card-activation",
    title: "Check-in & Boarding Pass",
    description: "Check-in flows are ideal for guided multimodal self-serve.",
    detail: "208,330 automatable volume · 6.4% automation potential",
    interactionsAnnual: "208,330",
    totalCallVolumePercent: "6.4",
    annualSavingsBadge: "$540K Annual Savings",
    cardBody:
      "Automating check-in and boarding-pass support could save $540K annually across 208K interactions. Agents are commonly walking travelers through document upload, seat selection, and digital boarding pass delivery.",
  },
  addPaymentMethod: {
    scope: "subtopics",
    id: "subtopics-add-payment-method",
    title: "Loyalty Status & Mileage",
    description: "Predictable lookup flow with strong deterministic coverage.",
    detail: "53,560 automatable volume · 1.6% automation potential",
    interactionsAnnual: "53,560",
    totalCallVolumePercent: "1.6",
    annualSavingsBadge: "$190K Annual Savings",
    cardBody:
      "Automating loyalty status and mileage queries could save $190K annually across 53K interactions. Agents are commonly explaining tier qualification, mileage accrual, and award redemption windows.",
  },
} as const satisfies Record<string, AutomationOpportunityReference>;

export const automationTopInsightReferenceOrder = [
  automationOpportunityReferences.billingPayments,
  automationOpportunityReferences.billExplanation,
  automationOpportunityReferences.chargeBreakdown,
  automationOpportunityReferences.cardServices,
  automationOpportunityReferences.cardActivation,
  automationOpportunityReferences.addPaymentMethod,
] as const;

export const automationSummaryReference = {
  primaryCategoryTitle: automationOpportunityReferences.billingPayments.title,
  primaryCategoryShare: "68%",
  primaryCategoryAnnualSavings: "$33K",
  secondaryCategoryTitle: automationOpportunityReferences.cardServices.title,
  secondaryCategoryAutomationRate: "90%",
  secondaryCategorySentiment: "4.2/5",
} as const;
