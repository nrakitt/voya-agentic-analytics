import { BarChart3, FileText, TrendingUp } from "lucide-react";
import type { DashboardData, WidgetData } from "../contexts/ConversationContext";
import { buildMockAssistantFields } from "../lib/mock-assistant-structure";
import type { AssistantReplyPayload } from "../types/conversation-types";
import type { AutomationScopeTab } from "./automation-opportunities-page";
import { automationTopInsightReferenceOrder } from "./automation-opportunity-references";

// ── Hero / Input constants ────────────────────────────────────────────

export const exploreHeadings = [
  "What story does Voya's data tell today?",
  "How can I help you manage the business?",
  "Ready to dig into last night's disruption?",
  "What questions are top of mind?",
  "What insights do you need?",
];

export const placeholderSuffixes = [
  "customer support data\u2026",
  "key insights\u2026",
  "escalation trends\u2026",
  "agent performance\u2026",
  "CSAT scores\u2026",
  "resolution rates\u2026",
  "knowledge base gaps\u2026",
  "automation opportunities\u2026",
  "ticket volume patterns\u2026",
  "self-service metrics\u2026",
];

// ── Suggested action cards ────────────────────────────────────────────

export const suggestedActions = [
  {
    id: 1,
    icon: BarChart3,
    label: "Analyze Trends",
    description: "Show me agent escalation trends over the last 30 days",
    prompts: [
      "Analyze escalation trends over the last 30 days",
      "Analyze ticket volume trends by category this quarter",
      "Analyze CSAT score trends across all channels",
      "Analyze response time trends week over week",
      "Analyze self-service containment rate trends",
    ],
  },
  {
    id: 2,
    icon: FileText,
    label: "Knowledge Insights",
    description: "Which knowledge articles drive resolution?",
    prompts: [
      "Which knowledge articles have the highest resolution rate?",
      "What topics are missing from the knowledge base?",
      "Knowledge base gap analysis for top ticket categories",
      "Which knowledge articles need updating based on feedback?",
      "How effective is the knowledge base at deflecting tickets?",
    ],
  },
  {
    id: 3,
    icon: TrendingUp,
    label: "Performance Metrics",
    description: "Compare Copilot usage vs resolution rate",
    prompts: [
      "Compare Copilot usage vs resolution rate across teams",
      "Performance breakdown by agent tier and tenure",
      "Which agents have the best first-contact resolution rate?",
      "Performance comparison across all support channels",
      "How does agent utilization correlate with CSAT scores?",
    ],
  },
];

// ── Key Insights cards ────────────────────────────────────────────────

export const insights = [
  {
    id: 1,
    title: "Escalation Rate Increased",
    value: "12.4%",
    change: "+8%",
    trend: "up" as const,
    description: "From previous month",
    linkedActionId: 6,
  },
  {
    id: 2,
    title: "Self-Service Containment",
    value: "73%",
    change: "-5%",
    trend: "down" as const,
    description: "Dropped in last 7 days",
    linkedActionId: 4,
  },
  {
    id: 3,
    title: "Copilot Adoption",
    value: "62%",
    change: "+12%",
    trend: "up" as const,
    description: "Across all agents",
    linkedActionId: 3,
  },
  {
    id: 4,
    title: "Automation Opportunities",
    value: "14",
    change: "New",
    trend: "neutral" as const,
    description: "Identified this week",
    linkedActionId: 7,
  },
];

// ── Top Automation Opportunities ───────────────────────────────────────

export type AutomationOpportunity = {
  id: number;
  title: string;
  description: string;
  priority: "Critical" | "High" | "Medium";
  weeklyVolume: string;
  impactValue: string;
};

export const topAutomationOpportunities: AutomationOpportunity[] = [
  {
    id: 1,
    title: "Unlock 45 Agent-Hours a Week",
    description:
      "You're handling 847 card clearance requests every week and 94% of them follow the same 3-step pattern.",
    priority: "Critical",
    weeklyVolume: "847/wk",
    impactValue: "$213K/yr",
  },
  {
    id: 2,
    title: "Your #1 Ticket Type Can Basically Run Itself",
    description:
      "Over 1,200 \"Where is my order?\" questions every week. Most are just copying tracking numbers.",
    priority: "Critical",
    weeklyVolume: "1,243/wk",
    impactValue: "$319K/yr",
  },
  {
    id: 3,
    title: "Cut Returns Time from 8 Minutes to Under 1",
    description:
      "534 return cases a week, averaging nearly 8 minutes each. Most are policy checks.",
    priority: "High",
    weeklyVolume: "534/wk",
    impactValue: "$189K/yr",
  },
  {
    id: 4,
    title: "Turn 5-Minute Calls Into 30-Second Wins",
    description:
      "312 scheduling requests a week. Most follow the same pattern: check availability, pick a time, confirm.",
    priority: "Medium",
    weeklyVolume: "312/wk",
    impactValue: "$99K/yr",
  },
];

// ── Top Insights feed cards ────────────────────────────────────────────

export type TopInsightCard =
  | {
      id: number;
      segment: "anomaly";
      severity: "Critical" | "High";
      title: string;
      description: string;
      detail: string;
      timestamp: string;
    }
  | {
      id: number;
      segment: "opportunity";
      /** Shows an Action pill alongside Opportunity (automations, recommended actions, etc.). */
      showActionPill: boolean;
      /** Display-ready interaction volume used in Explore KPI sentence. */
      interactionsAnnual: string;
      /** Percentage of total call volume used in Explore KPI sentence. */
      totalCallVolumePercent: string;
      /** Footer badge text showing annualized savings estimate. */
      annualSavingsBadge: string;
      /** Deterministic deep-link target in Automation Opportunities. */
      automationTarget: {
        scope: AutomationScopeTab;
        id: string;
      };
      title: string;
      description: string;
      detail: string;
      timestamp: string;
    };

const topInsightOpportunityCards: TopInsightCard[] = automationTopInsightReferenceOrder.map(
  (reference, index) => ({
    id: index + 3,
    segment: "opportunity",
    showActionPill: true,
    interactionsAnnual: reference.interactionsAnnual,
    totalCallVolumePercent: reference.totalCallVolumePercent,
    annualSavingsBadge: reference.annualSavingsBadge,
    automationTarget: {
      scope: reference.scope,
      id: reference.id,
    },
    title: reference.title,
    description: reference.description,
    detail: reference.detail,
    timestamp: "New",
  }),
);

