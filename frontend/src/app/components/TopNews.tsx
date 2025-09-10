"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { TopNewsItemData, TopNewsKind } from "@/types/top-news.type";
import { TopNewsFilters } from "./top-news/TopNewsFilters";
import { TopNewsItem } from "./top-news/TopNewsItem";
import { AdvertisementCard } from "@/components/parts/AdvertisementCard";
import Reveal from "@/components/theme-ui/reveal/Reveal";

type TopNewsPayload = { items: TopNewsItemData[] };

async function fetchTopNews(): Promise<TopNewsPayload> {
  const res = await fetch("/data/top-news.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load top news");
  return res.json();
}

export default function TopNews() {
  const { data, isLoading } = useQuery({
    queryKey: ["top:news"],
    queryFn: fetchTopNews,
  });

  const [activeKind, setActiveKind] = useState<TopNewsKind>("Fantasy");
  const [scope, setScope] = useState<"All" | "NFL" | "NBA" | "MLB" | "NHL">(
    "All"
  );

  const filtered = useMemo(() => {
    const base = data?.items ?? [];
    const byKind = base.filter((n) => n.kind === activeKind);
    if (scope === "All") return byKind;
    return byKind.filter((n) => n.league === scope);
  }, [data?.items, activeKind, scope]);

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Card className="rounded-2xl border p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-8 w-40 animate-pulse rounded bg-muted" />
                  <div className="h-10 w-28 animate-pulse rounded bg-muted" />
                </div>
                <div className="grid gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-muted"
                    />
                  ))}
                  <div className="mt-2 h-12 animate-pulse rounded-xl bg-muted" />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <div className="h-[500px] animate-pulse rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ptb">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left side — Top News card */}
          <Reveal variant="slide" direction="right" className="lg:col-span-8">
            <Card className="rounded-2xl border p-4 sm:p-5">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Top News
                </h2>

                <Button
                  className="group rounded bg-primary px-5 py-3 font-semibold text-foreground
                             shadow-soft transition-all hover:gap-3 hover:shadow-strong hover:shadow-primary/30"
                >
                  <a href="/news">
                    <span className="mr-1">View More</span>
                    <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>

              {/* Filters */}
              <TopNewsFilters
                activeKind={activeKind}
                onKindChange={setActiveKind}
                scope={scope}
                onScopeChange={setScope}
              />

              {/* List */}
              <div className="mt-3 overflow-hidden rounded-xl border">
                <div className="max-h-[460px] overflow-y-auto overflow-x-hidden">
                  {filtered.slice(0, 8).map((n, idx) => (
                    <TopNewsItem
                      key={n.id}
                      item={n}
                      withDivider={idx !== filtered.length - 1}
                    />
                  ))}
                </div>

                {/* Footer bar */}
                <div className="rounded-b-xl bg-foreground/95 text-center">
                  <Button className="w-full rounded-lg bg-foreground text-background py-4 hover:bg-foreground/90">
                    <a href="/news">View More</a>
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Right side — Advertisement */}
          <Reveal variant="slide" direction="left" className="lg:col-span-4">
            <AdvertisementCard
              imageSrc="/assets/advertise2.jpg"
              headline="Secure Your Fantasy League Hardware"
              subhead="Shop championship belts, trophies, and rings at TrophySmack."
              ctaLabel="Shop Now"
              ctaHref="/shop"
              cornerBadge="Sponsored"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
