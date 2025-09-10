"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NewsMeta } from "./NewsMeta";
import type { NewsItem } from "@/types/news.type";
import { ArrowRight, Play, Star, TrendingUp } from "lucide-react";

interface NewsCardHeroProps {
  item: NewsItem;
  className?: string;
}

/**
 * Premium hero news card:
 * - Strong image with layered vignettes for legibility
 * - Clear badge stack (FEATURED + category + TRENDING)
 * - Large title, supporting excerpt, meta, and CTA
 * - All colors from global tokens; no external CSS
 */
export function NewsCardHero({ item, className }: NewsCardHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-sm p-0 border-0 bg-card",
          "shadow-strong transition-shadow duration-300 hover:shadow-strong"
        )}
      >
        {/* Corner feature badge */}
        <div className="absolute right-4 top-4 z-20">
          <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-foreground">
            <Star className="h-3.5 w-3.5" />
            <span>FEATURED</span>
          </div>
        </div>

        {/* Image + overlays */}
        <div className="relative aspect-[16/9] w-full">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(min-width:1024px) 66vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Legibility layers: bottom vignette + subtle brand wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent mix-blend-soft-light" />

          {/* Optional media label */}
          {item.mediaType === "video" && (
            <div className="absolute left-4 top-4 z-20">
              <div className="flex items-center gap-1 rounded-full bg-[color:var(--brand-sky)] px-2 py-1 text-xs font-bold text-[color:var(--brand-foam)] backdrop-blur-sm">
                <Play className="h-3.5 w-3.5" />
                <span>VIDEO</span>
              </div>
            </div>
          )}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6 lg:p-7">
          {/* Category / Trending badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {item.isTrending && (
              <div className="flex items-center gap-1 rounded bg-[color:var(--brand-sky)] px-2 py-1 text-xs font-bold text-[color:var(--brand-foam)] backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{item.category?.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 line-clamp-3 font-subtitle text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--brand-foam)] md:text-4xl lg:text-5xl">
            {item.title}
          </h3>

          {/* Excerpt */}
          {item.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="mb-3 max-w-[70ch] text-[color:var(--brand-foam)]/85"
            >
              {item.excerpt}
            </motion.p>
          )}

          {/* Meta + CTA */}
          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <NewsMeta
              author={item.author}
              publishedAt={item.publishedAt}
              light
              className="text-[color:var(--brand-foam)]/85"
            />

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 font-semibold text-foreground shadow-soft transition-[gap,transform] hover:gap-3"
              >
                Read Full Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Soft ambient glow (kept subtle so text stays clear) */}
        <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-r from-primary/15 to-[color:var(--brand-sky)]/15 blur-3xl" />
      </Card>
    </motion.div>
  );
}
