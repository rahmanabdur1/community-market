"use client";

import { cn } from "@/lib/utils";
import Header from "../components/layout/Header";
import HeroSection from "./components/HeroSection";
import CommunitySection from "../components/Community/CommunityCard";
import SponsorsSection from "../components/Community/Sponsored-card";
import MarketplaceSection from "../components/MarketplaceSection";
import SearchAndBook from "./components/SearchAndBook";

export default function HomePage() {
  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col font-font-chakra bg-slate-50"
      )}
    >
      <Header />
      <HeroSection />
      <SearchAndBook />
      <CommunitySection />
      <SponsorsSection />
      <MarketplaceSection />
    </div>
  );
}
