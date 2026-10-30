"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"; // Sonner ব্যবহার করা হলো যাতে লেআউটের সাথে পারফেক্ট ম্যাচ হয়
import { signIn } from "@/lib/auth-client";
import { authErrorMessage, safeRedirect } from "@/lib/auth-errors";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const fromProtected = searchParams.get("reason") === "protected";

  // Toast when the user was bounced here from a protected page (README requirement)
  const toasted = useRef(false);
  useEffect(() => {
    if (fromProtected && !toasted.current) {
      toasted.current = true;
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।");
    }
  }, [fromProtected]);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const next = {};
    if (!email) next.email = "ইমেইল লিখুন।";
    if (!password) next.password = "পাসওয়ার্ড লিখুন।";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("অনুগ্রহ করে সব ঘর পূরণ করুন।");
      return;
    }

    setLoading(true);

    try {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            setLoading(false);
            
            // ইনস্ট্যান্ট সাকসেস নোটিফিকেশন (গ্রিন বার বা রিলোড ডিলে ছাড়াই)
            toast.success("সফলভাবে সাইন ইন হয়েছে!");

            // ইনস্ট্যান্ট ক্লায়েন্ট রাউটার পুশ, কোনো ল্যাগ বা এক্সট্রা ওয়েটিং টাইম নেই
            router.push(redirectTo || "/");
            router.refresh();
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(authErrorMessage(ctx.error) || "সাইন ইন করতে সমস্যা হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।");
          },
        }
      );

    } catch (err) {
      setLoading(false);
      console.error("Sign in error:", err);
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="current-password" placeholder="আপনার পাসওয়ার্ড" error={errors.password} />

      <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>

      <SocialButtons callbackURL={redirectTo} />

      <p className="text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="link link-primary link-hover">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}