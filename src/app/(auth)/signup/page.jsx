import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";
import PriceTicker from "@/components/ticker/PriceTicker";
import Footer from "@/components/Footer";

export const metadata = { title: "সাইন আপ — বাজার দর" };

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-1">
          <div className="skeleton h-4 w-20 bg-base-200" />
          <div className="skeleton h-12 w-full bg-base-200 rounded-xl" />
        </div>
      ))}
      <div className="skeleton h-12 w-full bg-base-200 rounded-xl mt-2" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-base-100">
      <div className="space-y-6 flex-1 pb-10">
        {/* প্রাইস টেকার বার */}
        <PriceTicker />

        {/* মূল সাইন আপ পেজ */}
        <main className="mx-auto max-w-md w-full px-4 py-4">
          <AuthShell 
            title="অ্যাকাউন্ট তৈরি করুন" 
            subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          >
            <Suspense fallback={<FormSkeleton />}>
              <SignUpForm />
            </Suspense>
          </AuthShell>
        </main>
      </div>

      {/* ফুটার */}
      <Footer />
    </div>
  );
}
