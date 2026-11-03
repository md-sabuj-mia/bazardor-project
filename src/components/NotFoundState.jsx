


// src/components/NotFoundState.jsx
import Link from "next/link";

export default function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">পাতাটি পাওয়া যায়নি</h2>
      <p className="text-xs sm:text-sm text-base-content/70 mb-6">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা মনে হচ্ছে বিদ্যমান নেই।
      </p>
      <Link href="/" className="btn btn-primary btn-sm sm:btn-md rounded-lg font-semibold shadow-sm">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}