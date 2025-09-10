"use client";

import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Item {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const items: Item[] = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "X (Twitter)", icon: Twitter },
  { href: "#", label: "YouTube", icon: Youtube },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brand-foam)]/30 text-[color:var(--brand-foam)]/80 hover:bg-[color:var(--brand-foam)]/10 hover:text-[color:var(--brand-foam)] transition-colors"
        >
          <Icon className="h-4.5 w-4.5" />
        </Link>
      ))}
    </div>
  );
}
