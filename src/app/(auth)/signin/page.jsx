import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import PriceTicker from "@/components/ticker/PriceTicker";
import Footer from "@/components/Footer";

export const metadata = { title: "সাইন ইন — বাজার দর" };

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full" aria-hidden>
      <div className="space-y-1">
        <div className="skeleton h-4 w-16 bg-base-200" />
        <div className="skeleton h-12 w-full bg-base-200 rounded-xl" />
      </div>
      <div className="space-y-1">
        <div className="skeleton h-4 w-20 bg-base-200" />
        <div className="skeleton h-12 w-full bg-base-200 rounded-xl" />
      </div>
      <div className="skeleton h-12 w-full bg-base-200 rounded-xl mt-2" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-base-100">
      <div className="space-y-6 flex-1 pb-10">
        {/* প্রাইস টেকার বার */}
        <PriceTicker />

        {/* মূল সাইন ইন পেজ */}
        <main className="mx-auto max-w-md w-full px-4 py-4">
          <AuthShell 
            title="সাইন ইন" 
            subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
          >
            <Suspense fallback={<FormSkeleton />}>
              <SignInForm />
            </Suspense>
          </AuthShell>
        </main>
      </div>

      {/* ফুটার */}
      <Footer />
    </div>
  );
}