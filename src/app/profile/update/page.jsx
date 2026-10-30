import { Suspense } from "react";
import { requireSession } from "@/lib/session";
import UpdateNameForm from "@/components/profile/UpdateNameForm";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "প্রোফাইল আপডেট — বাজার দর" };

// ভেতরের মেইন কন্টেন্ট লোড করার জন্য আলাদা অ্যাসিন্ড কম্পোনেন্ট
async function ProfileUpdateContent() {
  const session = await requireSession("/profile/update");
  const user = session?.user;

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <UpdateNameForm currentName={user?.name} />
    </div>
  );
}

export default function ProfileUpdatePage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8 flex-1 w-full">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">প্রোফাইল তথ্য আপডেট</h1>
          <p className="text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
        </header>

        {/* Next.js এর সাজেস্ট করা 'Stream' পদ্ধতি: Suspense দিয়ে কুকি/সেশন কল র‍্যাপ করা হলো */}
        <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-2xl bg-base-200" />}>
          <ProfileUpdateContent />
        </Suspense>

        <div>
          <Link href="/profile" className="btn btn-ghost btn-sm">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}