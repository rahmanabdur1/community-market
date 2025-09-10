"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceStrict } from "@/lib/date-format";
import { cn } from "@/lib/utils";

interface NewsMetaProps {
  author: { name: string; avatar?: string };
  publishedAt: string; // ISO
  className?: string;
  light?: boolean;
}

export function NewsMeta({
  author,
  publishedAt,
  className,
  light,
}: NewsMetaProps) {
  const initials = author.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs",
        light ? "text-[color:var(--brand-foam)]/85" : "text-muted-foreground",
        className
      )}
    >
      <Avatar className="h-5 w-5">
        {author.avatar ? (
          <AvatarImage src={author.avatar} alt={author.name} />
        ) : (
          <AvatarFallback
            className={cn(
              "text-[9px] flex items-center justify-center font-bold",
              light
                ? "bg-white/20 text-white"
                : "bg-[color:var(--info)] text-white"
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <span
        className={cn(
          "font-medium",
          light ? "text-[color:var(--brand-foam)]" : "text-foreground/90"
        )}
      >
        {author.name}
      </span>
      <span>•</span>
      <time dateTime={publishedAt}>{formatDistanceStrict(publishedAt)}</time>
    </div>
  );
}
