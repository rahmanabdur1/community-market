"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { NewsMeta } from "./NewsMeta";
import { NewsBadge } from "./NewsBadge";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/types/news.type";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function NewsRailItem({
  item,
  className,
}: {
  item: NewsItem;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-sm p-0 border bg-card transition-shadow",
          "hover:shadow-soft focus-within:ring-2 focus-within:ring-primary/40"
        )}
      >
        <div className="flex">
          {/* Media */}
          <div className="relative aspect-[4/3] w-36 flex-shrink-0 overflow-hidden sm:w-40 md:w-44">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="176px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* edge vignette for contrast against content */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/10 via-transparent to-transparent" />

            {/* Video pill */}
            {item.mediaType === "video" && (
              <div className="absolute left-2 top-2 z-10 rounded-full bg-[color:var(--brand-sky)] px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--brand-foam)]">
                <div className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  <span>VIDEO</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 items-start gap-3 p-3 sm:p-4">
            <div className="w-full">
              <div className="mb-1">
                <NewsBadge category={item.category} />
              </div>

              <h4 className="line-clamp-2 font-subtitle text-base font-semibold leading-tight text-foreground transition-colors  sm:text-[17px]">
                <Link href={item.href} className="hover:underline">
                  {item.title}
                </Link>
              </h4>

              <NewsMeta
                author={item.author}
                publishedAt={item.publishedAt}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Make whole card clickable, preserve semantics */}
        <Link
          href={item.href}
          aria-label={item.title}
          className="absolute inset-0"
          tabIndex={-1}
        />
      </Card>
    </motion.div>
  );
}
