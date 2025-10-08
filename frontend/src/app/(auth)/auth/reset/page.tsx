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
import { Toaster, toast } from "sonner";

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
    reset,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { token: "", new_password: "", confirm_password: "" },
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPasswordWithToken(data),
    onSuccess: () => {
      toast.success("Password reset successfully! Redirecting to login...");
      reset();
      setTimeout(() => router.push("/login"), 2000);
    },
    onError: (error: unknown) => {
      const normalizedError = handleApiError(error);
      toast.error(normalizedError.message || "Failed to reset password");
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
      toast.error("Invalid or missing reset token.");
    }
  }, [setValue]);

  const onSubmit = (data: ResetPasswordInput) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Toaster position="top-right" />
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
          {/* Background Image */}
          <Image
            src="/assets/login.jpg"
            alt="Login illustration"
            fill
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#102D39]" />

          {/* Top-left Close Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => router.push("/")}
            className="absolute top-[30.67px] left-[30.67px] w-[36.67px] h-[36.67px] rounded-full bg-[#FBFCFF] hover:bg-gray-100 shadow-md"
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
            <h1 className="font-bold text-[24px] font-font-chakra lg:text-[52px] leading-[28px] lg:leading-[72px] tracking-normal mb-2 lg:mb-4">
              Your Gateway to the Fantasy Sports World
            </h1>
            <p className="font-inter text-[14px] lg:text-[16px] leading-[17px] lg:leading-[24px] tracking-normal text-[var(--brand-gray-soft)]">
              Join the ultimate hub for fantasy sports fans. Log in to track
              trades, catch the latest rumors, and stay ahead with expert
              insights — all in one place.
            </p>
          </div>
        </div>

        {/* leftside */}
        <div
          className="flex flex-col justify-between bg-muted border border-secondary 
                     m-3                 
        lg:w-1/2 rounded-2xl p-4 md:p-8"
        >
          <div className={cn("flex flex-col ")}>
            <div className={cn("mb-2 md:mb-3")}>
              <h2
                className={cn(
                  "text-brand-deep font-bold text-[20px] md:text-[32px] tracking-[0]",
                  ""
                )}
              >
                Reset Password!
              </h2>
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
                      "h-11 w-full rounded-[4px] border  border-[color:var(--secondary)] pl-10 pr-10 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 cursor-pointer"
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
                    className="absolute right-3 cursor-pointer"
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
                  "h-11 rounded-[8px] bg-foreground px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-background hover:bg-foreground/90 transition-colors duration-200"
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
    </>
  );
}
