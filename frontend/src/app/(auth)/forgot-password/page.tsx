"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ForgotPasswordSchema, ForgotPasswordInput } from "@/types/auth.type";
import { resetPassword } from "@/services/auth.service";
import { handleApiError } from "@/services/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => resetPassword(email),
    onSuccess: () => reset(),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data.email);
  };

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

        <div className="absolute bottom-6 lg:bottom-12 left-5 lg:left-8 right-6 lg:right-8 text-white">
          <h1 className="font-font-chakra font-bold text-[24px] lg:text-[52px] leading-[28px] lg:leading-[72px] mb-2 lg:mb-4">
            Your Gateway to the Fantasy Sports World
          </h1>
          <p className="text-[14px] lg:text-[16px] leading-[17px] lg:leading-[24px] text-[var(--brand-gray-soft)]">
            Join the ultimate hub for fantasy sports fans. Log in to track
            trades, catch the latest rumors, and stay ahead with expert insights
            — all in one place.
          </p>
        </div>
      </div>

      {/* Leftside form */}
      <div
        className="flex flex-col justify-between bg-muted border border-secondary 
                     m-3                 
        lg:w-1/2 rounded-2xl p-4 md:p-8"
      >
        <div className=" flex flex-col">
          <div className="mb-2 md:mb-3">
            <h2 className="text-brand-deep font-font-chakra font-bold text-[20px] md:text-[32px] tracking-normal">
              Forgot Password!
            </h2>
            <p className="mt-2 md:mt-3 text-muted-foreground font-medium text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-normal">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-5"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[color:var(--secondary-foreground)] font-medium text-[16px] md:text-[17px] leading-[20px] md:leading-[22px]"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <Image
                  src="/assets/email.png"
                  alt="Email Icon"
                  width={18}
                  height={16}
                  className="absolute left-3"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-3 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] text-[16px] leading-[19px]"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {mutation.isError && (
              <p className="text-[var(--destructive)] text-sm">
                {handleApiError(mutation.error).message ||
                  "Failed to send reset link."}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-[var(--success)] text-sm">
                Password reset link sent. Check your mail inbox.
              </p>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-11 rounded-[8px] mt-1 bg-foreground px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-background hover:bg-foreground/90 transition-colors duration-200"
            >
              {mutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="flex items-center mt-3 gap-2 flex-wrap">
            <span className="text-[16px] leading-[20px] text-[color:var(--text-default-1)]">
              Remembered your password?
            </span>
            <Link
              href="/login"
              className="font-bold text-[16px] leading-[20px] text-[color:var(--text-default-2)] hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}