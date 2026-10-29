import { requireSession } from "@/lib/session";
import UpdateNameForm from "@/components/profile/UpdateNameForm";
import Footer from "@/components/Footer"; // Footer import korun
import Link from "next/link";

export const metadata = { title: "প্রোফাইল আপডেট — বাজার দর" };

export default async function ProfileUpdatePage() {
  const session = await requireSession("/profile/update");
  const user = session?.user;

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8 flex-1 w-full">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">প্রোফাইল তথ্য আপডেট</h1>
          <p className="text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
        </header>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <UpdateNameForm currentName={user?.name} />
        </div>

        <div>
          <Link href="/profile" className="btn btn-ghost btn-sm">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>

      {/* Footer component add kora holo */}
      <Footer />
    </div>
  );
}