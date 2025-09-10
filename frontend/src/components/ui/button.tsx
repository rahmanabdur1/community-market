"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button variants aligned to your global theme tokens:
 * - default: bg-foreground, text-primary (brand-first)
 * - secondary: bg-primary, text-foreground
 * - outline: border-foreground, text-foreground, transparent bg
 *
 * Enhanced interactions:
 * - Smooth downward translation on hover (more natural than upward)
 * - Subtle shadow changes for depth
 * - Crisp focus ring from --ring
 */
const buttonVariants = cva(
  [
    // layout
    "relative inline-flex items-center justify-center gap-2 shrink-0 select-none",
    "whitespace-nowrap rounded-lg text-sm font-medium",
    // transitions & interactions - smoother downward translation
    "transition-all duration-200 ease-out",
    "hover:translate-y-0.5 hover:shadow-md active:translate-y-0",
    // focus & accessibility
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/90",
    // disabled / invalid
    "disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    // icons inside
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    // cursor
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-foreground text-primary shadow-sm hover:bg-foreground/90",
        secondary: "bg-primary text-foreground shadow-sm hover:bg-primary/90",
        outline:
          "bg-transparent border border-foreground text-foreground shadow-sm hover:bg-accent/20",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/25 dark:focus-visible:ring-destructive/40",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1.5 rounded-md gap-1.5 has-[>svg]:px-2.5",
        lg: "h-11 px-6 rounded-md has-[>svg]:px-4",
        icon: "size-10 p-0 rounded-full",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      block: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Show a loading spinner and disable interactions */
  loading?: boolean;
  /** Optional leading icon element */
  leftIcon?: React.ReactNode;
  /** Optional trailing icon element */
  rightIcon?: React.ReactNode;
  /** Button type — defaults to 'button' (not 'submit') */
  type?: "button" | "submit" | "reset";
}

/**
 * Flexible, theme-aligned Button with smooth downward hover effect
 * - Uses CSS tokens from your global.css
 * - Smooth downward translation on hover (more natural)
 * - Loading state with centered spinner overlay
 * - Supports asChild (Radix Slot), icons, full-width (block), sizes
 */
function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      // data attrs for easier styling hooks if ever needed
      data-loading={loading ? "true" : undefined}
      aria-busy={loading || undefined}
      aria-disabled={loading || props.disabled ? true : undefined}
      type={asChild ? undefined : type}
      className={cn(
        buttonVariants({ variant, size, block }),
        // while loading, keep layout but mute content interactions
        loading && "pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Content wrapper: fades out when loading but keeps size */}
      <span
        className={cn("inline-flex items-center gap-2", loading && "opacity-0")}
      >
        {leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className="inline-flex">{rightIcon}</span> : null}
      </span>

      {/* Centered spinner when loading */}
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <Loader2 className="size-4 animate-spin" />
        </span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
