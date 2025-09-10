"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface ToolItem {
  id: string;
  image: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface ToolsCarouselProps {
  tools: ToolItem[];
  className?: string;
}

export function ToolsCarousel({ tools, className }: ToolsCarouselProps) {
  return (
    <div className={className}>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".tools-carousel-next",
          prevEl: ".tools-carousel-prev",
        }}
        className="w-full rounded-xl"
      >
        {tools.map((tool) => (
          <SwiperSlide key={tool.id}>
            <Card className="relative overflow-hidden border-none p-0 rounded-xl bg-transparent text-card-foreground gap-0 shadow-md">
              {/* Top image */}
              <div className="relative">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  width={600}
                  height={400}
                  className="h-48 translate-y-3 w-full object-cover object-top rounded-t-xl"
                />
                {tool.badge && (
                  <Badge className="absolute right-3 top-6 rounded bg-primary text-foreground">
                    {tool.badge}
                  </Badge>
                )}
              </div>

              <CardContent className="p-0 bg-card border rounded-t-2xl z-1 pt-4 px-4 min-h-[180px] flex flex-col">
                <CardTitle className="text-lg font-extrabold tracking-tight text-foreground">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {tool.description}
                </CardDescription>
                <div className="flex items-center justify-between bg-muted/80 py-3 mt-auto">
                  <Button size={"sm"} className="rounded" variant="outline">
                    <Link href={tool.href}>Learn More</Link>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      className="rounded tools-carousel-prev"
                      size="icon"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      className="rounded tools-carousel-next"
                      size="icon"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
