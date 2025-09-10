"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/types/news.type";
import type { FanPollData } from "@/types/poll.type";
import { BoldPredictionCard } from "./predictions/BoldPredictionCard";
import { FanPoll } from "./poll/FanPoll";
import Reveal from "@/components/theme-ui/reveal/Reveal";

type BoldPredictionPayload = { items: NewsItem[] };

async function fetchBoldPredictions(): Promise<BoldPredictionPayload> {
  const res = await fetch("/data/bold-predictions.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load predictions");
  return res.json();
}

async function fetchFanPoll(): Promise<FanPollData> {
  const res = await fetch("/data/fan-poll.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load poll");
  return res.json();
}

export default function BoldPredictionWithPollSection() {
  const { data: preds, isLoading: predsLoading } = useQuery({
    queryKey: ["news:bold-predictions"],
    queryFn: fetchBoldPredictions,
  });

  const { data: poll, isLoading: pollLoading } = useQuery({
    queryKey: ["fan:poll"],
    queryFn: fetchFanPoll,
  });

  return (
    <section className="pto">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: predictions (8 cols) */}
          <div className="lg:col-span-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                Bold Prediction
              </h2>
              <Button
                className="group rounded bg-foreground px-5 py-3 font-semibold text-primary
                       shadow-soft transition-all hover:gap-3 hover:shadow-strong hover:shadow-primary/30"
              >
                <a href="/news/bold">
                  <span className="mr-1">View More</span>
                  <ArrowUpRight className="inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
            <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {predsLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[16/10] animate-pulse rounded-2xl bg-muted"
                    />
                  ))
                : preds?.items
                    .slice(0, 2)
                    .map((item) => (
                      <BoldPredictionCard key={item.id} item={item} />
                    ))}
            </Reveal>
          </div>

          {/* Right: poll (4 cols) */}
          <Reveal variant="slide" direction="up" className="lg:col-span-4">
            {pollLoading ? (
              <div className="h-full min-h-[360px] animate-pulse rounded-2xl bg-muted" />
            ) : poll ? (
              <FanPoll data={poll} />
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
