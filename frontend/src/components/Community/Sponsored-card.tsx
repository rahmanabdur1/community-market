"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sponsors = [
  {
    title: "Premium Fishing Gear",
    desc: "Upgrade your fishing experience with our top-quality gear.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2zOE5EwDRa58SxhGbtzbwvzl8P6DXngshoPLA5u-8uRtuqj6ys6mCEqxfWUe8zmgZF5ksid-5Xhvaz5ozFPqlYf0S5euSBNsG3pj808wQuOAP_oDnmf6IvhqCgAdDeklcgfZ_pSouFeEB_H-IvlYEB7ErV4bVb061Z12f3KOtb7Rwc_5plzvwirCdbvY24aXkwdokldHDiC86bp2I9XIoJo3lncY7KZn2Yra_gm4tOKItDpCJLcpFcYXEPdB42CPvX8GUqZsvGG6d",
    action: "Shop Now",
  },
  {
    title: "Rent a Fishing Boat",
    desc: "Explore the waters with our fleet of rental fishing boats.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMPSiKR6ZoizEyC0-AuH3w2UG9zJ4AeepR5QMr5ULWQg2E8MgtnMSn28KSZT5n8NoTE3KZsA1D9hj0liHBFzN_SFImi2fUIRpCULSf50ZQr9Ul1esY8nrojus5wrK9xZoDDTF1avj_43swJrA1pGNkFXcQmC24ViXxcrdHGxFGlClx9KzIMFEwJe39gViUMwlb2PYg4V5nJ9kIsur0sJuTv0O6qbLgMudS1PIFQF_y-Qmq8PcKmc7P4lnvxJNnXu9uzazWF20jAeWc",
    action: "Book Now",
  },
  {
    title: "Stylish Fishing Apparel",
    desc: "Look good and stay comfortable with our fishing apparel.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZTQ5-MqQ0y6v9if_FfDN2dN8yRsZkqLBnBqg0hK4h0z-xr1xXeK0vvEXCl2XWPV2ugBXOqYdD5DKjljnf_ctLTQ_PBNJurWhbxi1u7OffQsBtTRi4yVnXUq97p48fS0B2rkVxtiz519_gXMbwb3uVQ8_xYgWBzjtkfJS8iFuIb9f6eKj7FeyoITeGHVRQFwtOfET9DZy7D3emYDCBPjHsoLQKIYGYlZZMGpRFv3eaZXoZclIaIHs4Fn4BnwD9NvrH32JQ8otS24Z",
    action: "View Collection",
  },
  {
    title: "Stylish Fishing Apparel",
    desc: "Look good and stay comfortable with our fishing apparel.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZTQ5-MqQ0y6v9if_FfDN2dN8yRsZkqLBnBqg0hK4h0z-xr1xXeK0vvEXCl2XWPV2ugBXOqYdD5DKjljnf_ctLTQ_PBNJurWhbxi1u7OffQsBtTRi4yVnXUq97p48fS0B2rkVxtiz519_gXMbwb3uVQ8_xYgWBzjtkfJS8iFuIb9f6eKj7FeyoITeGHVRQFwtOfET9DZy7D3emYDCBPjHsoLQKIYGYlZZMGpRFv3eaZXoZclIaIHs4Fn4BnwD9NvrH32JQ8otS24Z",
    action: "View Collection",
  },
  {
    title: "Stylish Fishing Apparel",
    desc: "Look good and stay comfortable with our fishing apparel.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZTQ5-MqQ0y6v9if_FfDN2dN8yRsZkqLBnBqg0hK4h0z-xr1xXeK0vvEXCl2XWPV2ugBXOqYdD5DKjljnf_ctLTQ_PBNJurWhbxi1u7OffQsBtTRi4yVnXUq97p48fS0B2rkVxtiz519_gXMbwb3uVQ8_xYgWBzjtkfJS8iFuIb9f6eKj7FeyoITeGHVRQFwtOfET9DZy7D3emYDCBPjHsoLQKIYGYlZZMGpRFv3eaZXoZclIaIHs4Fn4BnwD9NvrH32JQ8otS24Z",
    action: "View Collection",
  },
];

export default function SponsorsCarousel() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-20 xl:px-40 py-12">
      <Carousel className="relative">
        <CarouselContent className="space-x-6">
          {sponsors.map((s, i) => (
            <CarouselItem
              key={i}
              className="flex-none w-full sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative">
                  <div
                    className="w-full aspect-video rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.img})` }}
                  />
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    Ad
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#0d171b]">{s.title}</p>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                  <Button className="mt-4 w-full">{s.action}</Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
          ◀
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
          ▶
        </CarouselNext>
      </Carousel>
    </section>
  );
}
