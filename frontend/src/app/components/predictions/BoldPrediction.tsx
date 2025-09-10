"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { NewsItem } from "@/types/news.type";
import { BoldPredictionCard } from "./BoldPredictionCard";

type BoldPredictionPayload = { items: NewsItem[] };

async function fetchBoldPredictions(): Promise<BoldPredictionPayload> {
  const res = await fetch("/data/bold-predictions.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load predictions");
  return res.json();
}

export default function BoldPrediction() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news:bold-predictions"],
    queryFn: fetchBoldPredictions,
  });

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="container max-w-7xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-8 w-44 animate-pulse rounded bg-muted" />
            <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) return null;

  return (
    <section className="py-6">
      <div className="container max-w-7xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Bold Prediction
          </h2>

          {/* matches your latest CTA style (primary bg + foreground text) */}
          <Button
            className="group rounded-full bg-primary px-5 py-3 font-semibold text-foreground
                       shadow-soft transition-all hover:gap-3 hover:shadow-strong hover:shadow-primary/30"
          >
            <a href="/news/bold">
              <span className="mr-1">View More</span>
              <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>

        {/* 3-up grid like the screenshot; responsive down to 1/2 cols */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.slice(0, 3).map((item) => (
            <BoldPredictionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
