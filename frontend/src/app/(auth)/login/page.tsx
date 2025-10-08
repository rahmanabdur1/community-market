"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import LoginForm from "../components/LoginForm";
import SocialLogins from "../components/SocialLogins";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  const router = useRouter();
  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row items-stretch justify-between rounded-2xl"
      )}
    >
      <div
        className="relative  lg:w-1/2 
                     h-[218px] sm:h-[300px] md:h-[400px] lg:h-[718px] 
                     rounded-0  sm:rounded-2xl
                     overflow-hidden 
                     m-0 sm:m-3  
     
                     border-b border-secondary lg:border-b-0"
      >
        <Image
          src="/assets/login.jpg"
          alt="Login illustration"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#102D39]" />

        {/* Close Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => router.push("/")}
          className="absolute top-8 left-8 w-9 h-9 rounded-full bg-[#FBFCFF] hover:bg-gray-100 shadow-md"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4988 12.5L1.5 1.5M1.50117 12.5L12.5 1.5"
              stroke="#102D39"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        <div className="absolute bottom-6 md:bottom-8 left-5 md:left-8 right-6 md:right-8 text-white">
          <h1 className="font-bold text-[24px] md:text-[36px] lg:text-[52px] font-font-chakra leading-[28px] md:leading-[36px] lg:leading-[72px] mb-2 lg:mb-4">
            Your Gateway to the Fantasy Sports World
          </h1>
          <p className="font-inter text-[14px] md:text-[16px] leading-[17px] md:leading-[20px] lg:leading-[24px] text-[var(--brand-gray-soft)]">
            Join the ultimate hub for fantasy sports fans. Log in to track
            trades, catch the latest rumors, and stay ahead with expert insights
            — all in one place.
          </p>
        </div>
      </div>
      {/* leftside */}
      <div
        className="flex flex-col justify-between bg-muted border border-secondary 
                     m-3                 
        lg:w-1/2 rounded-2xl p-4 md:p-8"
      >
        <div className={cn(" flex flex-col ")}>
          <div className={cn("mb-2 md:mb-3")}>
            <h2
              className={cn(
                "text-brand-deep font-bold text-[20px] md:text-[32px] tracking-[0]",
                ""
              )}
            >
              Welcome Back!
            </h2>
          </div>
          <LoginForm />
          <div
            className={cn(
              "flex items-center gap-2 text-[16px] my-5 leading-[20px] font-normal text-[color:var(--muted-foreground)]"
            )}
          >
            <div
              className={cn(
                "flex-1 h-[0px] border-t border-[color:var(--secondary)] opacity-100"
              )}
            />
            <span>or</span>
            <div
              className={cn(
                "flex-1 h-[0px] border-t border-[color:var(--secondary)] opacity-100"
              )}
            />
          </div>
          <SocialLogins />
        </div>
      </div>
    </section>
  );
}
