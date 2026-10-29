import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";
import PriceTicker from "@/components/ticker/PriceTicker";

export const metadata = { title: "সাইন আপ — বাজার দর" };

export default function SignUpPage() {
  return (
    <>
      <PriceTicker />
      <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
        <SignUpForm />
      </AuthShell>
    </>
  );
}


