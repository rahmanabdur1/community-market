import { NavItem } from "@/types/menu.type";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../ui/sheet";
import { Button } from "../../../ui/button";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../../../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { Badge } from "../../../ui/badge";

function MobileNav({ items }: { items: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
        <SheetHeader className="px-4 pb-2 pt-4">
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-xl ring-1 ring-border">
                {/* Replace with your logo path */}
                <Image
                  src="/logo.png"
                  alt="FantasyBuzz"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-base font-semibold">FantasyBuzz</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="px-2 py-2">
          <Accordion type="multiple" className="w-full">
            {items.map((item) => {
              const hasChildren = item.children || item.mega;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              }
              const flatChildren = [
                ...(item.children || []),
                ...(item.mega || []).flatMap((c) => c.items),
              ];
              return (
                <AccordionItem
                  key={item.label}
                  value={item.label}
                  className="border-b-0"
                >
                  <AccordionTrigger className="px-3 py-2 text-left text-sm font-semibold hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <ul className="space-y-1.5">
                      {flatChildren.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            <span>{c.label}</span>
                            {c.badge && <Badge>{c.badge}</Badge>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
