"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  variant?: "fade" | "slide" | "scale" | "flip" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  threshold?: number;
  amount?: number | "some" | "all";
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "fade",
  direction = "up",
  duration = 0.5,
  delay = 0.1,
  amount = 0.3,
  once = true,
  className = "",
  as = "div",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount,
    once,
  });

  // Animation variants
  const variants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: {
        opacity: 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
        },
      },
    },
  };

  const MotionComponent: React.ElementType =
    (motion as unknown as Record<string, React.ElementType>)[as as string] ||
    motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: variant === "bounce" ? "easeOut" : [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Reveal;
