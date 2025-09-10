"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links?: FooterLink[];
  children?: ReactNode;
  className?: string;
}

export function FooterColumn({
  title,
  links,
  children,
  className,
}: FooterColumnProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="font-subtitle text-lg font-semibold text-[color:var(--brand-foam)]">
        {title}
      </h3>

      {links && (
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-sm text-[color:var(--brand-foam)]/70 hover:text-[color:var(--brand-foam)] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}
