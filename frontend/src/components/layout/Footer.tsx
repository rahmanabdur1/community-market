"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SocialLinks } from "./components/footer/SocialLinks";
import { FooterColumn, FooterLink } from "./components/footer/FooterColumn";
import { StoreBadge } from "./components/footer/StoreBadge";

const resources: FooterLink[] = [
  { label: "Rankings", href: "#" },
  { label: "Start/Sit", href: "#" },
  { label: "Fantasy Calculators", href: "#" },
  { label: "Draft Tools", href: "#" },
  { label: "Trade Analyzer", href: "#" },
  { label: "Waiver Wire", href: "#" },
] as const;

const company: FooterLink[] = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const;

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("", className)}>
      {/* Top dark block */}
      <div className="bg-foreground py-10">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Brand & subscribe (span 5) */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo-footer.png"
                  alt="Fantasy Buzz"
                  width={300}
                  height={220}
                  className="object-contain w-32 h-auto"
                  priority
                />
              </Link>

              <p className="mt-4 max-w-[38ch] text-[color:var(--brand-foam)]/70">
                The ultimate platform for fantasy football analytics, news, and
                tools to help you dominate your league.
              </p>

              {/* Subscribe */}
              <form
                className="mt-5 flex max-w-md gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="h-11 rounded-md bg-[color:var(--brand-foam)] text-foreground placeholder:text-foreground/60"
                  aria-label="Your email"
                  required
                />
                <Button
                  type="submit"
                  className="h-11 rounded-md bg-primary text-foreground hover:bg-primary/90"
                >
                  Subscribe
                </Button>
              </form>

              <SocialLinks className="mt-5" />
            </div>

            {/* Resources (span 3) */}
            <div className="lg:col-span-3">
              <FooterColumn title="Resources" links={resources} />
            </div>

            {/* Company (span 2) */}
            <div className="lg:col-span-2">
              <FooterColumn title="Company" links={company} />
            </div>

            {/* Download (span 2) */}
            <div className="lg:col-span-2">
              <FooterColumn title="Download">
                <p className="mb-3 max-w-[28ch] text-sm text-[color:var(--brand-foam)]/70">
                  Get our mobile app for on-the-go fantasy management
                </p>
                <div className="space-y-3">
                  <StoreBadge store="play" />
                  <StoreBadge store="apple" />
                </div>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom light bar */}
      <div className="bg-background py-4">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-foreground/80">
              <Image
                src="/logo.png"
                alt="Fantasy Buzz"
                width={260}
                height={180}
                className="object-contain w-15 h-auto"
              />
            </div>
            <div className="text-sm text-foreground/70">
              © {new Date().getFullYear()}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
