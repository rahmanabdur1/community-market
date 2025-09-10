"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Player, Position, ScoringFormat } from "@/types/fantasy.type";

export interface PlayerRankingCardProps {
  data: Player[];
}

export function PlayerRankingCard({ data }: PlayerRankingCardProps) {
  const [position, setPosition] = useState<Position | "ALL">("ALL");
  const [scoring, setScoring] = useState<ScoringFormat>("standard");

  const filtered = useMemo(() => {
    const base =
      position === "ALL" ? data : data.filter((p) => p.position === position);
    // Future: adjust by scoring
    return base;
  }, [data, position]);

  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        accessorKey: "rank",
        header: () => <span>Rk</span>,
        cell: ({ row }) => (
          <span className="text-foreground/90">{row.original.rank}</span>
        ),
        sortingFn: "basic",
        size: 40,
      },
      {
        id: "player",
        header: () => <span>Player</span>,
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-3">
              {p.headshot ? (
                <Image
                  src={p.headshot}
                  alt={p.name}
                  width={36}
                  height={36}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground/10 text-[10px] font-semibold">
                  {p.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              <div className="leading-tight">
                <div className="font-medium text-foreground mb-1">{p.name}</div>
                <div className="text-[11px] font-semibold text-green-600">
                  {p.position}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "team",
        header: () => <span>Team</span>,
        cell: ({ row }) => (
          <Badge className="rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200">
            {row.original.team}
          </Badge>
        ),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "bye",
        header: () => <span>Bye</span>,
        cell: ({ row }) => <span>{row.original.bye}</span>,
        sortingFn: "basic",
        size: 40,
      },
      {
        id: "proj",
        header: () => <span>Proj Pts</span>,
        cell: ({ row }) =>
          row.original.isLocked || row.original.projPts === undefined ? (
            <Lock className="h-4 w-4 opacity-70" />
          ) : (
            <span>{row.original.projPts?.toFixed(1)}</span>
          ),
        sortingFn: (a, b) => {
          const av = a.original.projPts ?? -Infinity;
          const bv = b.original.projPts ?? -Infinity;
          return av === bv ? 0 : av > bv ? 1 : -1;
        },
      },
    ],
    []
  );

  return (
    <Card className="rounded-2xl border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Player Ranking
        </h2>
      </div>

      <FilterBar
        position={position}
        scoring={scoring}
        onPositionChange={setPosition}
        onScoringChange={setScoring}
        className="mb-4"
      />

      <div className="rounded-xl border">
        <CardContent className="p-0">
          <DataTable columns={columns} data={filtered} />
        </CardContent>
        <div className="rounded-b-xl bg-foreground/90 text-center">
          <Button className="w-full py-4 rounded-lg bg-foreground text-background hover:bg-foreground/90">
            View More
          </Button>
        </div>
      </div>
    </Card>
  );
}
