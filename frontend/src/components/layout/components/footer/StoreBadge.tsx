"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface StoreBadgeProps {
  store: "play" | "apple";
  href?: string;
  className?: string;
}

export function StoreBadge({ store, href = "#", className }: StoreBadgeProps) {
  const isPlay = store === "play";

  return (
    <Button
      className={cn(
        "h-11 w-full justify-start gap-3 rounded-xl bg-primary text-foreground hover:bg-primary/90",
        className
      )}
    >
      <a href={href} aria-label={isPlay ? "Play Store" : "App Store"}>
        <span className="inline-flex items-center gap-3">
          <Image
            src={isPlay ? "/icons/google-play.png" : "/icons/app-store.png"}
            alt={isPlay ? "Google Play" : "App Store"}
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <span className="text-base font-medium">
            {isPlay ? "Play Store" : "App Store"}
          </span>
        </span>
      </a>
    </Button>
  );
}
