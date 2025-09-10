"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordSchema, ResetPasswordInput } from "@/types/auth.type";
import { resetPasswordWithToken } from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/services/api";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { token: "", new_password: "", confirm_password: "" },
  });

  // ✅ Mutation with TanStack Query
  const mutation = useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPasswordWithToken(data),
    onSuccess: () => {
      alert("Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    },
    onError: (error: unknown) => {
      const normalizedError = handleApiError(error);
      alert(normalizedError.message || "Failed to reset password");
    },
  });

  useEffect(() => {
    let tokenFromUrl: string | null = null;

    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.replace("#", ""));
      tokenFromUrl = params.get("access_token");
    }

    if (!tokenFromUrl) {
      const params = new URLSearchParams(window.location.search);
      tokenFromUrl = params.get("token");
    }

    if (tokenFromUrl) {
      setValue("token", tokenFromUrl);
    } else {
      alert("Invalid or missing reset token.");
    }
  }, [setValue]);

  const onSubmit = (data: ResetPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row font-font-chakra items-stretch justify-between bg-muted p-4 md:p-6 rounded-2xl gap-5 min-h-screen"
      )}
    >
      <div className={cn("flex justify-center w-full h-[870px] lg:w-1/2")}>
        <Image
          src="/assets/login.jpg"
          alt="Reset Password illustration"
          width={674}
          height={484}
          priority
          className={cn("w-full object-cover opacity-100 rotate-0 rounded-2xl")}
        />
      </div>

      {/* Right Form */}
      <div
        className={cn(
          "flex flex-col rounded-2xl bg-brand-gray-soft border border-brand-mist w-full lg:w-1/2"
        )}
      >
        <div className={cn("p-6 md:p-12 flex flex-col justify-center")}>
          <div className={cn("mb-6 md:mb-8")}>
            <h1
              className={cn(
                "text-brand-deep font-bold text-[32px] md:text-[50px] leading-[40px] md:leading-[63px] tracking-[0]"
              )}
            >
              Reset Password
            </h1>
            <p
              className={cn(
                "mt-2 md:mt-3 text-muted-foreground font-medium text-[14px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-[0]"
              )}
            >
              Set a new password for your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-4 md:gap-5")}
          >
            {/* New Password */}
            <div className={cn("flex flex-col gap-2")}>
              <label
                htmlFor="new_password"
                className="text-[color:var(--secondary-foreground)] font-medium text-[16px] md:text-[17px] leading-[20px] md:leading-[22px]"
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <Image
                  src="/assets/password.png"
                  alt="Password Icon"
                  width={18}
                  height={16}
                  className="absolute left-3"
                />
                <Input
                  id="new_password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("new_password")}
                  className={cn(
                    "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-10 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3"
                >
                  <Image
                    src="/assets/showpassword.png"
                    alt={showNewPassword ? "Hide Password" : "Show Password"}
                    width={20}
                    height={15}
                  />
                </button>
              </div>
              {errors.new_password && (
                <p className="text-[var(--destructive)] text-sm">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className={cn("flex flex-col gap-2")}>
              <label
                htmlFor="confirm_password"
                className="text-[color:var(--secondary-foreground)] font-medium text-[16px] md:text-[17px] leading-[20px] md:leading-[22px]"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Image
                  src="/assets/password.png"
                  alt="Password Icon"
                  width={18}
                  height={16}
                  className="absolute left-3"
                />
                <Input
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirm_password")}
                  className={cn(
                    "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-10 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3"
                >
                  <Image
                    src="/assets/showpassword.png"
                    alt={
                      showConfirmPassword ? "Hide Password" : "Show Password"
                    }
                    width={20}
                    height={15}
                  />
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-[var(--destructive)] text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={mutation.isPending || !getValues("token")}
              className={cn(
                "h-11 rounded-[8px] bg-primary px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-foreground hover:bg-primary/90 transition-colors duration-200"
              )}
            >
              {mutation.isPending ? "Resetting..." : "Reset Password"}
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