export const topInsightsCards: TopInsightCard[] = [
  {
    id: 1,
    segment: "anomaly",
    severity: "Critical",
    title: "Refund AI Agent Containment Dropped 22pts",
    description: "Voya-Refunds hit a knowledge wall on multi-currency voucher splits — escalations spiking across EMEA + APAC.",
    detail: "Containment 91% → 69% · 1,840 escalations / 24h",
    timestamp: "2h ago",
  },
  {
    id: 2,
    segment: "anomaly",
    severity: "High",
    title: "Baggage AHT Surged 38% Across Major Hubs",
    description: "Specialists averaging 14m on baggage claims — knowledge lookups eating nearly 5m per call.",
    detail: "AHT 14m 18s · 380 calls/day · 38% above target",
    timestamp: "4h ago",
  },
  ...topInsightOpportunityCards,
];

// ── Title generation rules ────────────────────────────────────────────

const titleRules: Array<{ keywords: string[]; titles: string[] }> = [
  { keywords: ["escalation", "escalate"], titles: ["Escalation Rate Analysis", "Agent Escalation Trends", "Escalation Pattern Review"] },
  { keywords: ["trend", "over time", "last 30", "last 90", "quarter"], titles: ["Support Trend Analysis", "Metric Trends Over Time", "Historical Performance Review"] },
  { keywords: ["knowledge", "article"], titles: ["Knowledge Base Insights", "Article Performance Analysis", "Knowledge Content Review"] },
  { keywords: ["self-service", "containment", "deflection"], titles: ["Self-Service Effectiveness", "Containment Rate Analysis", "Deflection Metrics Review"] },
  { keywords: ["chatbot", "bot", "virtual agent"], titles: ["Chatbot Performance Review", "Virtual Agent Effectiveness", "Bot Resolution Analysis"] },
  { keywords: ["copilot", "ai assist"], titles: ["Copilot Impact Analysis", "AI Assistant Performance", "Copilot Adoption Metrics"] },
  { keywords: ["resolution", "resolve"], titles: ["Resolution Rate Breakdown", "Ticket Resolution Analysis", "Resolution Performance Review"] },
  { keywords: ["response time", "first response"], titles: ["Response Time Analysis", "First Response Metrics", "Reply Speed Breakdown"] },
  { keywords: ["handle time", "aht"], titles: ["Handle Time Analysis", "AHT Performance Review", "Handling Efficiency Metrics"] },
  { keywords: ["sla", "compliance"], titles: ["SLA Compliance Report", "Service Level Performance", "SLA Adherence Analysis"] },
  { keywords: ["csat", "satisfaction", "customer satisfaction"], titles: ["Customer Satisfaction Analysis", "CSAT Score Breakdown", "Satisfaction Trend Review"] },
  { keywords: ["sentiment", "negative", "positive"], titles: ["Sentiment Analysis Overview", "Customer Sentiment Breakdown", "Feedback Sentiment Review"] },
  { keywords: ["nps", "net promoter", "promoter score"], titles: ["NPS Trend Analysis", "Net Promoter Score Review", "NPS Performance Summary"] },
  { keywords: ["effort score", "ces"], titles: ["Customer Effort Analysis", "CES Breakdown Report", "Effort Score Metrics"] },
  { keywords: ["volume", "ticket count", "how many tickets"], titles: ["Ticket Volume Overview", "Support Volume Analysis", "Request Volume Trends"] },
  { keywords: ["backlog", "queue", "pending"], titles: ["Backlog Status Review", "Queue Depth Analysis", "Pending Tickets Overview"] },
  { keywords: ["peak hours", "busiest"], titles: ["Peak Hours Analysis", "Support Load Patterns", "High Traffic Period Review"] },
  { keywords: ["agent", "performance", "top performing"], titles: ["Agent Performance Review", "Team Performance Metrics", "Agent Productivity Analysis"] },
  { keywords: ["training", "coaching", "onboarding"], titles: ["Training Needs Assessment", "Agent Coaching Insights", "Skill Gap Analysis"] },
  { keywords: ["utilization", "capacity", "staffing"], titles: ["Agent Utilization Report", "Capacity Planning Analysis", "Staffing Level Review"] },
  { keywords: ["automation", "automate"], titles: ["Automation Opportunity Analysis", "Process Automation Review", "Automation ROI Assessment"] },
  { keywords: ["workflow", "process", "bottleneck"], titles: ["Workflow Efficiency Review", "Process Bottleneck Analysis", "Operational Flow Assessment"] },
  { keywords: ["channel", "email", "chat", "phone"], titles: ["Channel Performance Comparison", "Omnichannel Analytics", "Support Channel Review"] },
  { keywords: ["dashboard", "report", "summary", "overview"], titles: ["Custom Analytics Dashboard", "Support Performance Dashboard", "Executive Summary Dashboard"] },
  { keywords: ["forecast", "predict", "projection", "next month"], titles: ["Support Volume Forecast", "Predictive Analytics Review", "Demand Forecast Analysis"] },
  { keywords: ["cost", "roi", "budget", "spend"], titles: ["Cost Per Ticket Analysis", "Support ROI Assessment", "Budget Impact Review"] },
  { keywords: ["category", "topic", "type", "breakdown"], titles: ["Category Breakdown Analysis", "Topic Distribution Review", "Issue Type Analysis"] },
  { keywords: ["billing", "payment", "subscription"], titles: ["Billing Issue Analysis", "Payment Support Review", "Billing Inquiry Trends"] },
  { keywords: ["technical", "bug", "error"], titles: ["Technical Issue Analysis", "Bug Report Trends", "Technical Support Review"] },
  { keywords: ["feature request", "product feedback"], titles: ["Feature Request Analysis", "Product Feedback Review", "User Request Trends"] },
];

