"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FanPollData } from "@/types/poll.type";

export interface FanPollProps {
  data: FanPollData;
  className?: string;
}

export function FanPoll({ data, className }: FanPollProps) {
  const maxPercent = Math.max(...data.options.map((o) => o.percent));

  return (
    <Card
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-soft sm:p-5",
        className
      )}
    >
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-foreground">Fan Poll</h3>
        <div className="rounded-full bg-[color:var(--success)] px-3 py-1 text-xs font-semibold text-[color:var(--success-foreground)]">
          {data.totalVotes.toLocaleString()} votes
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Question */}
      <h4 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
        {data.question}
      </h4>

      {/* Options */}
      <ul className="space-y-3">
        {data.options.map((opt) => {
          const isLeader = opt.percent === maxPercent && maxPercent > 0;
          const pct = Math.max(0, Math.min(100, opt.percent));

          return (
            <li key={opt.id} className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="truncate text-sm text-foreground">
                  {opt.label}
                </span>
                <span className="text-sm font-semibold text-foreground/90">
                  {pct}%
                </span>
              </div>

              {/* Animated progress bar (success green over soft green) */}
              <div
                className={cn(
                  "relative h-2.5 w-full overflow-hidden rounded-full",
                  "bg-[color:var(--success-soft)]"
                )}
                aria-label={`${opt.label} ${pct}%`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full",
                    "bg-[color:var(--success)]"
                  )}
                />
                {/* subtle shine for leader */}
                {isLeader && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 1.4,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer CTA */}
      <div className="mt-4">
        <Button className="w-full rounded-lg bg-foreground text-background hover:bg-foreground/90">
          View Results
        </Button>
      </div>
    </Card>
  );
}
