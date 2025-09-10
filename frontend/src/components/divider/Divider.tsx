import { cn } from "@/lib/utils";

export default function Divider() {
  return (
    <div className={cn("flex items-center gap-2 text-[16px] my-5 leading-[20px] font-normal text-[color:var(--muted-foreground)]")}>
      <div className={cn("flex-1 h-[0px] border-t border-[color:var(--secondary)] opacity-100")} />
      <span>or</span>
      <div className={cn("flex-1 h-[0px] border-t border-[color:var(--secondary)] opacity-100")} />
    </div>
  );
}
