import { useEffect, useState } from "react";
import { Button } from "../../../ui/button";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../ui/command";
import Link from "next/link";

function GlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onK);
    return () => window.removeEventListener("keydown", onK);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-full border border-foreground hover:bg-primary/50"
      >
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search players, articles, tools…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            <CommandItem asChild>
              <Link href="/tools/rankings">Rankings</Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href="/tools/adp">ADP Trends</Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href="/news/players">Player News</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Draft">
            <CommandItem asChild>
              <Link href="/draft/mock/snake">Mock Draft (Snake)</Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href="/draft/mock/auction">Mock Draft (Auction)</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default GlobalSearch;
