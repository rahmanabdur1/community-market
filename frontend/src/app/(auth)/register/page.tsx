import Image from "next/image";
import { cn } from "@/lib/utils";
import RegisterForm from "../components/RegisterForm";
import SocialLogins from "../components/SocialLogins";

export default function RegisterPage() {
  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row font-font-chakra items-stretch justify-between bg-muted p-4 md:p-6 rounded-2xl gap-5"
      )}
    >
      <div
        className={cn("flex justify-center w-full lg:h-[1020px]   lg:w-1/2 ")}
      >
        <Image
          src="/assets/login.jpg"
          alt="Register illustration"
          width={674}
          height={484}
          priority
          className={cn("w-full h-full object-cover rounded-2xl")}
        />
      </div>

      <div
        className={cn(
          "flex flex-col rounded-2xl   justify-between bg-brand-gray-soft border border-brand-mist w-full lg:w-1/2"
        )}
      >
        <div className={cn("p-6 md:p-12 flex flex-col ")}>
          <div className={cn("mb-6 md:mb-8")}>
            <h1
              className={cn(
                "text-brand-deep font-bold text-[32px] md:text-[50px] leading-[40px] md:leading-[63px] tracking-[0]"
              )}
            >
              Create Your FantasyBuzz Account
            </h1>
            <p
              className={cn(
                "mt-2 md:mt-3 text-muted-foreground font-medium text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-[0]"
              )}
            >
              Join the ultimate hub for fantasy sports fans. Register now to
              start tracking trades, rumors, and insights!
            </p>
          </div>
          <RegisterForm />
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
