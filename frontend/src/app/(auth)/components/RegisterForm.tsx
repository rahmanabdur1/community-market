"use client";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/types/auth.type";
import { registerUser } from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { handleApiError } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });
 console.log(errors)
  const mutation = useMutation<
    RegisterInput,
    AxiosError<{ message?: string }>,
    RegisterInput
  >({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => reset(),
    onError: (error) => {
      if (error.response?.data?.message === "Email already exists") {
        setError("email", {
          type: "manual",
          message: "Email already exists, try another email!",
        });
      }
    },
  });
  const onSubmit = (data: RegisterInput) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4 md:gap-5")}
    >
      {/* Username */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="displayName"
          className="text-[color:var(--secondary-foreground)]  font-medium text-[16px] md:text-[17px] leading-[20px] md:leading-[22px]"
        >
          Username
        </label>
        <Input
          id="displayName"
          type="text"
          placeholder="Username"
          {...register("displayName")}
          className={cn(
            "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-3 pr-3 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
          )}
        />
        {errors.displayName && (
          <p className="text-[var(--destructive)] text-sm">
            {errors.displayName.message}
          </p>
        )}
      </div>

      {/* Email */}
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
            placeholder="Email"
            {...register("email")}
            className={cn(
              "h-11 w-full rounded-[4px] border border-[color:var(--secondary)] pl-10 pr-3 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-font-inter font-[500] text-[16px] leading-[19px]"
            )}
          />
        </div>
        {errors.email && (
          <p className="text-[var(--destructive)] text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-[color:var(--secondary-foreground)] font-medium text-[16px] leading-[19px]"
        >
          Create Password
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
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            {...register("password")}
            className={cn(
              "h-11 w-full rounded-[4px] border  border-[color:var(--secondary)] pl-10 pr-10 py-2 text-[color:var(--muted-foreground)] placeholder:text-[color:var(--muted-foreground)] font-[500] text-[16px] leading-[19px]"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer"
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="passwordConfirm"
          className="text-[color:var(--secondary-foreground)] font-medium text-[16px] leading-[19px]"
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
            id="passwordConfirm"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-Enter Password"
            {...register("passwordConfirm")}
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
              alt={showConfirmPassword ? "Hide Password" : "Show Password"}
              width={20}
              height={15}
            />
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className="text-[var(--destructive)] text-sm">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* Messages from mutation */}
      {mutation.isError && (
        <p className="text-[var(--destructive)] text-sm">
          {handleApiError(mutation.error).message ||
            "Failed to register. Try again."}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="text-[var(--success)] text-sm">
          Registration successful! A verification email has been sent. Please
          check your inbox.
        </p>
      )}

      {/* Already have account */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-secondary font-normal text-[16px] leading-[20px] text-[var(--muted-foreground)]">
          Already have an account?
        </span>
        <Link
          href="/login"
          className="font-secondary font-bold text-[16px] leading-[20px] text-[color:var(--text-default-2)] hover:underline"
        >
          Log in
        </Link>
      </div>

      {/* Register Button */}
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="h-11 rounded-[8px] mt-1 bg-foreground px-6 py-3 flex items-center justify-center text-center font-medium text-[18px] leading-[24px] text-background hover:bg-foreground/90 transition-colors duration-200"
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
