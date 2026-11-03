

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const next = {};
    if (!email) next.email = "ইমেইল লিখুন।";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
    if (!password) next.password = "পাসওয়ার্ড লিখুন।";
    
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(Object.values(next)[0], { position: "top-center" });
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error), { position: "top-center" });
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে!", { position: "top-center" });
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="current-password" placeholder="••••••••" error={errors.password} />

      <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-xl font-semibold mt-2">
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>

      <div className="divider text-xs text-base-content/50 my-1">অথবা</div>

      <SocialButtons callbackURL={callbackUrl} />

      <p className="text-center text-sm mt-2">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="link link-primary link-hover font-medium">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}