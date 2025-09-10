import Image from "next/image";
import { cn } from "@/lib/utils";
import LoginForm from "../components/LoginForm";
import SocialLogins from "../components/SocialLogins";

export default function LoginPage() {
  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row font-font-chakra items-stretch justify-between bg-muted p-4 md:p-6 rounded-2xl gap-5"
      )}
    >
      <div className="flex w-full lg:w-1/2 h-[870px] ">
        <Image
          src="/assets/login.jpg"
          alt="Login illustration"
          width={674}
          height={484}
          className="w-full  object-cover rounded-2xl "
        />
      </div>

      <div className="lg:w-1/2  flex w-full flex-col lg:w-1/2   justify-between rounded-2xl border border-brand-mist bg-brand-gray-soft lg:w-1/2">
        <div className={cn("p-6 md:p-12 flex flex-col ")}>
          <div className={cn("mb-6 md:mb-8")}>
            <h1
              className={cn(
                "text-brand-deep font-bold text-[32px] md:text-[50px] leading-[40px] md:leading-[63px] tracking-[0]"
              )}
            >
              Your Gateway to the Fantasy Sports World
            </h1>
            <p
              className={cn(
                "mt-2 md:mt-3 text-muted-foreground font-medium text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-[0]"
              )}
            >
              Join the ultimate hub for fantasy sports fans. Log in to track
              trades, catch the latest rumors, and stay ahead with expert
              insights — all in one place.
            </p>
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
