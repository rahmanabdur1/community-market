"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SocialLogins() {
  const [hoverApple, setHoverApple] = useState(false);

  return (
    <div className={cn("flex flex-col gap-4")}>
      <Button
        className={cn(
          "flex items-center justify-center w-full h-11 gap-3 rounded-[8px] border border-[color:var(--secondary)]",
          "bg-transparent text-[color:var(--foreground)] font-medium text-[18px] leading-[24px] px-6 py-3 text-center",
          "hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] transition-colors duration-200"
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/google.png"
            alt="Google Play"
            width={20}
            height={20}
          />
          <span>Sign in with Google</span>
        </div>
      </Button>

      <Button
        onMouseEnter={() => setHoverApple(true)}
        onMouseLeave={() => setHoverApple(false)}
        className={cn(
          "flex items-center justify-center w-full h-11 gap-3 rounded-[8px] border border-[color:var(--secondary)]",
          "bg-[color:var(--foreground)] text-[color:var(--background)] font-medium text-[18px] leading-[24px] px-6 py-3 text-center",
          "hover:bg-transparent hover:text-[color:var(--foreground)] transition-colors duration-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-full flex items-center justify-center">
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
          </div>
          <span>Sign in with Apple</span>
        </div>
      </Button>
    </div>
  );
}
