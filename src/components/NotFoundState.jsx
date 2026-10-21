// src/components/NotFoundState.jsx
import Link from "next/link";

export default function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold mb-2">পাতাটি পাওয়া যায়নি</h2>
      <p className="text-gray-600 mb-6">আপনি যে পৃষ্ঠাটি খুঁজছেন তা মনে হচ্ছে বিদ্যমান নেই।</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}