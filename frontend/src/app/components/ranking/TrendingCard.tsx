"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TrendItem } from "@/types/fantasy.type";

function TrendRow({ item }: { item: TrendItem }) {
  const initials = item.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  const positive = item.deltaPct >= 0;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-card px-3 py-3">
      <div className="flex items-center gap-3">
        {item.headshot ? (
          <Image
            src={item.headshot}
            width={32}
            height={32}
            alt={item.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
            {initials}
          </div>
        )}
        <div className="leading-tight">
          <div className="font-medium text-foreground">{item.name}</div>
          <div className="text-[11px] text-muted-foreground">{item.team}</div>
        </div>
      </div>
      <div
        className={
          positive
            ? "text-green-600 font-semibold"
            : "text-rose-600 font-semibold"
        }
      >
        {positive ? "+" : ""}
        {item.deltaPct}%
      </div>
    </div>
  );
}

export function TrendingCard({
  up,
  down,
}: {
  up: TrendItem[];
  down: TrendItem[];
}) {
  return (
    <Card className="rounded-2xl border p-4">
      <Tabs defaultValue="up" className="w-full">
        <div className="mb-3 flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted p-1">
            <TabsTrigger
              value="up"
              className="rounded py-2 data-[state=active]:bg-primary data-[state=active]:text-foreground"
            >
              Trending Up
            </TabsTrigger>
            <TabsTrigger
              value="down"
              className="rounded py-2 data-[state=active]:bg-primary data-[state=active]:text-foreground"
            >
              Trending Down
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="up" className="space-y-3">
          {up.map((it) => (
            <TrendRow key={it.id} item={it} />
          ))}
          <CardContent className="p-0 pt-3">
            <Button className="w-full rounded bg-foreground text-background hover:bg-foreground/90">
              View All Trending Players
            </Button>
          </CardContent>
        </TabsContent>

        <TabsContent value="down" className="space-y-3">
          {down.map((it) => (
            <TrendRow key={it.id} item={it} />
          ))}
          <CardContent className="p-0 pt-3">
            <Button className="w-full rounded bg-foreground text-background hover:bg-foreground/90">
              View All Trending Players
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
