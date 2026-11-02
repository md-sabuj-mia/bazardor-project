"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Custom message state
  const [message, setMessage] = useState({ text: "", type: "" });

  // Email & Password diye sign up handle korar jonno
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setMessage({ 
          text: error.message || "সাইন আপ করতে সমস্যা হয়েছে!", 
          type: "error" 
        });
        setLoading(false);
      } else {
        setMessage({ 
          text: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", 
          type: "success" 
        });
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      }
    } catch (err) {
      setMessage({ 
        text: "কোথাও কোনো প্রযুক্তিগত সমস্যা হয়েছে!", 
        type: "error" 
      });
      setLoading(false);
    }
  };

  // Google diye sign up / sign in handle korar jonno
  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setMessage({ 
        text: "গুগল লগইন করার সময় একটি ত্রুটি ঘটেছে!", 
        type: "error" 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success ba Error Message Box */}
      {message.text && (
        <div
          className={`p-3 rounded-md text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium mb-1">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ইমেইল</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50"
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
      </button>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
      >
        গুগল দিয়ে সাইন আপ করুন
      </button>
    </form>
  );
}