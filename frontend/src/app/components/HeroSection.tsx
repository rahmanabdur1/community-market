"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Reveal from "@/components/theme-ui/reveal/Reveal";
import { toolsData } from "@/constants/tools.constant";
import { ToolsCarousel } from "@/components/parts/ToolsCarousel";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground pt-4">
      {/* Player image anchored bottom-left (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 z-0 select-none"
      >
        <Image
          src="/assets/player-hero.png"
          alt=""
          width={900}
          height={1000}
          priority
          className={cn(
            "h-auto w-[42vw] max-w-[560px] object-contain",
            "drop-shadow-[0_12px_44px_rgba(0,0,0,0.45)]",
            // keep it sensible on small screens
            "sm:w-[58vw] md:w-[52vw] lg:w-[48vw]"
          )}
        />
        {/* soft glow under player */}
        <div className="absolute left-[-8%] right-0 bottom-4 -z-10 h-40 rounded-[100%] bg-primary/20 blur-3xl" />
      </div>

      {/* Content grid above the image */}
      <div className="relative z-10 container grid grid-cols-1 items-stretch gap-8 py-14 md:py-20 lg:grid-cols-30 lg:gap-10">
        {/* Left: headline + copy (centered and vertically middle) */}
        <div className="lg:col-span-6"></div>
        <div className="lg:col-span-16 flex justify-center">
          <div className="w-full text-center">
            <Reveal
              variant="slide"
              direction="up"
              duration={0.45}
              className="w-full"
              once={false}
            >
              <h1
                className={cn(
                  "text-balance font-extrabold leading-tight tracking-tight",
                  "text-[color:var(--brand-foam)]",
                  "text-4xl sm:text-4xl lg:text-[56px]"
                )}
              >
                Your Fantasy Season
                <br />
                Start With <span className="text-primary">Fantasy Buzz</span>
              </h1>
            </Reveal>

            <Reveal
              variant="fade"
              delay={0.06}
              duration={0.36}
              once={false}
              className="mx-auto mt-4 max-w-2xl lg:w-lg"
            >
              <p className="text-[color:var(--brand-foam)]/80">
                Prep for your 2025 Fantasy Football draft with all of our expert
                analysis and tools, including our mock draft simulator.
              </p>
            </Reveal>

            <Reveal
              variant="slide"
              direction="up"
              delay={0.12}
              once={false}
              duration={0.34}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              {/* Filled (brand yellow) */}
              <Button
                variant="secondary"
                className="rounded px-6 py-5 text-base shadow-sm"
              >
                <Link href="/tools">Try Our Tools</Link>
              </Button>

              {/* Outline (brand yellow border/text) */}
              <Button
                variant="outline"
                className="rounded px-6 py-5 text-base border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/draft/mock">Mock Draft</Link>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Right: article card (col-span-5) */}
        <Reveal
          variant="slide"
          direction="right"
          duration={0.42}
          className="lg:col-span-8"
        >
          <ToolsCarousel tools={toolsData} />
        </Reveal>
      </div>
    </section>
  );
}
