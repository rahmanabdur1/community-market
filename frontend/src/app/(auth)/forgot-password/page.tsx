"use client";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => resetPassword(email),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data.email);
  };

  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row font-font-chakra items-stretch justify-between bg-muted p-4 md:p-6 rounded-2xl gap-5 min-h-screen"
      )}
    >
      <div className={cn("flex justify-center w-full lg:w-1/2 h-[850px]")}>
        <Image
          src="/assets/login.jpg"
          alt="Forgot Password illustration"
          width={674}
          height={484}
          priority
          className={cn("w-full object-cover opacity-100 rotate-0 rounded-2xl")}
        />
      </div>

      <div
        className={cn(
          "flex flex-col rounded-2xl h-auto md:h-[600px] lg:h-[850px] overflow-y-auto justify-between bg-brand-gray-soft border border-brand-mist w-full lg:w-1/2"
        )}
      >
        <div className={cn("p-6 md:p-12 flex flex-col h-full")}>
          <div className={cn("mb-6 md:mb-8")}>
            <h1
              className={cn(
                "text-brand-deep font-bold text-[32px] md:text-[50px] leading-[40px] md:leading-[63px] tracking-[0]"
              )}
            >
              Forgot Password
            </h1>
            <p
              className={cn(
                "mt-2 md:mt-3 text-muted-foreground font-medium text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-[0]"
              )}
            >
              Enter your email to receive a password reset link.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-4 md:gap-5")}
          >
            {/* Email Field */}
            <div className={cn("flex flex-col gap-2")}>
              <label
                htmlFor="email"
                className={cn(
                  "text-[color:var(--secondary-foreground)] font-medium text-[16px] md:text-[17px] leading-[20px] md:leading-[22px]"
                )}
              >
                Email
              </label>
              <div className={cn("relative flex items-center")}>
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
                  className={cn(
                    "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-3 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Error/Success */}
            {mutation.isError && (
              <p className="text-[var(--destructive)] text-sm">
                {handleApiError(mutation.error).message ||
                  "Failed to send reset link."}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-[var(--success)] text-sm">
                Password reset link sent. Check your inbox.
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className={cn(
                "h-11 rounded-[8px] bg-primary px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-foreground hover:bg-primary/90 transition-colors duration-200"
              )}
            >
              {mutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="flex items-center mt-3 gap-2 flex-wrap">
            <span className="font-secondary font-normal text-[16px] leading-[20px] text-[color:var(--text-default-1)]">
              Remembered your password?{" "}
            </span>
            <Link
              href="/login"
              className="font-secondary font-bold text-[16px] leading-[20px] text-[color:var(--text-default-2)] hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
