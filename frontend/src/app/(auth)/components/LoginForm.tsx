"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/types/auth.type";
import { loginUser } from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { handleApiError } from "@/services/api";
import { useSessionStore } from "@/store/useSessionStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setSession } = useSessionStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });


  const mutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await loginUser(data);

      setSession(
        {
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        },
        {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        }
      );

      Cookies.set("accessToken", response.access_token, { expires: 1 });
      Cookies.set("refreshToken", response.refresh_token, { expires: 7 });

      router.push("/dashboard");

      return response;
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4 md:gap-5")}
    >
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
            className={cn("absolute left-3")}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            className={cn(
              "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-3 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
            )}
            required
          />
        </div>
        {errors.email && (
          <p className="text-[var(--destructive)] text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={cn("flex flex-col gap-2")}>
        <label
          htmlFor="password"
          className={cn(
            "text-[color:var(--secondary-foreground)] font-medium text-[16px] leading-[19px]"
          )}
        >
          Password
        </label>
        <div className={cn("relative flex items-center")}>
          <Image
            src="/assets/password.png"
            alt="Password Icon"
            width={18}
            height={16}
            className={cn("absolute left-3")}
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={cn(
              "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-10 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
            )}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn("absolute right-3 cursor-pointer")}
          >
            <Image
              src="/assets/showpassword.png"
              alt={showPassword ? "Hide Password" : "Show Password"}
              width={20}
              height={15}
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-[var(--destructive)] text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Error from mutation */}
      {mutation.isError && (
        <p className="text-[var(--destructive)] text-sm">
          {handleApiError(mutation.error).message ||
            "Failed to login. Try again."}
        </p>
      )}

      <div className={cn("flex items-center gap-2 flex-wrap")}>
        <span
          className={cn(
            "font-secondary font-normal text-[16px] leading-[20px] text-[color:var(--text-default-1)]"
          )}
        >
          New at FantasyBuzz?
        </span>
        <Link
          href="/register"
          className={cn(
            "font-secondary font-bold text-[16px] leading-[20px] text-[color:var(--text-default-2)] hover:underline"
          )}
        >
          Create Account
        </Link>
      </div>

      <div className={cn("flex items-center justify-between flex-wrap")}>
        <div className={cn("flex items-center gap-2 text-sm")}>
          <div
            className={cn(
              "w-[20px] h-[20px] border-[1.5px] border-[var(--ring)] rounded-full flex items-center justify-center opacity-100"
            )}
          >
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3335 7.04167C1.3335 7.04167 3.20016 8.10628 4.1335 9.66667C4.1335 9.66667 6.9335 3.54167 10.6668 1.5"
                stroke="#102D39"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className={cn(
              "font-secondary font-normal text-[16px] leading-[20px] text-[color:var(--text-default-2)]"
            )}
          >
            Remember Me
          </span>
        </div>
        <Link
          href="/forgot-password"
          className={cn(
            "font-secondary font-bold text-[16px] leading-[20px] text-[color:var(--text-default-2)] hover:underline"
          )}
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className={cn(
          "h-11 rounded-[8px] bg-primary px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-foreground hover:bg-primary/90 transition-colors duration-200"
        )}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
