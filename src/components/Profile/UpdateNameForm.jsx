"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import FormField from "@/components/auth/FormField";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export default function UpdateNameForm({ currentName }) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("নাম খালি রাখা যাবে না।");
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন হয়নি।");
      return;
    }
    setError(undefined);
    setLoading(true);

    try {
      const res = await authClient.updateUser({
        name: trimmed,
      });

      setLoading(false);

      if (res?.error) {
        toast.error(authErrorMessage(res.error) || "নাম আপডেট করতে সমস্যা হয়েছে।");
        return;
      }

      // ১. সফল নোটিফিকেশনটি স্ক্রিনে পপ-আপ করবে
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");

      // ২. ব্রাউজার লেভেলে সামান্য সময় নিয়ে রিডাইরেক্ট হবে, যাতে নোটিফিকেশন মিস না হয়
      setTimeout(() => {
        window.location.assign("/profile");
      }, 700);

    } catch (err) {
      setLoading(false);
      console.error("Update error:", err);
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="আপনার পূর্ণ নাম"
        error={error}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md rounded-lg sm:flex-1">
          বাতিল
        </Link>
        <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md rounded-lg font-semibold sm:flex-[2]">
          {loading && <span className="loading loading-spinner loading-sm" />}
          তথ্য আপডেট করুন
        </button>
      </div>
    </form>
  );
}