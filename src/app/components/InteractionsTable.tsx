import { useMemo, useState } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Globe,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  ListFilter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "./ui/utils";
import type {
  InteractionChannel,
  InteractionRow,
} from "../types/conversation-types";

interface InteractionsTableProps {
  interactions: InteractionRow[];
  /** Optional title override; defaults to "Relevant Interactions". */
  title?: string;
  /** Optional sub-headline below the title. */
  subtitle?: string;
}

const CHANNEL_TABS: Array<{ id: "all" | InteractionChannel; label: string }> = [
  { id: "all", label: "All" },
  { id: "voice", label: "Voice" },
  { id: "chat", label: "Chat" },
  { id: "email", label: "Email" },
  { id: "web", label: "Web messaging" },
];

const FILTER_PILLS = [
  { label: "Date range", value: "Last 24 hours" },
  { label: "Channel", value: "All" },
  { label: "Skill", value: "Disruption" },
  { label: "Direction", value: "All" },
];

function ChannelIcon({ channel }: { channel: InteractionChannel }) {
  const iconClass = "h-4 w-4 text-muted-foreground";
  switch (channel) {
    case "voice":
      return <Phone className={iconClass} aria-label="Voice" />;
    case "chat":
      return <MessageSquare className={iconClass} aria-label="Chat" />;
    case "email":
      return <Mail className={iconClass} aria-label="Email" />;
    case "web":
      return <Globe className={iconClass} aria-label="Web messaging" />;
  }
}

function DirectionIcon({ direction }: { direction: "inbound" | "outbound" }) {
  return direction === "inbound" ? (
    <ArrowDownLeft className="h-3.5 w-3.5 text-muted-foreground" aria-label="Inbound" />
  ) : (
    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-label="Outbound" />
  );
}

/** Three-segment sentiment bar (negative / neutral / positive) where the value places the marker. */
function SentimentBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex w-full items-center gap-2 min-w-[120px]">
      <div className="flex h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full bg-red-500"
          style={{ width: clamped < 40 ? `${100 - (clamped / 40) * 30}%` : "30%" }}
          aria-hidden
        />
        <div className="h-full bg-amber-400" style={{ width: "30%" }} aria-hidden />
        <div
          className="h-full bg-emerald-500"
          style={{ width: clamped > 60 ? `${30 + ((clamped - 60) / 40) * 40}%` : "40%" }}
          aria-hidden
        />
      </div>
      <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
        {clamped}
      </span>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 80
      ? "text-emerald-700 dark:text-emerald-400"
      : score >= 60
      ? "text-amber-700 dark:text-amber-400"
      : "text-red-700 dark:text-red-400";
  return <span className={cn("text-sm font-semibold tabular-nums", tone)}>{score.toFixed(1)}</span>;
}

function FlagBadge({ flag }: { flag: NonNullable<InteractionRow["flag"]> }) {
  const labelMap: Record<NonNullable<InteractionRow["flag"]>, string> = {
    "fare-mismatch": "Fare-class error",
    "rebooking-loop": "Rebooking loop",
    "policy-breach": "Policy breach",
  };
  return (
    <Badge
      variant="outline"
      className="ml-2 h-5 border-red-300 bg-red-50 px-1.5 text-[11px] font-medium leading-none text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
    >
      {labelMap[flag]}
    </Badge>
  );
}

export function InteractionsTable({
  interactions,
  title = "Relevant Interactions",
  subtitle = "Sample of interactions that drove this anomaly. Click any row in OD to drill into the call.",
}: InteractionsTableProps) {
  const [activeChannel, setActiveChannel] = useState<"all" | InteractionChannel>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: interactions.length };
    for (const interaction of interactions) {
      c[interaction.channel] = (c[interaction.channel] ?? 0) + 1;
    }
    return c;
  }, [interactions]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return interactions.filter((interaction) => {
      if (activeChannel !== "all" && interaction.channel !== activeChannel) return false;
      if (!trimmed) return true;
      return (
        interaction.id.toLowerCase().includes(trimmed) ||
        interaction.skill.toLowerCase().includes(trimmed)
      );
    });
  }, [activeChannel, interactions, query]);

  return (
    <section className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm">
      <header className="flex flex-col gap-1 border-b border-border/60 px-4 py-3">
        <h3 className="text-base font-semibold leading-6">{title}</h3>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </header>

      {/* Filter pills + search */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <ListFilter className="mr-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          {FILTER_PILLS.map((pill) => (
            <Badge
              key={pill.label}
              variant="secondary"
              className="h-6 cursor-default px-2 font-normal text-muted-foreground"
            >
              <span className="text-[11px] uppercase tracking-wide">{pill.label}:</span>
              <span className="ml-1 text-xs text-foreground">{pill.value}</span>
            </Badge>
          ))}
        </div>
        <div className="relative ml-auto w-full max-w-[240px]">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search interaction ID or skill"
            className="h-7 w-full rounded-md border border-border/60 bg-background pl-7 pr-2 text-xs outline-none ring-0 placeholder:text-muted-foreground/70 focus-visible:border-primary/40"
          />
        </div>
      </div>

      {/* Channel tabs */}
      <div className="border-b border-border/60 px-4 py-2">
        <Tabs value={activeChannel} onValueChange={(v) => setActiveChannel(v as typeof activeChannel)}>
          <TabsList className="h-8 bg-muted/40">
            {CHANNEL_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-7 gap-1.5 px-3 text-xs"
              >
                {tab.label}
                <span className="rounded-full bg-muted px-1.5 py-0 text-[10px] font-semibold tabular-nums text-muted-foreground">
                  {counts[tab.id] ?? 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs uppercase tracking-wide text-muted-foreground">
                <input type="checkbox" aria-label="Select all" className="h-3.5 w-3.5 rounded border-border" />
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">ID</TableHead>
              <TableHead className="w-24 text-xs uppercase tracking-wide text-muted-foreground">Channel</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Initiated</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Duration</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Skill</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Sentiment</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-6 text-center text-sm text-muted-foreground">
                  No interactions match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="w-12">
                    <input
                      type="checkbox"
                      aria-label={`Select interaction ${interaction.id}`}
                      className="h-3.5 w-3.5 rounded border-border"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{interaction.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <ChannelIcon channel={interaction.channel} />
                      <DirectionIcon direction={interaction.direction} />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {interaction.initiated}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-xs">
                    {interaction.duration}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{interaction.skill}</span>
                    {interaction.flag ? <FlagBadge flag={interaction.flag} /> : null}
                  </TableCell>
                  <TableCell>
                    <SentimentBar value={interaction.sentiment} />
                  </TableCell>
                  <TableCell className="text-right">
                    <ScoreBadge score={interaction.score} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
