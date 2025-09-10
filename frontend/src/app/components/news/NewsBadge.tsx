"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsCategory } from "@/types/news.type";

/** Uses only palette tokens from global css via arbitrary color utilities */
const categoryColors: Record<string, { bg: string; text: string }> = {
  Trending: {
    bg: "bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--brand-gold)]",
    text: "text-foreground",
  },
  Analysis: {
    bg: "bg-gradient-to-r from-[color:var(--brand-sky)] to-[color:var(--info)]",
    text: "text-[color:var(--brand-foam)]",
  },
  Breaking: {
    bg: "bg-gradient-to-r from-[color:var(--danger)] to-[color:var(--brand-rose)]",
    text: "text-[color:var(--brand-foam)]",
  },
  Injury: {
    bg: "bg-gradient-to-r from-[color:var(--brand-teal-deep)] to-[color:var(--brand-sky)]",
    text: "text-[color:var(--brand-foam)]",
  },
  Default: { bg: "bg-[color:var(--primary)]", text: "text-foreground" },
};

export function NewsBadge({
  category,
  light,
}: {
  category?: NewsCategory;
  light?: boolean;
}) {
  if (!category) return null;
  const palette = categoryColors[category] || categoryColors.Default;

  return (
    <Badge
      className={cn(
        "rounded px-2 py-0.5 text-xs font-semibold",
        palette.bg,
        palette.text,
        light && "ring-1 ring-[color:var(--brand-foam)]/20"
      )}
    >
      {category}
    </Badge>
  );
}
