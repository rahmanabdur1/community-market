"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type ToolCardVariant = "default" | "highlight";

export interface ToolCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  /** use "highlight" to render the dark featured card */
  variant?: ToolCardVariant;
  className?: string;
}

export function ToolCard({
  title,
  description,
  cta,
  href,
  icon: Icon,
  variant = "default",
  className,
}: ToolCardProps) {
  const isHighlight = variant === "highlight";

  return (
    <Card
      className={cn(
        "relative h-full rounded-2xl transition-shadow",
        // default card (light)
        !isHighlight &&
          "border border-[color:var(--brand-gray-soft)] bg-card hover:shadow-soft",
        // highlight card (dark)
        isHighlight &&
          "border-0 bg-foreground text-[color:var(--brand-foam)] shadow-strong",
        className
      )}
    >
      <CardContent
        className={cn(
          "flex h-full flex-col gap-4 p-5",
          isHighlight && "text-[color:var(--brand-foam)]"
        )}
      >
        {/* Icon chip */}
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg",
            !isHighlight && "bg-[color:var(--brand-ui-alt)]/50 text-foreground",
            isHighlight &&
              "bg-background/10 text-[color:var(--brand-foam)]/90 border border-white/10"
          )}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <h3
            className={cn(
              "font-subtitle text-xl font-semibold",
              !isHighlight && "text-foreground",
              isHighlight && "text-[color:var(--brand-foam)]"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm leading-snug",
              !isHighlight && "text-muted-foreground",
              isHighlight && "text-[color:var(--brand-foam)]/75"
            )}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <Button
            variant={isHighlight ? "secondary" : "outline"}
            className={cn(
              "w-full rounded-xl",
              // match screenshot: yellow fill on highlight; outlined on default
              isHighlight &&
                "bg-primary text-foreground hover:bg-primary/90 border-0",
              !isHighlight &&
                "border-foreground/50 text-foreground hover:bg-foreground/5"
            )}
          >
            <Link href={href}>{cta}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
