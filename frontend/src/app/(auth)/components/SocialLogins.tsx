"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SocialLogins() {
  const [hoverApple, setHoverApple] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Google Button */}
      <Button
        className={cn(
          "flex-1 min-w-0 flex items-center justify-center h-11 rounded-[8px] border border-[color:var(--secondary)]",
          "bg-transparent text-[color:var(--foreground)] font-medium text-[16px] leading-[24px] px-4 text-center",
          "hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors duration-200"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <Image src="/assets/google.png" alt="Google" width={20} height={20} />
          <span className="whitespace-nowrap">Sign in with Google</span>
        </div>
      </Button>

      {/* Apple Button */}
      <Button
        onMouseEnter={() => setHoverApple(true)}
        onMouseLeave={() => setHoverApple(false)}
        className={cn(
          "flex-1 min-w-0 flex items-center justify-center h-11 rounded-[8px] border border-[color:var(--secondary)]",
          "bg-[color:var(--foreground)] text-[color:var(--background)] font-medium text-[16px] leading-[24px] px-4 text-center",
          "hover:bg-transparent hover:text-[color:var(--foreground)] transition-colors duration-200"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <Image
            src={
              hoverApple
                ? "/icons/app-store.png"
                : "/assets/white-app-store.png"
            }
            alt="Apple"
            width={20}
            height={20}
          />
          <span className="whitespace-nowrap">Sign in with Apple</span>
        </div>
      </Button>
    </div>
  );
}
