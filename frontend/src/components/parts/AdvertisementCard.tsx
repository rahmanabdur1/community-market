"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AdvertisementOrientation = "vertical" | "horizontal";

export interface AdvertisementCardProps {
  /** Background hero image (local in /public or remote if next.config allows) */
  imageSrc: string;
  /** Optional small logo placed near headline */
  logoSrc?: string;
  /** Optional small corner badge (e.g., “Sponsored”) */
  cornerBadge?: string;
  /** Main headline */
  headline: string;
  /** Supporting copy */
  subhead?: string;
  /** CTA label + link */
  ctaLabel: string;
  ctaHref: string;
  /** Darken overlay strength (0–100); default 55 */
  overlay?: number;
  /** Layout orientation; vertical stacks to bottom, horizontal centers left */
  orientation?: AdvertisementOrientation;
  /**
   * Optional CSS aspect-ratio (e.g. "1 / 1", "16 / 9", 1)
   * If provided, the card will use this ratio; otherwise it fills parent height.
   */
  aspect?: string | number;
  /** Extra classes for outer wrapper */
  className?: string;
}

/**
 * AdvertisementCard
 * - By default fills parent height (h-full).
 * - If `aspect` is provided, uses CSS aspect-ratio instead.
 * - `orientation`: "vertical" (default) or "horizontal".
 */
export function AdvertisementCard({
  imageSrc,
  logoSrc,
  cornerBadge,
  headline,
  subhead,
  ctaLabel,
  ctaHref,
  overlay = 55,
  orientation = "vertical",
  aspect, // when present, card uses fixed aspect instead of h-full
  className,
}: AdvertisementCardProps) {
  const overlayPct = Math.max(0, Math.min(100, overlay));
  const isHorizontal = orientation === "horizontal";

  return (
    <section
      aria-label={headline}
      // If aspect is provided, we use CSS `aspectRatio`; else stretch to full column height.
      style={
        aspect ? ({ aspectRatio: aspect } as React.CSSProperties) : undefined
      }
      className={cn(
        "relative w-full overflow-hidden rounded-xl shadow-soft",
        aspect ? "" : "h-full min-h-[260px]", // default: fill height with a sensible floor
        className
      )}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Contrast overlay (direction changes with orientation) */}
      <div
        className="absolute inset-0"
        style={{
          background: isHorizontal
            ? // left-to-right wash for horizontal layout
              `linear-gradient(90deg,
                rgba(16,45,57,${overlayPct / 100}) 0%,
                rgba(16,45,57,${overlayPct / 100}) 55%,
                rgba(16,45,57,0.25) 100%)`
            : // top-to-bottom wash for vertical layout
              `linear-gradient(180deg,
                rgba(16,45,57,${overlayPct / 100}) 0%,
                rgba(16,45,57,${overlayPct / 100}) 45%,
                rgba(16,45,57,0.3) 100%)`,
        }}
      />

      {/* Texture + subtle shine */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:10px_10px]" />
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2 }}
        className={cn(
          "pointer-events-none absolute inset-y-0 bg-gradient-to-r from-transparent via-white/15 to-transparent",
          isHorizontal ? "-left-1/3 w-1/3 rotate-2" : "-left-1/2 w-1/3 rotate-6"
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full p-3 sm:p-3.5",
          isHorizontal
            ? // content column on left, centered vertically
              "items-center"
            : // stack to bottom
              "flex-col justify-between"
        )}
      >
        {/* Top row: logo + badge (vertical) or tucked above text (horizontal) */}
        <div
          className={cn(
            "flex items-center gap-2",
            isHorizontal && "absolute left-3 top-3"
          )}
        >
          {logoSrc && (
            <Image
              src={logoSrc}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-md border border-white/20 bg-white/10 object-contain p-0.5 backdrop-blur"
            />
          )}
          {cornerBadge && (
            <Badge className="rounded bg-primary px-2 py-0.5 text-[11px] text-foreground">
              {cornerBadge}
            </Badge>
          )}
        </div>

        {/* Copy + CTA */}
        <div
          className={cn(
            "text-[color:var(--brand-foam)]",
            isHorizontal
              ? "ml-0 max-w-[68%] pl-3 sm:pl-4" // keep text inside the dark side of gradient
              : ""
          )}
        >
          <h2 className="font-subtitle text-base font-extrabold leading-snug tracking-tight sm:text-lg">
            {headline}
          </h2>

          {subhead && (
            <p className="mt-1 line-clamp-2 text-xs text-[color:var(--brand-foam)]/85">
              {subhead}
            </p>
          )}

          <div className={cn("mt-2", isHorizontal && "pt-1")}>
            <Button
              size="sm"
              className="h-8 rounded-lg bg-primary px-3 text-foreground hover:bg-primary/90"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Spacer to push content to bottom in vertical mode */}
        {!isHorizontal && <div />}
      </div>

      {/* Decorative bottom hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
    </section>
  );
}
