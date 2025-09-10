"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TopNewsItemData } from "@/types/top-news.type";

export function TopNewsItem({
  item,
  withDivider,
}: {
  item: TopNewsItemData;
  withDivider?: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Card className="relative rounded-xl border-0 bg-transparent p-0 shadow-none">
          <div className="flex items-center gap-3 px-3 py-3">
            {/* logo */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-white dark:bg-background">
              <Image
                src={item.teamLogo}
                alt=""
                fill
                className="object-contain p-1.5"
              />
            </div>

            {/* text block */}
            <div className="min-w-0 flex-1">
              {/* headline */}
              <h4 className="line-clamp-1 font-subtitle text-[15px] font-extrabold leading-snug text-foreground">
                <Link href={item.href} className="hover:underline">
                  <span className="text-foreground">{item.title}</span>
                  {item.trailing && (
                    <span className="ml-1 font-normal text-muted-foreground">
                      {item.trailing}
                    </span>
                  )}
                </Link>
              </h4>

              {/* meta row */}
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant="secondary"
                  className="h-5 rounded px-2 py-0 text-[10px] uppercase tracking-wide"
                >
                  {item.league}
                </Badge>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </span>
                {item.timeAgo && <span>• {item.timeAgo}</span>}
              </div>
            </div>
          </div>

          {/* invisible link overlay for big hit-area */}
          <Link
            href={item.href}
            aria-label={item.title}
            className="absolute inset-0"
            tabIndex={-1}
          />
        </Card>
      </motion.div>

      {withDivider && <Separator className="mx-3" />}
    </>
  );
}