/** Generate a contextual conversation title from the user's query */
export const generateConversationName = (query: string): string => {
  const lower = query.toLowerCase();

  for (const rule of titleRules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      const index = query.length % rule.titles.length;
      return rule.titles[index];
    }
  }

  let cleaned = query
    .replace(/^(what|how|why|when|where|which|who|show me|tell me|give me|can you|could you|please|i want to|i'd like to|i need to)\s+/i, "")
    .replace(/[?.!]+$/, "")
    .trim();

  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  if (cleaned.length > 50) {
    cleaned = cleaned.substring(0, 47) + "...";
  }

  return cleaned || "New Conversation";
};

// ── Dashboard title generation ────────────────────────────────────────

export const generateDashboardTitle = (query: string): { title: string; description: string } => {
  const lower = query.toLowerCase();

  if (lower.includes("escalation")) return { title: "Escalation Trends Dashboard", description: "Track agent escalation rates, patterns, and root causes across support tiers" };
  if (lower.includes("knowledge") || lower.includes("article")) return { title: "Knowledge Base Performance Dashboard", description: "Article effectiveness, resolution rates, and content gap analysis" };
  if (lower.includes("copilot") || lower.includes("ai assist")) return { title: "Copilot Impact Dashboard", description: "AI assistant adoption, accuracy, and impact on agent productivity" };
  if (lower.includes("csat") || lower.includes("satisfaction")) return { title: "Customer Satisfaction Dashboard", description: "CSAT trends, driver analysis, and team-level satisfaction scores" };
  if (lower.includes("sentiment")) return { title: "Sentiment Analysis Dashboard", description: "Customer sentiment breakdown by channel, topic, and time period" };
  if (lower.includes("agent") || lower.includes("performance") || lower.includes("team")) return { title: "Team Performance Dashboard", description: "Agent metrics, productivity benchmarks, and performance comparisons" };
  if (lower.includes("channel")) return { title: "Channel Comparison Dashboard", description: "Cross-channel performance metrics, volume, and satisfaction scores" };
  if (lower.includes("volume") || lower.includes("ticket")) return { title: "Ticket Volume Dashboard", description: "Request volume trends, category breakdown, and capacity indicators" };
  if (lower.includes("automation") || lower.includes("workflow")) return { title: "Automation Insights Dashboard", description: "Automation opportunities, ROI projections, and workflow efficiency" };
  if (lower.includes("sla") || lower.includes("compliance")) return { title: "SLA Compliance Dashboard", description: "Service level adherence, breach analysis, and compliance trends" };
  if (lower.includes("resolution") || lower.includes("response time")) return { title: "Resolution & Response Dashboard", description: "Resolution rates, response times, and handle time analytics" };
  if (lower.includes("forecast") || lower.includes("predict")) return { title: "Predictive Analytics Dashboard", description: "Volume forecasts, trend projections, and capacity planning insights" };
  if (lower.includes("executive") || lower.includes("summary") || lower.includes("overview")) return { title: "Executive Summary Dashboard", description: "High-level KPIs, trends, and strategic insights for leadership review" };
  if (lower.includes("weekly") || lower.includes("monthly")) return { title: "Periodic Performance Dashboard", description: "Scheduled performance snapshots with period-over-period comparisons" };
  return { title: "Support Analytics Dashboard", description: "Comprehensive view of customer support performance metrics" };
};

// ── Widget data generation ────────────────────────────────────────────

export const generateWidgetData = (userMessage: string): WidgetData => {
  const lower = userMessage.toLowerCase();
  const id = `widget-${Date.now()}`;

  if (lower.includes("escalation")) {
    return {
      id, chartType: "area", title: "Escalation Rate", description: "Last 30 days trend",
      value: "12.4%", change: "+8%", trend: "up",
      data: [
        { week: "W1", rate: 9.2 }, { week: "W2", rate: 10.1 }, { week: "W3", rate: 11.3 },
        { week: "W4", rate: 12.4 }, { week: "W5", rate: 11.8 }, { week: "W6", rate: 12.4 },
      ],
      xKey: "week", yKey: "rate",
    };
  }
  if (lower.includes("csat") || lower.includes("satisfaction")) {
    return {
      id, chartType: "metric", title: "CSAT Score", description: "Overall customer satisfaction",
      value: "4.6 / 5", change: "+0.3", trend: "up",
      data: [], xKey: "", yKey: "",
    };
  }
  if (lower.includes("volume") || lower.includes("ticket")) {
    return {
      id, chartType: "bar", title: "Ticket Volume", description: "By category this month",
      value: "3,847", change: "+12%", trend: "up",
      data: [
        { category: "Billing", count: 842 }, { category: "Technical", count: 1156 },
        { category: "General", count: 987 }, { category: "Returns", count: 462 },
        { category: "Shipping", count: 400 },
      ],
      xKey: "category", yKey: "count",
    };
  }
  if (lower.includes("channel")) {
    return {
      id, chartType: "donut", title: "Channel Distribution", description: "Support requests by channel",
      value: "5,234", change: "+5%", trend: "up",
      data: [
        { channel: "Chat", volume: 2100 }, { channel: "Email", volume: 1450 },
        { channel: "Phone", volume: 984 }, { channel: "Social", volume: 700 },
      ],
      xKey: "channel", yKey: "volume",
    };
  }
  if (lower.includes("resolution") || lower.includes("response")) {
    return {
      id, chartType: "line", title: "Resolution Rate", description: "Weekly trend",
      value: "87%", change: "+3%", trend: "up",
      data: [
        { week: "W1", rate: 82 }, { week: "W2", rate: 84 }, { week: "W3", rate: 83 },
        { week: "W4", rate: 86 }, { week: "W5", rate: 85 }, { week: "W6", rate: 87 },
      ],
      xKey: "week", yKey: "rate",
    };
  }
  if (lower.includes("agent") || lower.includes("performance")) {
    return {
      id, chartType: "bar", title: "Agent Performance", description: "Top performers by resolution rate",
      value: "84%", change: "+6%", trend: "up",
      data: [
        { agent: "Team A", score: 92 }, { agent: "Team B", score: 87 },
        { agent: "Team C", score: 84 }, { agent: "Team D", score: 79 },
        { agent: "Team E", score: 76 },
      ],
      xKey: "agent", yKey: "score",
    };
  }

  const types: WidgetData["chartType"][] = ["area", "bar", "line", "donut", "metric"];
  const picked = types[userMessage.length % types.length];
  return {
    id, chartType: picked, title: "Key Metric Insight", description: "AI-generated analysis",
    value: "1,247", change: "+14%", trend: "up",
    data: [
      { period: "Jan", value: 820 }, { period: "Feb", value: 932 },
      { period: "Mar", value: 1015 }, { period: "Apr", value: 1147 },
      { period: "May", value: 1247 },
    ],
    xKey: "period", yKey: "value",
  };
};

// ── AI response generation ────────────────────────────────────────────

export type ExploreAIResponse = AssistantReplyPayload & {
  dashboardData?: DashboardData;
  widgetData?: WidgetData;
};

const exploreRecognizerKeywords = [
  "dashboard",
  "report",
  "summary",
  "insight",
  "trend",
  "analysis",
  "analytics",
  "metric",
  "metrics",
  "csat",
  "sentiment",
  "escalation",
  "resolution",
  "ticket",
  "tickets",
  "agent",
  "agents",
  "copilot",
  "automation",
  "sla",
  "volume",
  "handle time",
];

/**
 * Heuristic for first-turn Explore submissions:
 * - false for obvious noise / keyboard-smash-like input
 * - true for natural-language or support-analytics-intent prompts
 */
export function isRecognizableExplorePrompt(input: string): boolean {
  const text = input.trim();
  if (!text || text.length < 3) return false;

  const alphaNumCount = (text.match(/[a-z0-9]/gi) ?? []).length;
  if (alphaNumCount === 0) return false;

  const letterCount = (text.match(/[a-z]/gi) ?? []).length;
  if (letterCount === 0) return false;

  const nonSpaceCount = text.replace(/\s+/g, "").length;
  const symbolCount = (text.match(/[^a-z0-9\s]/gi) ?? []).length;
  const symbolRatio = symbolCount / Math.max(1, nonSpaceCount);

  const tokens = text.split(/\s+/).filter(Boolean);
  const singleToken = tokens.length === 1 ? tokens[0].toLowerCase() : "";
  const lower = text.toLowerCase();

  const isKeyboardSmashLikeSingleToken =
    singleToken.length >= 6 &&
    (!/[aeiou]/.test(singleToken) ||
      /[bcdfghjklmnpqrstvwxyz]{5,}/.test(singleToken) ||
      /(.)\1{3,}/.test(singleToken));

  if (isKeyboardSmashLikeSingleToken) return false;
  if (symbolRatio > 0.55 && tokens.length < 2) return false;

  if (text.includes("?")) return true;
  if (exploreRecognizerKeywords.some((keyword) => lower.includes(keyword))) return true;

  const wordLikeTokenCount = tokens.filter((token) => /[a-z]{2,}/i.test(token)).length;
  if (wordLikeTokenCount >= 2) return true;

  return singleToken.length >= 4 && /[aeiou]/.test(singleToken);
}

/** Default dashboard shell for Explore — keyed off the user query via {@link generateDashboardTitle}. */
export function buildExploreDashboardFromQuery(userMessage: string): DashboardData {
  const { title, description } = generateDashboardTitle(userMessage);
  return {
    id: `dash-${Date.now()}`,
    title,
    description,
    metrics: [
      { label: "Total Escalations", value: "260" },
      { label: "Avg Resolution Time", value: "4.3h" },
      { label: "Customer Satisfaction", value: "94%" },
      { label: "Resolution Rate", value: "87%" },
    ],
    chartData: {
      trend: [
        { date: "Jan 15", interactions: 245 },
        { date: "Jan 22", interactions: 312 },
        { date: "Jan 29", interactions: 287 },
        { date: "Feb 5", interactions: 398 },
        { date: "Feb 12", interactions: 456 },
        { date: "Feb 19", interactions: 512 },
        { date: "Feb 26", interactions: 478 },
      ],
      breakdown: [
        { category: "Technical Issues", volume: 342 },
        { category: "Billing Questions", volume: 187 },
        { category: "Feature Requests", volume: 156 },
        { category: "General Inquiry", volume: 289 },
        { category: "Bug Reports", volume: 98 },
      ],
    },
  };
}

export const WEST_CSAT_DASHBOARD_ID = "mock-dash-emea-containment";

function buildEmeaContainmentDashboard(): DashboardData {
  return {
    id: WEST_CSAT_DASHBOARD_ID,
    title: "EMEA Containment Drop — Frankfurt Storm Disruption",
    description: "Root-cause analysis of the 13-point containment decline overnight",
    metrics: [
      { label: "EMEA Containment", value: "78% (-13)" },
      { label: "Travelers Disrupted", value: "84,127" },
      { label: "Fare Mismatch Errors", value: "6,200 (+812%)" },
      { label: "Combined Recovery Est.", value: "+11 pts / 12h" },
    ],
    chartData: {
      trend: [
        { date: "00:00", interactions: 91 },
        { date: "01:00", interactions: 91 },
        { date: "02:00", interactions: 90 },
        { date: "03:00", interactions: 89 },
        { date: "04:00", interactions: 86 },
        { date: "05:00", interactions: 82 },
        { date: "06:00", interactions: 79 },
        { date: "07:00", interactions: 78 },
        { date: "08:00", interactions: 78 },
        { date: "09:00", interactions: 80 },
        { date: "10:00", interactions: 83 },
        { date: "11:00", interactions: 86 },
      ],
      breakdown: [
        { category: "Fare Rule Mismatch", volume: 6200 },
        { category: "Multi-Leg Rebooking", volume: 4100 },
        { category: "Hotel/Car Coordination", volume: 2800 },
        { category: "SLA Credit Disputes", volume: 1400 },
        { category: "Other", volume: 900 },
      ],
    },
  };
}

function buildDisruptionImpactDashboard(): DashboardData {
  return {
    id: "mock-dash-disruption-impact",
    title: "Frankfurt Storm — Financial Impact Snapshot",
    description: "Total operational and traveler-value impact of the overnight disruption",
    metrics: [
      { label: "Travelers Disrupted", value: "84,127" },
      { label: "Operational Saved vs Reactive", value: "$3.76M" },
      { label: "Maya Chen — Value Protected", value: "$840" },
      { label: "Premium Travelers Auto-Recovered", value: "1,284" },
    ],
    chartData: {
      trend: [
        { date: "00:00", interactions: 0 },
        { date: "02:00", interactions: 8400 },
        { date: "04:00", interactions: 24600 },
        { date: "06:00", interactions: 51200 },
        { date: "08:00", interactions: 72800 },
        { date: "10:00", interactions: 84127 },
      ],
      breakdown: [
        { category: "Auto-Rebooked (AI)", volume: 76555 },
        { category: "Specialist-Assisted", volume: 5384 },
        { category: "Premium Recovery (Human)", volume: 1284 },
        { category: "Pending", volume: 904 },
      ],
    },
  };
}

function buildAutomationOpportunityDashboard(): DashboardData {
  return {
    id: "mock-dash-automation-opportunity",
    title: "Top Automation Opportunities — Voya",
    description: "Where AI deployment unlocks the most agent capacity at Voya",
    metrics: [
      { label: "Total Annual Savings Identified", value: "$5.91M" },
      { label: "Agent Hours / Week Returned", value: "3,420" },
      { label: "Containment Lift Achievable", value: "+9.2 pts" },
      { label: "Travelers Self-Served", value: "1.16M / yr" },
    ],
    chartData: {
      trend: [
        { date: "Q1", interactions: 312 },
        { date: "Q2", interactions: 689 },
        { date: "Q3", interactions: 1124 },
        { date: "Q4", interactions: 1842 },
      ],
      breakdown: [
        { category: "Disruption Rebooking", volume: 612400 },
        { category: "Check-in & Boarding Pass", volume: 208330 },
        { category: "Itinerary Receipts", volume: 162000 },
        { category: "Refund & Voucher Status", volume: 94200 },
        { category: "Loyalty & Mileage", volume: 53560 },
        { category: "Baggage Tracking", volume: 32300 },
      ],
    },
  };
}

const emeaContainmentContent = `EMEA containment dropped 13 pts (91% → 78%) overnight when a Frankfurt storm grounded 84,127 travelers. Root cause: a fare-rule mismatch on 6,200 travelers, all on Copilot-off specialist desktops.

WHAT I FOUND

• 6,200 fare-class errors — 100% on Copilot-off desktops (vs 0.3% Copilot-on)
• 4,100 multi-leg rebookings overwhelmed the standard playbook
• SLA disputes 22.6% on manual cohort vs 0.12% on auto-rebooked cohort

ACTIONS

1. Guardian Agent outreach to the 6,200 affected travelers — recovers +6.4 pts in 12h
2. Force Copilot-on for disruption specialists — recovers +3.1 pts
3. Expand the disruption agent to handle hotel/car natively — recovers +1.5 pts

Containment back to ~89% by end of day. Dashboard on the right has the hourly trace.`;

const emeaContainmentReasoning =
  "I treated this as a multi-cause attribution problem rather than a single-driver lookup. I started by isolating EMEA's hourly containment to confirm the magnitude (-13 pts) and timing (concentrated 03:00-08:00 local), then pulled all 28,400 traveler interactions from the disruption window. Topic clustering on the transcripts surfaced a fare-class mismatch pattern that mapped 1:1 to specialists with Copilot disabled. From there I pulled rebooking complexity data, the disruption agent action log, and SLA credit dispute volume to identify the contributing causes, and ranked actions by expected containment recovery so the Guardian Agent outreach can ship within the disruption window.";

const emeaContainmentSources = [
  {
    label: "Voya Disruption Ops feed",
    url: "/explore",
    snippet: "84,127 travelers grounded across Central Europe; Frankfurt epicenter from 02:00 local",
  },
  {
    label: "Snowflake — traveler_interactions_emea",
    url: "/explore",
    snippet: "28,400 interactions during the disruption window (03:00-12:00 local)",
  },
  {
    label: "Agent desktop telemetry — Copilot state",
    url: "/explore",
    snippet: "100% of fare-class errors on Copilot-off desktops; 0.3% error rate Copilot-on",
  },
  {
    label: "Booking system — fare class change log",
    url: "/explore",
    snippet: "6,200 fare-class corrections detected within the rebooking flow",
  },
  {
    label: "Disruption agent action log",
    url: "/explore",
    snippet: "76,555 travelers auto-rebooked end-to-end; 5,384 escalated to specialists",
  },
  {
    label: "SLA credit dispute queue",
    url: "/explore",
    snippet: "Dispute rate 22.6% on manual-rebook cohort vs 0.12% on AI-rebooked cohort",
  },
];

const emeaContainmentToolSteps: AssistantReplyPayload["toolSteps"] = [
  {
    label: "Identify question scope",
    status: "done",
    detail: "Detected region (EMEA), KPI (containment), and event (Frankfurt storm).",
  },
  {
    label: "Pull EMEA traveler interactions",
    status: "done",
    detail: "Queried Snowflake for 28,400 interactions in the disruption window.",
  },
  {
    label: "Cross-reference Copilot adoption telemetry",
    status: "done",
    detail: "Joined desktop telemetry; isolated Copilot-off cohort with 4.8% fare-class error rate.",
  },
  {
    label: "Cluster transcripts by failure mode",
    status: "done",
    detail: "Found 6,200 fare-class mismatches and 4,100 multi-leg coordination failures.",
  },
  {
    label: "Pull SLA credit dispute volume",
    status: "done",
    detail: "Manual-rebook cohort: 22.6% dispute rate vs 0.12% on AI-rebooked cohort.",
  },
  {
    label: "Synthesize & rank actions",
    status: "done",
    detail:
      "Attribution: fare mismatch 6.4pts, Copilot gap 3.1pts, multi-leg coordination 1.5pts. Guardian Agent outreach prepared.",
  },
];

const disruptionImpactContent = `$3.76M saved vs a reactive response. 91% of the 84,127 grounded travelers were auto-rebooked end-to-end before they woke up.

THE NUMBERS

• 76,555 auto-rebooked by the disruption agent
• 5,384 specialist-assisted (avg 4.2 min)
• 1,284 premium travelers proactively recovered
• 904 still pending multi-carrier coordination

VALUE PROTECTED

• Maya Chen (Platinum, $94K spend) auto-rebooked LHR→SIN via DOH — $840 protected
• $1.07M total Platinum value protected
• Social sentiment held flat (vs typical –18pt crater)
• ~3,200 specialist-hours conserved

LATENT RISK

6,200 travelers hit a fare-rule mismatch on Copilot-off desktops — $5.2M dispute exposure. Guardian Agent queued to rebook them with corrected fare rules in the next 12 hours.`;

const disruptionImpactReasoning =
  "I framed this as an event-impact roll-up rather than a diagnostic. I started from the disruption ops feed (84,127 grounded), joined to the rebooking action log to attribute resolution paths (auto / specialist / pending), then cross-referenced premium traveler value protection from the loyalty system. I modeled the operational savings against the 2024 reactive-response baseline (per-traveler avg cost during equivalent events). Finally I surfaced the latent risk — the 6,200 fare-rule mismatches — so the impact picture isn't artificially clean, and so leadership can authorize the Guardian Agent outreach.";

const disruptionImpactSources = [
  {
    label: "Voya Disruption Ops feed",
    url: "/explore",
    snippet: "84,127 travelers grounded across Central Europe overnight",
  },
  {
    label: "Disruption agent action log",
    url: "/explore",
    snippet: "76,555 auto-rebooked, 5,384 specialist-assisted, 904 pending",
  },
  {
    label: "Loyalty system — Platinum value protection",
    url: "/explore",
    snippet: "1,284 Platinum travelers recovered; $1.07M aggregate value protected",
  },
  {
    label: "Reactive-response cost model (2024 baseline)",
    url: "/explore",
    snippet: "Avg $44.70 per-traveler reactive cost during prior major-disruption events",
  },
  {
    label: "Brandwatch — social sentiment timeline",
    url: "/explore",
    snippet: "EMEA sentiment held flat post-disruption vs typical –18pt crater",
  },
];

const disruptionImpactToolSteps: AssistantReplyPayload["toolSteps"] = [
  {
    label: "Pull disruption event scope",
    status: "done",
    detail: "84,127 travelers grounded across Central Europe overnight; Frankfurt epicenter.",
  },
  {
    label: "Join rebooking action log",
    status: "done",
    detail: "Attributed 76,555 auto / 5,384 specialist / 1,284 premium / 904 pending.",
  },
  {
    label: "Compute premium value protected",
    status: "done",
    detail: "1,284 Platinum travelers recovered; $1.07M aggregate value protected.",
  },
  {
    label: "Model operational savings",
    status: "done",
    detail: "Compared against 2024 baseline; $3.76M saved vs reactive response.",
  },
  {
    label: "Surface latent risk",
    status: "done",
    detail: "6,200 fare-rule mismatches detected; $5.2M dispute exposure if uncorrected.",
  },
];

const automationOpportunityContent = `$5.91M in annual savings and 3,420 specialist-hours/week available across the contact center. Containment moves from 91% → ~96% if the top 3 ship.

TOP 3 OPPORTUNITIES

1. Disruption Rebooking — $3.76M/yr (612K events). Proven last night.
2. Check-in & Boarding Pass — $540K/yr (208K calls). Multimodal AI fit.
3. Itinerary Receipt Explanation — $420K/yr (162K calls). Deterministic flow.

NEXT TIER ($1.19M combined)

Refund & Voucher Status, Loyalty & Mileage, Baggage Tracking & Claims.

WHERE NOT TO AUTOMATE

Premium recovery during major disruptions, accessibility cases, and SLA disputes above $2,800. Keep humans on the moments that need judgment — that's where the freed-up hours redirect.`;

const automationOpportunityReasoning =
  "I treated this as a portfolio question, not a single-opportunity ask. I pulled the full topic taxonomy from the contact center, joined to handle-time and call-volume data, scored each topic on automation readiness (deterministic flow, knowledge maturity, Copilot uptake) and traveler impact (volume, value protected). I deliberately separated the 'do not automate yet' bucket — high-empathy and policy-bound work — because the storyboard is explicit that Voya wants AI handling routine flows so humans can focus on the moments that genuinely require judgment.";

const automationOpportunitySources = [
  {
    label: "Voya contact center topic taxonomy",
    url: "/explore",
    snippet: "Full topic and subtopic mix with annual volume and handle-time medians",
  },
  {
    label: "Disruption ops baseline",
    url: "/explore",
    snippet: "612K disruption-related events / yr across weather, ATC, crewing, and operational causes",
  },
  {
    label: "Containment performance by topic",
    url: "/explore",
    snippet: "Topics with deterministic flows score 88-94% containment when AI is deployed",
  },
  {
    label: "Specialist time-allocation snapshot",
    url: "/explore",
    snippet: "3,420 hours/wk currently spent on the top-3 topics, holding 38% of agent capacity",
  },
];

const automationOpportunityToolSteps: AssistantReplyPayload["toolSteps"] = [
  {
    label: "Pull topic taxonomy & volume",
    status: "done",
    detail: "Retrieved full contact-center topic mix with annual volume and handle-time medians.",
  },
  {
    label: "Score automation readiness",
    status: "done",
    detail: "Composite score: deterministic flow + knowledge maturity + Copilot uptake.",
  },
  {
    label: "Compute potential savings",
    status: "done",
    detail: "Sum across top topics: $5.91M annual savings, 3,420 specialist-hours/wk returned.",
  },
  {
    label: "Identify do-not-automate set",
    status: "done",
    detail: "Premium recovery, accessibility, and policy-bound disputes excluded by design.",
  },
  {
    label: "Rank by demo-readiness",
    status: "done",
    detail: "Top 3 prioritized by ability to ship in-quarter with current Agent Forge primitives.",
  },
];

function buildAhtImprovementDashboard(): DashboardData {
  return {
    id: "mock-dash-aht-improvement",
    title: "Average Handle Time — Improvement Levers",
    description: "AHT breakdown by driver, with projected gains from each lever",
    metrics: [
      { label: "Current AHT", value: "11m 42s" },
      { label: "Gap to Industry", value: "+3m 14s" },
      { label: "Recoverable / Call", value: "5m 12s" },
      { label: "Annual Savings", value: "$4.2M" },
    ],
    chartData: {
      trend: [
        { date: "W1", interactions: 718 },
        { date: "W2", interactions: 705 },
        { date: "W3", interactions: 712 },
        { date: "W4", interactions: 702 },
        { date: "W5", interactions: 690 },
        { date: "W6", interactions: 668 },
      ],
      breakdown: [
        { category: "Knowledge lookup", volume: 224 },
        { category: "Multi-leg rebooking", volume: 178 },
        { category: "Refund disputes", volume: 144 },
        { category: "System hopping", volume: 96 },
        { category: "Other", volume: 60 },
      ],
    },
  };
}

const ahtImprovementContent = `AHT averages 11m 42s — 38% above industry baseline. The biggest lever is Copilot adoption: specialists with Copilot active average 4m 02s.

WHAT'S DRIVING IT

• Without Copilot: 8m 46s (50% of specialists)
• Multi-leg rebookings: 9m 18s avg
• Refund disputes: 7m 24s avg
• Knowledge lookups eat 32% of total handle time

ACTIONS

1. Force Copilot-on for all specialists during peak — recovers ~3 min/call
2. Real-time knowledge auto-fetch (already in Agent Forge backlog)
3. Deploy refund agent to handle voucher splits autonomously

Target: AHT to 6m 30s within 30 days.`;

const ahtImprovementReasoning =
  "I framed this as a lever analysis, not a single root cause. I pulled handle-time medians by topic, joined to Copilot adoption telemetry to isolate the highest-impact lever, then segmented the residual time by activity (knowledge lookup, system hopping, multi-leg complexity) to find what to automate. Actions are ranked by per-call minute recovery × call volume affected, so the top action wins on both magnitude and breadth.";

const ahtImprovementSources = [
  { label: "Snowflake — interaction handle-time medians", url: "/explore", snippet: "11m 42s avg AHT across 28K daily interactions" },
  { label: "Agent desktop telemetry — Copilot state", url: "/explore", snippet: "50% of specialists currently work without Copilot active" },
  { label: "Topic taxonomy — handle-time by topic", url: "/explore", snippet: "Multi-leg rebooking 9m 18s, Refund disputes 7m 24s" },
  { label: "Activity-level call analysis", url: "/explore", snippet: "Knowledge lookup accounts for 32% of total handle time" },
];

const ahtImprovementToolSteps: AssistantReplyPayload["toolSteps"] = [
  { label: "Pull AHT distribution", status: "done", detail: "Median 11m 42s across 28K daily interactions; right-skew on rebooking topics." },
  { label: "Cross-reference Copilot adoption", status: "done", detail: "Copilot-on specialists average 4m 02s vs 8m 46s Copilot-off." },
  { label: "Segment residual handle time", status: "done", detail: "Knowledge lookup, system hopping, and multi-leg complexity drive 70% of the gap." },
  { label: "Rank levers by recoverable minutes", status: "done", detail: "Top 3 levers recover an estimated 5m 12s per call combined." },
];

function buildAiAgentsStrugglingDashboard(): DashboardData {
  return {
    id: "mock-dash-ai-agents-struggling",
    title: "AI Agent Performance — Three Agents Degrading",
    description: "Containment, escalation rate, and failure mode by struggling agent",
    metrics: [
      { label: "Voya-Refunds Containment", value: "69% (-22)" },
      { label: "Voya-Baggage Loop Rate", value: "412 / 24h" },
      { label: "Voya-Loyalty Escalations", value: "4.2× baseline" },
      { label: "Combined Recovery (7d)", value: "+19 pts" },
    ],
    chartData: {
      trend: [
        { date: "Mon", interactions: 91 },
        { date: "Tue", interactions: 90 },
        { date: "Wed", interactions: 88 },
        { date: "Thu", interactions: 84 },
        { date: "Fri", interactions: 78 },
        { date: "Sat", interactions: 72 },
        { date: "Sun", interactions: 69 },
      ],
      breakdown: [
        { category: "Knowledge gap (Refunds)", volume: 1840 },
        { category: "Tool gap (Baggage)", volume: 412 },
        { category: "Training gap (Loyalty)", volume: 286 },
        { category: "Healthy escalations", volume: 124 },
      ],
    },
  };
}

const aiAgentsStrugglingContent = `Three of your ten production AI agents are degrading this week. Each is failing for a different reason — knowledge, tool, or training — and each has a fast, specific fix.

WHAT'S BREAKING

• Voya-Refunds — containment 91% → 69%. Failure mode: multi-currency voucher splits. The agent has no logic for converting partial-refund vouchers between currencies. 1,840 escalations in 24h, all clustering on this one topic.

• Voya-Baggage — agent retries the same EU261 compensation calculation 3-5 times before giving up. 412 detected loops in 24h. Root cause: no dedicated EU261 calculator tool wired into the agent's action set.

• Voya-Loyalty — escalating tier-qualification edge cases at 4.2× baseline. Specifically: partner-airline segments toward Platinum tier. The agent's evaluation set has very few partner-segment examples, so it errs on the side of human handover.

ACTIONS

1. Publish multi-currency voucher logic to Voya-Refunds knowledge base — recovers +18 pts containment within 48h
2. Build and deploy an EU261 calculator tool to Voya-Baggage — eliminates the 412 daily loops, recovers ~+5 pts
3. Add 200 partner-airline tier-qualification examples to Voya-Loyalty eval set + retrain — recovers +8 pts within 7 days

Target: all three agents back above 89% containment within 7 days. Combined: +19 pts containment recovered, ~2,540 daily escalations eliminated.`;

const aiAgentsStrugglingReasoning =
  "I scanned all 10 production agents for week-over-week containment degradation, then categorized each failure into one of three repair patterns: knowledge gap (KB content missing), tool gap (agent missing a needed action), or training gap (eval set under-represents the failure case). The three agents flagged each fall cleanly into one category — which is good news for fix velocity. Actions are ordered by speed-to-recover: knowledge edits ship in hours, tool deployment in days, training/eval updates in a week.";

const aiAgentsStrugglingSources = [
  { label: "Agent containment leaderboard (week-over-week)", url: "/explore", snippet: "Voya-Refunds -22pts, Voya-Baggage -7pts, Voya-Loyalty -4pts; other 7 agents stable" },
  { label: "Voya-Refunds escalation cluster", url: "/explore", snippet: "1,840 / 1,840 escalations match \"voucher\" + \"currency\" intent — 100% concentration" },
  { label: "Voya-Baggage tool-call log", url: "/explore", snippet: "412 loops on EU261-compensation tool path; agent retries same call 3-5x" },
  { label: "Voya-Loyalty eval-set coverage", url: "/explore", snippet: "Partner-airline segments: 12 examples in eval set vs 1,400 in production" },
  { label: "Agent Forge — repair-pattern playbooks", url: "/explore", snippet: "Knowledge / tool / training fix templates with expected recovery curves" },
];

const aiAgentsStrugglingToolSteps: AssistantReplyPayload["toolSteps"] = [
  { label: "Scan all 10 agents for WoW degradation", status: "done", detail: "Three agents flagged with >4pt week-over-week containment drop; seven stable." },
  { label: "Cluster Voya-Refunds escalation reasons", status: "done", detail: "1,840/1,840 escalations on multi-currency voucher math — 100% topic concentration → knowledge gap." },
  { label: "Inspect Voya-Baggage tool-call traces", status: "done", detail: "412 loops on EU261 calc; agent retries same tool path 3-5x → missing dedicated calculator." },
  { label: "Audit Voya-Loyalty eval-set coverage", status: "done", detail: "Partner-airline tier-qualification under-represented (12 / 1,400) → training gap." },
  { label: "Match each failure to a repair pattern", status: "done", detail: "Knowledge / tool / training — three different fast paths, ranked by speed-to-recover." },
];

function generateAIResponseCore(userMessage: string): ExploreAIResponse {
  const mock = () => buildMockAssistantFields(userMessage);
  const lowerMessage = userMessage.toLowerCase();
  const wantsWidget = lowerMessage.includes("widget") || lowerMessage.includes("insight");
  const wantsDashboard = lowerMessage.includes("dashboard");

  const widgetData = wantsWidget ? generateWidgetData(userMessage) : undefined;

  // AI agents struggling / refund agent — checked first so they take priority
  // over the broader containment / disruption matchers below.
  if (
    (lowerMessage.includes("ai agent") || lowerMessage.includes("agents")) &&
    (lowerMessage.includes("struggl") ||
      lowerMessage.includes("failing") ||
      lowerMessage.includes("underperform") ||
      lowerMessage.includes("degrad") ||
      lowerMessage.includes("right now"))
  ) {
    return {
      content: aiAgentsStrugglingContent,
      reasoning: aiAgentsStrugglingReasoning,
      sources: aiAgentsStrugglingSources,
      toolSteps: aiAgentsStrugglingToolSteps,
      dashboardData: buildAiAgentsStrugglingDashboard(),
    };
  }

  if (
    lowerMessage.includes("refund") &&
    (lowerMessage.includes("dropped") ||
      lowerMessage.includes("crash") ||
      lowerMessage.includes("knowledge wall") ||
      lowerMessage.includes("voucher") ||
      (lowerMessage.includes("agent") && lowerMessage.includes("containment")))
  ) {
    return {
      content: aiAgentsStrugglingContent,
      reasoning: aiAgentsStrugglingReasoning,
      sources: aiAgentsStrugglingSources,
      toolSteps: aiAgentsStrugglingToolSteps,
      dashboardData: buildAiAgentsStrugglingDashboard(),
    };
  }

  if (
    lowerMessage.includes("aht") ||
    lowerMessage.includes("handle time") ||
    lowerMessage.includes("average handle")
  ) {
    return {
      content: ahtImprovementContent,
      reasoning: ahtImprovementReasoning,
      sources: ahtImprovementSources,
      toolSteps: ahtImprovementToolSteps,
      dashboardData: buildAhtImprovementDashboard(),
    };
  }

  if (
    lowerMessage.includes("emea") ||
    lowerMessage.includes("frankfurt") ||
    (lowerMessage.includes("containment") &&
      (lowerMessage.includes("storm") ||
        lowerMessage.includes("disruption") ||
        lowerMessage.includes("recover")))
  ) {
    return {
      content: emeaContainmentContent,
      reasoning: emeaContainmentReasoning,
      sources: emeaContainmentSources,
      toolSteps: emeaContainmentToolSteps,
      dashboardData: buildEmeaContainmentDashboard(),
    };
  }

  if (
    lowerMessage.includes("financial impact") ||
    lowerMessage.includes("business impact") ||
    lowerMessage.includes("cost of") ||
    lowerMessage.includes("measure the impact") ||
    (lowerMessage.includes("disruption") && lowerMessage.includes("impact"))
  ) {
    return {
      content: disruptionImpactContent,
      reasoning: disruptionImpactReasoning,
      sources: disruptionImpactSources,
      toolSteps: disruptionImpactToolSteps,
      dashboardData: buildDisruptionImpactDashboard(),
    };
  }

  if (
    lowerMessage.includes("automation opportunit") ||
    lowerMessage.includes("automate") ||
    ((lowerMessage.includes("automation") || lowerMessage.includes("automate")) &&
      (lowerMessage.includes("agent hour") ||
        lowerMessage.includes("agent-hour") ||
        lowerMessage.includes("specialist hour") ||
        lowerMessage.includes("free up") ||
        lowerMessage.includes("identify") ||
        lowerMessage.includes("highest-impact") ||
        lowerMessage.includes("opportunit")))
  ) {
    return {
      content: automationOpportunityContent,
      reasoning: automationOpportunityReasoning,
      sources: automationOpportunitySources,
      toolSteps: automationOpportunityToolSteps,
      dashboardData: buildAutomationOpportunityDashboard(),
    };
  }

  if (lowerMessage.includes("escalation") || lowerMessage.includes("trend")) {
    return {
      content: "Based on the data from the last 30 days, I've analyzed the agent escalation trends. The escalation rate has increased by 8% to 12.4%, primarily driven by complex technical issues in the product support category. The peak escalation times are between 2-4 PM EST. Would you like me to break this down by support tier or product category?",
      widgetData,
      ...mock(),
    };
  }

  if (lowerMessage.includes("knowledge") || lowerMessage.includes("article")) {
    return {
      content: "I've analyzed the knowledge article performance data. The top 5 articles that drive resolution account for 45% of all self-service resolutions. 'How to reset your password' leads with 2,847 views and an 89% resolution rate. However, I noticed 3 articles with high traffic but low resolution rates that may need updates. Shall I provide more details?",
      widgetData,
      ...mock(),
    };
  }

  if (lowerMessage.includes("copilot") || lowerMessage.includes("resolution")) {
    return {
      content: "Comparing Copilot usage with resolution rates shows a strong positive correlation. Teams with >70% Copilot adoption have an average resolution rate of 84%, compared to 68% for teams with lower adoption. The data suggests that Copilot is most effective for tier-1 support issues. Would you like to see this broken down by team or issue category?",
      widgetData,
      ...mock(),
    };
  }

  if (wantsDashboard) {
    const { title } = generateDashboardTitle(userMessage);
    return {
      content: `I've generated a "${title}" based on your request. You can view and interact with it in the panel on the right. Save it to keep it in your collection, or close the panel to continue our conversation.`,
      widgetData,
      ...mock(),
      dashboardData: buildExploreDashboardFromQuery(userMessage),
    };
  }

  if (wantsWidget) {
    return {
      content: "Here's an insight based on your request. The data shows notable patterns in the metrics you're tracking. Let me know if you'd like me to explore specific aspects further or generate a full dashboard.",
      widgetData,
      ...mock(),
    };
  }

  return {
    content: "I've analyzed your request regarding customer support data. The insights show interesting patterns in user behavior and support performance. Let me know if you'd like me to dive deeper into any specific metrics or create a custom dashboard for tracking these trends.",
    ...mock(),
  };
}

export type GenerateExploreAIResponseOptions = {
  /**
   * When true, attach {@link buildExploreDashboardFromQuery}
   * if the core reply did not already include dashboard data — avoids an empty dashboard panel.
   */
  seedDashboard?: boolean;
  /** @deprecated Prefer `seedDashboard`. */
  seedDashboardForTypeahead?: boolean;
};

export const generateAIResponse = (
  userMessage: string,
  options?: GenerateExploreAIResponseOptions,
): ExploreAIResponse => {
  const res = generateAIResponseCore(userMessage);
  const shouldSeedDashboard = options?.seedDashboard ?? options?.seedDashboardForTypeahead ?? false;
  if (shouldSeedDashboard && !res.dashboardData) {
    return { ...res, dashboardData: buildExploreDashboardFromQuery(userMessage) };
  }
  return res;
};
