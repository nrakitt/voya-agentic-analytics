/**
 * Shared domain types for explore thread messages, global chat, and chart payloads.
 */

/** Tabular / series row for charts and mock APIs (avoids `Record<string, any>`). */
export type ChartRow = Record<string, string | number | boolean | null | undefined>;

export interface DashboardData {
  id: string;
  title: string;
  description: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  chartData?: {
    trend?: ChartRow[];
    breakdown?: ChartRow[];
  };
  /**
   * Optional drill-down list of contact-center interactions that prove the
   * dashboard's anomaly / root cause. Rendered as a table on the dashboard.
   */
  relevantInteractions?: InteractionRow[];
}

export type InteractionChannel = "voice" | "chat" | "email" | "web";
export type InteractionDirection = "inbound" | "outbound";

export interface InteractionRow {
  /** Display id, e.g. "VYA-2026-0428-3491". */
  id: string;
  channel: InteractionChannel;
  direction: InteractionDirection;
  /** ISO 8601 or human-readable timestamp shown verbatim. */
  initiated: string;
  /** Display duration, e.g. "00:15:42". */
  duration: string;
  /** Skill / queue, e.g. "Disruption Rebooking". */
  skill: string;
  /** 0–100; drives the sentiment bar visualization. */
  sentiment: number;
  /** Hybrid CX score, e.g. 42.1. */
  score: number;
  /** Optional callout — used to highlight rows tied to the anomaly's root cause. */
  flag?: "fare-mismatch" | "rebooking-loop" | "policy-breach";
}

/** Badge + anchor metadata when a user prompt originates from a widget. */
export interface WidgetMessageMeta {
  widgetRef?: string;
  widgetKpiLabel?: string;
  /** Serialized chart kind; validate with `isChartType` from ChartVariants when rendering icons. */
  widgetIconType?: string;
  widgetAnchorId?: string;
  /** Route path where this source widget lives (used for cross-page source badge navigation). */
  widgetSourcePath?: string;
}

/** Optional context attached when a conversation is started from anomaly investigation actions. */
export interface AnomalyInsightSnapshot {
  id?: number;
  title: string;
  description: string;
  detail: string;
  severity?: "Critical" | "High" | "Medium";
  timestamp?: string;
}

export interface AnomalyInvestigationMeta {
  /** Source of the anomaly investigation trigger. */
  source: "top-insight" | "manual";
  /** Snapshot from the triggering insight card when available. */
  insight?: AnomalyInsightSnapshot;
}

/** Citation or grounding reference shown below an assistant message. */
export interface AssistantMessageSource {
  /** Short label shown in the UI (and used to match dashboard cards when `widgetRef` is unset). */
  label: string;
  url?: string;
  /** When set, scroll/highlight uses this element id first. */
  widgetAnchorId?: string;
  /** Title of the dashboard widget to find via card title match (preferred over parsing `label`). */
  widgetRef?: string;
  snippet?: string;
}

export type AssistantToolStepStatus = "done" | "running";

export interface AssistantToolStep {
  label: string;
  status: AssistantToolStepStatus;
  /** One-line note shown when the step completes or inside the disclosure. */
  detail?: string;
}

/**
 * Optional structured fields on assistant turns (mock data today; map streamed LLM parts here later).
 * When wiring Vercel AI SDK / AI Gateway, merge `text` chunks into `content` and map reasoning,
 * source-url / citation, and tool-invocation parts into these fields.
 */
export interface AssistantStructuredFields {
  reasoning?: string;
  sources?: AssistantMessageSource[];
  toolSteps?: AssistantToolStep[];
}

/**
 * Assistant reply body used by dashboard mock generators and future HTTP/stream handlers.
 *
 * **Streaming (e.g. Vercel AI SDK / AI Gateway):** append text deltas into `content`; map extended
 * thinking / reasoning streams to `reasoning`; map citation or `source-url`-style parts to
 * `sources`; map tool-call progress to `toolSteps` (`running` until settled, then `done`).
 * The assistant panel (`DashboardChatPanel` → `AssistantMessageBlocks`) already renders these fields.
 */
export type AssistantReplyPayload = AssistantStructuredFields & {
  content: string;
};
