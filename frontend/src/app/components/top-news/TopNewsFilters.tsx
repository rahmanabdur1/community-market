"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TopNewsKind } from "@/types/top-news.type";
import { memo } from "react";

const KINDS: TopNewsKind[] = [
  "Fantasy",
  "Trade",
  "Rumors",
  "Draft",
  "Stats",
  "Predictions",
  "Buzz",
];

export interface TopNewsFiltersProps {
  activeKind: TopNewsKind;
  onKindChange: (k: TopNewsKind) => void;
  scope: "All" | "NFL" | "NBA" | "MLB" | "NHL";
  onScopeChange: (s: "All" | "NFL" | "NBA" | "MLB" | "NHL") => void;
}

function TopNewsFiltersBase({
  activeKind,
  onKindChange,
  scope,
  onScopeChange,
}: TopNewsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Button
            key={k}
            variant={activeKind === k ? "secondary" : "ghost"}
            className={cn(
              "h-9 rounded-md border",
              activeKind === k
                ? "bg-primary text-foreground border-transparent"
                : "bg-muted text-foreground"
            )}
            onClick={() => onKindChange(k)}
          >
            {k}
          </Button>
        ))}
      </div>

      {/* scope select on the right */}
      <Select
        value={scope}
        onValueChange={(v) =>
          onScopeChange(v as "All" | "NFL" | "NBA" | "MLB" | "NHL")
        }
      >
        <SelectTrigger className="h-10 w-[140px] rounded-lg bg-muted">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="NFL">NFL</SelectItem>
          <SelectItem value="NBA">NBA</SelectItem>
          <SelectItem value="MLB">MLB</SelectItem>
          <SelectItem value="NHL">NHL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export const TopNewsFilters = memo(TopNewsFiltersBase);
