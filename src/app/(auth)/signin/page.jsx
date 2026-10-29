import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import PriceTicker from "@/components/ticker/PriceTicker";
import Footer from "@/components/Footer"; // ফুটার কম্পোনেন্ট ইমপোর্ট করা হলো

export const metadata = { title: "সাইন ইন — বাজার দর" };

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      {[0, 1].map((i) => (
        <div key={i} className="space-y-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-10 w-full" />
        </div>
      ))}
      <div className="skeleton h-10 w-full" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="space-y-6 flex-1">
        {/* মুভেবল প্রাইস টেকার বার */}
        <PriceTicker />

        {/* মূল সাইন ইন পেজের কন্টেন্ট */}
        <div className="mx-auto max-w-4xl px-4 py-4">
          <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
            {/* useSearchParams (for ?redirect=) needs a Suspense boundary */}
            <Suspense fallback={<FormSkeleton />}>
              <SignInForm />
            </Suspense>
          </AuthShell>
        </div>
      </div>

      {/* ফুটার কম্পোনেন্ট যুক্ত করা হলো */}
      <Footer />
    </div>
  );
}