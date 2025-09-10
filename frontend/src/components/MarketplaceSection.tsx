"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Role {
  title: string;
  desc: string;
  img: string;
  icon: string;
}

const roles: Role[] = [
  {
    title: "Pond Owners",
    desc: "Manage your pond, set rules, and attract anglers to your private fishing haven.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNqHTHb2wcec45NK02ItyQk8ofY_5CU44L8yeUkjauq44EB7vjV2mJAwt1iWRArHlyiUCMNd7IoT7g5sGz8JT8w-NhMYFtlfNRRkQIWmXv5pRO25iThl1rQK6nXICVwrhL9WhY7J90VzuA1eHbhVtewxTIZwP-h3gbk4syW0MBfEtO7ru5fFB502XdVceIGGP5AobRs_SKMfrlmIUUEq05_z15rwDNFie137ss3q6oZRk8TBP_l7OWvealj9P-_C0BlFs97OoQgbNd",
    icon: "ph_fish",
  },
  {
    title: "Spot Listers",
    desc: "List your fishing spots, provide details, and connect with enthusiasts.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnJy9l3CXC8v9Ydg-MrAMc3W3wWUIlgjPUhY9FaXM2jjc3lduiyGEUG2TUr46nYJXnGqIWecpHCmKaa7VAApspe0BURyPZVYJO-JFATHHelcLHkp2Kcg4C-sno5iF_j9F67CjKWpFuLnJNgs05fv_JcbNdxLxI3sjMJDmuKI7tbDacGNlXrsWoOPS2zq2T3sMtHaWNl7XU17Q4LZvJWD6WST0ag7Ow3HDetfFhaF6CYpyC-b4WboxFmY1OMV3FG4iSmO3xwMoQ6a7_",
    icon: "location_on",
  },
  {
    title: "Gear Rentals",
    desc: "Offer fishing gear for rent, manage inventory, and reach a wider audience.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUCiekMFsid2sbm4g3_9IzT8wuvcp9byrI0km8AiFJaPEOTH-J1HP-_91ImbdljXY7-XQGOUaPGxJCb1k753hJ8_S-cWEcDIdWuEKSppYfqt3ekkYbFesxUoYftmVU0UZvwwzUGuHH1ZTHZy8NbR7o3szqrRYDf2zwSQdYueHdDo-acnSbsW7qS-oS10HbPj4-mcZ1ha63rqrpKEG9cXpdWDc1sagvhyRMTK1qBNiiGfr6haBV09SYoWgsUayxfi6nd20QgjCPUTi2",
    icon: "kayaking",
  },
  {
    title: "Bloggers/Trainers",
    desc: "Share your expertise, write articles, and connect with the fishing community.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa3VMOT-vE-bmC5Dxl3DQW0WdpIF5G8sQQX1ucFb__m2j1BR-XPIJzN0YBdZ-k-eezdzXKHcoUbzes-_I5pAM--TWVlyT_seAyJ1OvG4YaOMirdk8ltwFH4rBaHwFPbs0p41BWSjhNi_L6xkwbLe2aBDEqvp8kgs6xoNEYOMm36wu5V1RaIUm5wGVQP6_c6h8QHMP91Az2qtu1knX6pfoDM93gVz9CQ_nst1Wj74BWswMyZIOHsmYeXGQu5-n0N-U96vI3iRn0LoDI",
    icon: "edit",
  },
  {
    title: "Guides",
    desc: "Provide guided fishing tours, showcase your skills, and attract clients.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgm2k3rUiFxpaveMn_f8bYNMqAAGUR_LAN3OnhgALGaUiaz-TFAVK-Y85AEZC0cw_kUaFXfpe1vv1SsW-tUCzoiGwHFvY41YUhliyQsI7X4sszIh4BYl_EhG3wLyej7eXDsjo_nnblOK9s4kVa2E8qmHOy60JE61VkqVh3wFxI-Kb9zCx04RxAwAsRYhMrbQ9EXysSibHh-VkvcakzXsx686Jo01hMK_VkAAa63BsYco7ruJjEMB3_nUUDrsqo0IYxEDC4g-T6dTO4",
    icon: "explore",
  },
  {
    title: "Others",
    desc: "Explore other roles and opportunities within the fishing marketplace.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWrhfQhxTNOavujaSC3ioZgann7uqVfGqybdc0OEyoK9r75yR4EMLdS7jgWQaHisu6ZJmcugvO_9L0bhjvvacT8dhxaUk26eSV7dJamuD4cFGYmMA0VLz1raWEpW0VgExKp39ozVJ7fi1QLZWZHAo6rKphzkbxjYiPBfQhKh28L92ur0TV2A66CUN6j1dwkpI_q5hyZzbzZ34enDjeSrsQ30XJ9R-6FadiAOrRjMb6YdJUX_rZWvGOWtLflYOn8veJsINMIqHu5n3L",
    icon: "groups",
  },
];

export default function MarketplaceCarousel() {
  return (
    <section className="flex flex-1 flex-col bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 border-b-2 border-green-800 inline-block pb-1">
            Discover Your Role
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore the Marketplace
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-xl text-slate-500">
            Find your place in our fishing community. Whether you own a pond,
            list spots, or offer gear, there’s a role for you.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-12 relative">
          <Carousel>
            <CarouselContent className="space-x-6">
              {roles.map((role, index) => (
                <CarouselItem
                  key={index}
                  className="flex-none w-full sm:w-[45%] lg:w-[30%]"
                >
                  <Card
                    className={cn(
                      "overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                    )}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={role.img}
                        alt={role.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col gap-4 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 text-white">
                        <span className="material-symbols-outlined text-3xl">
                          {role.icon}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {role.title}
                        </h3>
                        <p className="text-sm text-slate-500 hover:text-blue-700 cursor-pointer">
                          {role.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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
        </div>
      </div>
    </section>
  );
}
