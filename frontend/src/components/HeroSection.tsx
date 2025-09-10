"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider"; // only import Slider
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2 adults • 0 children");

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const [locationFilter, setLocationFilter] = useState("");
  const [helperGuide, setHelperGuide] = useState("");

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section
        className={cn(
          "hero-bg bg-cover bg-center h-[calc(100vh-80px)] flex items-center justify-center text-white"
        )}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcy4uFplGC_ajQJZKMacKhrNDrGE1T7JIBEU3THciEx20B1B-En2jSXG-blxcWnF1SPFH4LTnS-3iyV_FmFP8Zb0ci-e_qqKbGGtOOdPHBPCZGQ-3TJ5bBubD95ggYpJbLy8PL-5JK3Vy9S7CMukvAHv-2Z5zAEvHZitOooNgvp8XbM7-cuUKjPI8QPXplCbnpVpI6dBC0WyOW1W_BVbELcEIWCYuxNfs1skPdsKGNMCdeVE9mzdmNQhQ5JmwhPHQt5cgmIXQhON0H")',
        }}
      >
        <div className="text-center max-w-3xl px-4">
          <h1
            className={cn(
              "text-5xl md:text-7xl font-bold leading-tight tracking-wide mb-4 animate-fade-in-down"
            )}
          >
            Discover Your Next <br /> Fishing Adventure
          </h1>
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up"
            )}
          >
            Explore the best fishing spots, connect with fellow anglers, and
            gear up for your next catch.
          </p>
          <Button size="lg" className="animate-bounce">
            Get Started
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 -mt-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col md:flex-row flex-wrap items-center justify-between gap-6">
            {/* Destination */}
            <div className="flex-1 w-full md:w-auto">
              <Label
                htmlFor="destination"
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                Near By Fishing Location
              </Label>
              <Input
                id="destination"
                placeholder="e.g. Florida Keys"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={cn("mt-1 pl-10")}
              />
            </div>

            {/* Date Picker */}
            <div className="flex-1 w-full md:w-auto">
              <Label
                htmlFor="date"
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                Select date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 flex items-center justify-start gap-2 pl-3 pr-3 text-left"
                    )}
                  >
                    {date ? date.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="flex-1 w-full md:w-auto">
              <Label
                htmlFor="guests"
                className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
              >
                Guests
              </Label>
              <Input
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={cn("mt-1 pl-10")}
              />
            </div>

            {/* Filter By - Popover */}
            <div className="flex-1 w-full md:w-auto">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Filter By
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full mt-1")}>
                    More Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4 space-y-4">
                  {/* Price Range Slider */}
                  <div>
                    <Label
                      htmlFor="price"
                      className="text-xs font-semibold text-muted-foreground"
                    >
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={(val) =>
                        setPriceRange(val as [number, number])
                      }
                      min={0}
                      max={1000}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  {/* Location Filter */}
                  <div>
                    <Label
                      htmlFor="locationFilter"
                      className="text-xs font-semibold text-muted-foreground"
                    >
                      Location Filter
                    </Label>
                    <Input
                      id="locationFilter"
                      placeholder="e.g. Gulf Coast"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className={cn("mt-1")}
                    />
                  </div>

                  {/* Helper Guide */}
                  <div>
                    <Label
                      htmlFor="helperGuide"
                      className="text-xs font-semibold text-muted-foreground"
                    >
                      Helper Guide
                    </Label>
                    <Input
                      id="helperGuide"
                      placeholder="e.g. John Doe"
                      value={helperGuide}
                      onChange={(e) => setHelperGuide(e.target.value)}
                      className={cn("mt-1")}
                    />
                  </div>

                  {/* Helper Guide */}
                  <div>
                    <Label
                      htmlFor="helperGuide"
                      className="text-xs font-semibold text-muted-foreground"
                    >
                      Gear
                    </Label>
                    <Input
                      id="helperGuide"
                      placeholder="e.g. John Doe"
                      value={helperGuide}
                      onChange={(e) => setHelperGuide(e.target.value)}
                      className={cn("mt-1")}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Button
                size="lg"
                className={cn("w-full flex items-center gap-2 justify-center")}
              >
                <span className="material-symbols-outlined">search</span>
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
