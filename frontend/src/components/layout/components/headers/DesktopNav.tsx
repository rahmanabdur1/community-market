"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "../../../ui/badge";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "../../../ui/menubar";
import ActiveIndicator from "../../../theme-ui/ActiveIndicator";
import { ChevronDown } from "lucide-react";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface MegaMenuItem {
  title: string;
  items: MenuItem[];
}
interface MenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}
interface NavItem {
  label: string;
  href?: string;
}
interface ExtendedNavItem extends Omit<NavItem, "children"> {
  children?: MenuItem[];
  mega?: MegaMenuItem[];
}
interface DesktopNavProps {
  items: ExtendedNavItem[];
}

/* ──────────────────────────────────────────────
   Trigger with animated underline + chevron
   ────────────────────────────────────────────── */
const SmoothTrigger = ({ children }: { children: React.ReactNode }) => (
  <MenubarTrigger
    className={cn(
      "group relative rounded px-3 py-2 text-sm font-medium cursor-pointer",
      "text-foreground/90 transition-colors duration-200",
      // requested: bg-foreground + text-primary on hover/focus/open
      "hover:bg-foreground hover:text-primary",
      "focus:bg-foreground focus:text-primary",
      "data-[state=open]:bg-foreground data-[state=open]:text-primary",
      // premium feel
      "outline-none ring-offset-background"
    )}
  >
    <span className="relative inline-flex items-center gap-1.5">
      {children}
      {/* Chevron that rotates when open */}
      <ChevronDown
        className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
      {/* Animated underline */}
      <motion.span
        className="absolute inset-x-0 -bottom-2 h-0.5 bg-primary origin-left scale-x-0"
        initial={false}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
    </span>
  </MenubarTrigger>
);

/* ──────────────────────────────────────────────
   Small link card (used for simple dropdown + mega)
   ────────────────────────────────────────────── */
const MenuItemCard = ({ item }: { item: MenuItem; isMega?: boolean }) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.12 }}
    className="h-full"
  >
    <Link
      href={item.href}
      className={cn(
        "group block h-full rounded p-2 border border-transparent transition-colors duration-150 ease-out hover:bg-foreground hover:text-accent-foreground hover:border-foreground/20 hover:ring-1 hover:ring-primary/50"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium transition-colors duration-150 group-hover:text-primary">
          {item.label}
        </span>
        {item.badge && (
          <Badge className="transition-transform duration-150 group-hover:scale-105 group-hover:bg-primary group-hover:text-foreground">
            {item.badge}
          </Badge>
        )}
      </div>
      {item.description && (
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground transition-colors duration-150 group-hover:text-accent-foreground/90">
          {item.description}
        </p>
      )}
    </Link>
  </motion.div>
);

/* ──────────────────────────────────────────────
   Desktop Nav (per-trigger dropdowns)
   ────────────────────────────────────────────── */
export default function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion?.() ?? false;

  return (
    <Menubar className="hidden lg:flex gap-1 bg-transparent border-0 shadow-none p-0">
      {items.map((item) => {
        const isLinkOnly = !item.children && !item.mega;

        if (isLinkOnly) {
          return (
            <Link
              key={item.label}
              href={item.href || "#"}
              className={cn(
                "group relative rounded-xl px-3 py-2 text-sm font-medium",
                "text-foreground/90 transition-colors duration-150 ease-out",
                // requested: same hover for link-only items
                "hover:bg-foreground hover:text-primary focus:bg-foreground focus:text-primary",
                pathname === item.href && "text-foreground"
              )}
            >
              <span className="relative inline-flex items-center">
                {item.label}
                {pathname === item.href && <ActiveIndicator />}
                <motion.span
                  className="absolute inset-x-0 -bottom-2 h-0.5 origin-left bg-primary"
                  initial={{ scaleX: pathname === item.href ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              </span>
            </Link>
          );
        }

        return (
          <MenubarMenu key={item.label}>
            {/* Trigger with chevron */}
            <SmoothTrigger>
              {/* If you ever want an inline icon: {item.icon} */}
              {item.label}
            </SmoothTrigger>

            {/* SIMPLE DROPDOWN */}
            {item.children && !item.mega && (
              <MenubarContent
                side="bottom"
                align="start"
                sideOffset={10}
                alignOffset={0}
                className={cn(
                  "relative min-w-[280px] rounded-2xl border border-border/80 bg-popover/95 p-3",
                  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] backdrop-blur-md",
                  "data-[side=bottom]:animate-in data-[side=bottom]:fade-in-0 data-[side=bottom]:zoom-in-95"
                )}
              >
                {/* Caret pointer */}
                <div className="pointer-events-none absolute -top-2 left-6 h-4 w-4 rotate-45 rounded-[3px] border border-border/80 bg-popover/95" />

                <motion.div
                  {...(!reduce
                    ? {
                        initial: { opacity: 0, y: 8, filter: "blur(2px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.16,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }
                    : {})}
                  className="grid grid-cols-1 gap-2"
                >
                  {item.children.map((c, idx) => (
                    <React.Fragment key={c.label}>
                      {idx > 0 && <MenubarSeparator className="my-1" />}
                      <MenubarItem
                        asChild
                        className="p-0 focus:bg-transparent focus:outline-none"
                      >
                        <div>
                          <MenuItemCard item={c} />
                        </div>
                      </MenubarItem>
                    </React.Fragment>
                  ))}
                </motion.div>
              </MenubarContent>
            )}

            {/* MEGA MENU */}
            {item.mega && (
              <MenubarContent
                side="bottom"
                align="start"
                sideOffset={12}
                alignOffset={0}
                className={cn(
                  "relative w-[760px] rounded-2xl border border-border/80 bg-popover/95 p-6",
                  "shadow-[0_12px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md",
                  "data-[side=bottom]:animate-in data-[side=bottom]:fade-in-0 data-[side=bottom]:zoom-in-95"
                )}
              >
                {/* Caret pointer */}
                <div className="pointer-events-none absolute -top-2 left-6 h-4 w-4 rotate-45 rounded-[4px] border border-border/80 bg-popover/95" />

                <motion.div
                  {...(!reduce
                    ? {
                        initial: { opacity: 0, y: 8, filter: "blur(2px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.16,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }
                    : {})}
                  className="grid grid-cols-3 gap-6"
                >
                  {item.mega.map((col) => (
                    <div key={col.title} className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {col.title}
                      </p>
                      <ul className="space-y-1.5">
                        {col.items.map((entry) => (
                          <li key={entry.label}>
                            <MenuItemCard item={entry} isMega />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </MenubarContent>
            )}
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
