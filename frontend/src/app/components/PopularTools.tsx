"use client";

import { AdvertisementCard } from "@/components/parts/AdvertisementCard";
import { ToolCard } from "@/components/parts/ToolCard";
import Reveal from "@/components/theme-ui/reveal/Reveal";
import { Trophy, Calculator, Lightbulb } from "lucide-react";

const DESCRIPTION =
  "Winning your fantasy draft comes down to selecting the guys who end up……";

export default function PopularTools() {
  return (
    <section className="pt-0 pbo">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: Popular Tools - spans 8 columns on large screens */}
          <div className="lg:col-span-8">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">
              Popular Tools
            </h2>
            <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Left: light card */}
              <ToolCard
                title="League Sync"
                description={DESCRIPTION}
                cta="Sync Your League"
                href="/sync"
                icon={Trophy}
              />

              {/* Middle: highlighted dark card */}
              <ToolCard
                title="Mock Draft Simulator"
                description={DESCRIPTION}
                cta="Start Mock"
                href="/draft/mock"
                icon={Calculator}
                variant="highlight"
              />

              {/* Right: light card */}
              <ToolCard
                title="Waiver Wire Finder"
                description={DESCRIPTION}
                cta="Find Players"
                href="/waivers"
                icon={Lightbulb}
              />
            </Reveal>
          </div>

          {/* Right: Advertisement - spans 4 columns on large screens */}
          <Reveal direction="left" variant="slide" className="lg:col-span-4">
            <AdvertisementCard
              imageSrc="/assets/advertise.jpg"
              logoSrc="/logo.png"
              cornerBadge="Trophy Smack"
              headline="Secure Your Fantasy League Hardware"
              subhead="Championship belts, trophies, and rings worthy of your dynasty. Make this season unforgettable."
              ctaLabel="Shop Champions Gear"
              ctaHref="https://example.com"
              overlay={55}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
