"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, UserPlus } from "lucide-react";
import MobileNav from "./components/headers/MobileNav";
import Logo from "./components/headers/Logo";
import { NAV } from "@/constants/menu.constant";
import GlobalSearch from "./components/headers/GlobalSearch";
import DesktopNav from "./components/headers/DesktopNav";

export default function Header({
  logoSrc = "/logo.png",
}: {
  logoSrc?: string;
}) {
  return (
    <header className="sticky top-0 z-50 h-20 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary">
      <div className="container flex h-full items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <MobileNav items={NAV} />
          <Logo href="/" src={logoSrc} className="hidden lg:flex" />
          {/* Compact logo for small screens */}
          <Link href="/" className="lg:hidden">
            <div className="relative">
              <Image
                src={logoSrc}
                alt="FantasyBuzz"
                width={200}
                height={200}
                className="object-contain w-20 h-auto"
              />
            </div>
          </Link>
        </div>

        {/* Middle: Menus (Desktop) */}
        <DesktopNav items={NAV} />

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative p-1.5 rounded-full border border-foreground hover:bg-primary/50"
          >
            <Bell className="h-5 w-5" />
            {/* Example unread badge */}
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-primary-foreground text-[10px] font-bold text-primary">
              3
            </span>
          </Button>

          {/* Search */}
          <GlobalSearch />

          {/* Sign Up */}
          <Button className="hidden sm:inline-flex">
            <Link href="/register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Sign up</span>
            </Link>
          </Button>
          <Button variant={"outline"} className="hidden sm:inline-flex">
            <Link href="/login" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
