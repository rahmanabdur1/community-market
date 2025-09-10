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
import { Position, ScoringFormat } from "@/types/fantasy.type";
import { SlidersHorizontal } from "lucide-react";
import { memo } from "react";

const POSITIONS: (Position | "ALL")[] = [
  "ALL",
  "QB",
  "RB",
  "WR",
  "TE",
  "DST",
  "K",
];

export interface FilterBarProps {
  position: Position | "ALL";
  scoring: ScoringFormat;
  onPositionChange: (pos: Position | "ALL") => void;
  onScoringChange: (fmt: ScoringFormat) => void;
  className?: string;
}

function FilterBarBase({
  position,
  scoring,
  onPositionChange,
  onScoringChange,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
    >
      <div className="flex flex-wrap gap-2">
        {POSITIONS.map((p) => (
          <Button
            key={p}
            variant={position === p ? "secondary" : "ghost"}
            className={cn(
              "h-9 rounded-md border",
              position === p
                ? "bg-primary text-foreground border-transparent"
                : "bg-muted text-foreground"
            )}
            onClick={() => onPositionChange(p)}
          >
            {p === "ALL" ? "All" : p}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Scoring Format</span>
        </div>
        <Select
          value={scoring}
          onValueChange={(v) => onScoringChange(v as ScoringFormat)}
        >
          <SelectTrigger className="h-9 w-[160px] rounded-md border bg-background font-medium">
            <SelectValue className="text-lg" placeholder="Standard" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="ppr">PPR</SelectItem>
            <SelectItem value="half-ppr">Half-PPR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const FilterBar = memo(FilterBarBase);
