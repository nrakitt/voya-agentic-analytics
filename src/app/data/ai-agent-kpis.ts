import {
  buildTrendSparklineSeries,
  type KpiSparklinePattern,
} from "../lib/kpi-trend-sparkline";

export type AIAgentOverviewKpi = {
  label: string;
  value: string;
  trend: string;
  sparklinePattern: KpiSparklinePattern;
  sparkline: number[];
};

function createOverviewKpi(
  kpi: Omit<AIAgentOverviewKpi, "sparkline">,
): AIAgentOverviewKpi {
  return {
    ...kpi,
    sparkline: buildTrendSparklineSeries({
      value: kpi.value,
      trend: kpi.trend,
      pattern: kpi.sparklinePattern,
      seedKey: `ai-agent-overview:${kpi.label}`,
    }),
  };
}

export const aiAgentOverviewKpis: AIAgentOverviewKpi[] = [
  createOverviewKpi({
    label: "Total Sessions",
    value: "84,127",
    trend: "+12.4%",
    sparklinePattern: "smallDipRecovery",
  }),
  createOverviewKpi({
    label: "Active Sessions",
    value: "1,842",
    trend: "+18.2%",
    sparklinePattern: "steadyUp",
  }),
  createOverviewKpi({
    label: "Avg. Session Length",
    value: "3.2 min",
    trend: "-2.1%",
    sparklinePattern: "smallSpikePullback",
  }),
  createOverviewKpi({
    label: "Handovers (Escalations)",
    value: "7,571",
    trend: "-4.5%",
    sparklinePattern: "bigDipRecovery",
  }),
  createOverviewKpi({
    label: "Positive Ratings",
    value: "94.2%",
    trend: "+1.8%",
    sparklinePattern: "steadyUp",
  }),
  createOverviewKpi({
    label: "Unique Contacts",
    value: "68,344",
    trend: "+9.1%",
    sparklinePattern: "smallDipRecovery",
  }),
];

export type AIAgentEvaluationKpi = {
  label: string;
  value: string;
  caption: string;
  badge: string;
  sparklinePattern: KpiSparklinePattern;
  sparkline: number[];
};

function createEvaluationKpi(
  kpi: Omit<AIAgentEvaluationKpi, "sparkline">,
): AIAgentEvaluationKpi {
  return {
    ...kpi,
    sparkline: buildTrendSparklineSeries({
      value: kpi.value,
      trend: kpi.badge,
      pattern: kpi.sparklinePattern,
      seedKey: `ai-agent-evaluation:${kpi.label}`,
    }),
  };
}

export const aiAgentEvaluationKpis: AIAgentEvaluationKpi[] = [
  createEvaluationKpi({
    label: "Evaluated",
    value: "2,847",
    caption: "conversations",
    badge: "+3.2%",
    sparklinePattern: "steadyUp",
  }),
  createEvaluationKpi({
    label: "Success Rate",
    value: "68%",
    caption: "goal achieved",
    badge: "+1.4%",
    sparklinePattern: "smallDipRecovery",
  }),
  createEvaluationKpi({
    label: "Containment",
    value: "91%",
    caption: "AI resolved",
    badge: "+4.0%",
    sparklinePattern: "smallSpikePullback",
  }),
  createEvaluationKpi({
    label: "Positive Sent",
    value: "88%",
    caption: "good sentiment",
    badge: "+1.4%",
    sparklinePattern: "smallDipRecovery",
  }),
  createEvaluationKpi({
    label: "Compliance",
    value: "89%",
    caption: "114 violations",
    badge: "−1.1%",
    sparklinePattern: "steadyDown",
  }),
  createEvaluationKpi({
    label: "Brand Aligned",
    value: "91%",
    caption: "fully aligned",
    badge: "+0.6%",
    sparklinePattern: "flat",
  }),
];

export type AIAgentProductivityRow = {
  agentName: string;
  totalSessions: number;
  sentimentPct: number;
  brandAlignmentPct: number;
};

export const aiAgentProductivityRows: AIAgentProductivityRow[] = [
  { agentName: "Voya-Disruption", totalSessions: 28420, sentimentPct: 64, brandAlignmentPct: 77 },
  { agentName: "Voya-Rebooking", totalSessions: 24633, sentimentPct: 56, brandAlignmentPct: 68 },
  { agentName: "Voya-Baggage", totalSessions: 18522, sentimentPct: 58, brandAlignmentPct: 71 },
  { agentName: "Voya-Itinerary", totalSessions: 13660, sentimentPct: 62, brandAlignmentPct: 74 },
  { agentName: "Voya-Refunds", totalSessions: 12840, sentimentPct: 55, brandAlignmentPct: 69 },
  { agentName: "Voya-Loyalty", totalSessions: 11790, sentimentPct: 57, brandAlignmentPct: 70 },
  { agentName: "Voya-CheckIn", totalSessions: 11220, sentimentPct: 60, brandAlignmentPct: 72 },
  { agentName: "Voya-Concierge", totalSessions: 10260, sentimentPct: 54, brandAlignmentPct: 67 },
  { agentName: "Voya-Insurance", totalSessions: 9630, sentimentPct: 59, brandAlignmentPct: 73 },
  { agentName: "Voya-Guardian", totalSessions: 9100, sentimentPct: 53, brandAlignmentPct: 66 },
];
