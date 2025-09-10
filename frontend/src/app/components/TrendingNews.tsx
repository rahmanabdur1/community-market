"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { NewsPayload } from "@/types/news.type";
import { NewsCardHero } from "./news/NewsCardHero";
import { NewsRailItem } from "./news/NewsRailItem";
import { useState, useRef } from "react";
import Reveal from "@/components/theme-ui/reveal/Reveal";

async function fetchNews(): Promise<NewsPayload> {
  const res = await fetch("/data/news.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load news");
  return res.json();
}

export default function TrendingNews() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news:trending"],
    queryFn: fetchNews,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ top: -200, behavior: "smooth" });
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollDown = () => {
    if (railRef.current && data) {
      railRef.current.scrollBy({ top: 200, behavior: "smooth" });
      setCurrentSlide((prev) => Math.min(data.rail.length - 1, prev + 1));
    }
  };

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="container max-w-7xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
            <div className="h-10 w-28 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Hero loading */}
            <div className="h-96 animate-pulse rounded-2xl bg-muted lg:col-span-8" />

            {/* Rail loading */}
            <div className="lg:col-span-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 w-32 animate-pulse rounded bg-muted" />
                <div className="flex gap-1">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 animate-pulse rounded-xl bg-muted" />
                <div className="h-32 animate-pulse rounded-xl bg-muted" />
                <div className="h-32 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
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
            Trending News
          </h2>
          <Button
            className="group relative inline-flex items-center gap-2 rounded-sm 
                 bg-foreground px-5 py-3 font-semibold text-primary 
                 shadow-soft transition-all duration-300
                 hover:gap-3 hover:shadow-strong hover:shadow-primary/30"
          >
            <div className="flex">
              <span>View More</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Button>
        </div>

        {/* Layout: hero left (8 cols) + vertical rail right (4 cols) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Hero News - Left Side */}
          <Reveal variant="scale" className="lg:col-span-8">
            <NewsCardHero item={data.hero} />
          </Reveal>

          {/* Vertical News Rail - Right Side */}
          <div className="lg:col-span-4 relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-foreground">
                Latest Updates
              </h3>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollUp}
                  disabled={currentSlide === 0}
                  className="h-8 w-8 rounded-full border-border hover:bg-accent"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollDown}
                  disabled={currentSlide === data.rail.length - 1}
                  className="h-8 w-8 rounded-full border-border hover:bg-accent"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Reveal variant="slide" direction="up">
              <div
                ref={railRef}
                className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-hide custom-scrollbar"
              >
                {data.rail.map((item) => (
                  <NewsRailItem key={item.id} item={item} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
