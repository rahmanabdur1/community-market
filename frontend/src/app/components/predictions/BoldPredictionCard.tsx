"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/types/news.type";
import { motion } from "framer-motion";
import { NewsBadge } from "../news/NewsBadge";
import { NewsMeta } from "../news/NewsMeta";

export interface BoldPredictionCardProps {
  item: NewsItem; // reuse your NewsItem shape
  className?: string;
}

export function BoldPredictionCard({
  item,
  className,
}: BoldPredictionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden rounded p-0 border bg-card transition-shadow hover:shadow-soft">
        {/* Media */}
        <div className="relative aspect-[16/10] w-full">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>

          {/* top-right category badge */}
          <div className="absolute right-3 top-3 z-10">
            <NewsBadge category={item.category} light />
          </div>

          {/* bottom vignette so the title edge can sit on image if needed */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/15 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="line-clamp-2 font-subtitle text-[17px] font-extrabold leading-snug text-foreground sm:text-lg">
            <Link href={item.href} className="hover:underline">
              {item.title}
            </Link>
          </h3>

          <NewsMeta
            author={item.author}
            publishedAt={item.publishedAt}
            className="mt-2"
          />
        </div>

        {/* Clickable overlay to increase hit area while keeping semantics */}
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
