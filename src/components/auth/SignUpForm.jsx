// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { signOut, signUp } from "@/lib/auth-client";
// import { authErrorMessage } from "@/lib/auth-errors";
// import FormField from "./FormField";
// import SocialButtons from "./SocialButtons";

// export default function SignUpForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   async function onSubmit(e) {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     const name = String(form.get("name") ?? "").trim();
//     const email = String(form.get("email") ?? "").trim();
//     const password = String(form.get("password") ?? "");
//     const confirm = String(form.get("confirm") ?? "");

//     const next = {};
//     if (!name) next.name = "নাম লিখুন।";
//     if (!email) next.email = "ইমেইল লিখুন।";
//     else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
//     if (password.length < 8) next.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
//     if (confirm !== password) next.confirm = "দুটি পাসওয়ার্ড মেলেনি।";
//     setErrors(next);
//     if (Object.keys(next).length) {
//       toast.error(Object.values(next)[0], {
//         position: "top-center",
//       });
//       return;
//     }

//     setLoading(true);
//     const { error } = await signUp.email({ name, email, password });
//     setLoading(false);

//     if (error) {
//       toast.error(authErrorMessage(error), {
//         position: "top-center",
//       });
//       return;
//     }
    
//     // সফলভাবে সাইন আপ হওয়ার পর টোস্ট নোটিফিকেশন
//     await signOut();
//     toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন সাইন ইন করুন।", {
//       position: "top-center",
//     });
//     router.push("/signin");
//     router.refresh();
//   }

//   return (
//     <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
//       <FormField label="নাম" name="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" error={errors.name} />
//       <FormField label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
//       <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" error={errors.password} />
//       <FormField label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" error={errors.confirm} />

//       <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
//         {loading && <span className="loading loading-spinner loading-sm" />}
//         অ্যাকাউন্ট তৈরি করুন
//       </button>

//       <SocialButtons callbackURL="/" />

//       <p className="text-center text-sm">
//         অ্যাকাউন্ট আছে?{" "}
//         <Link href="/signin" className="link link-primary link-hover">
//           সাইন ইন করুন
//         </Link>
//       </p>
//     </form>
//   );
// }

// "use client";

// import { useState } from "react";
// import { signUp, signIn } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export default function SignUpForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   // Custom message state
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // Email & Password diye sign up handle korar jonno
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const { data, error } = await signUp.email({
//         email,
//         password,
//         name,
//       });

//       if (error) {
//         setMessage({ 
//           text: error.message || "সাইন আপ করতে সমস্যা হয়েছে!", 
//           type: "error" 
//         });
//         setLoading(false);
//       } else {
//         setMessage({ 
//           text: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", 
//           type: "success" 
//         });
//         setTimeout(() => {
//           router.push("/");
//           router.refresh();
//         }, 1200);
//       }
//     } catch (err) {
//       setMessage({ 
//         text: "কোথাও কোনো প্রযুক্তিগত সমস্যা হয়েছে!", 
//         type: "error" 
//       });
//       setLoading(false);
//     }
//   };

//   // Google diye sign up / sign in handle korar jonno
//   const handleGoogleSignUp = async () => {
//     try {
//       await signIn.social({
//         provider: "google",
//         callbackURL: "/",
//       });
//     } catch (err) {
//       setMessage({ 
//         text: "গুগল লগইন করার সময় একটি ত্রুটি ঘটেছে!", 
//         type: "error" 
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Success ba Error Message Box */}
//       {message.text && (
//         <div
//           className={`p-3 rounded-md text-sm font-medium ${
//             message.type === "success"
//               ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
//               : "bg-red-100 text-red-800 border border-red-300"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       {/* Name Input */}
//       <div>
//         <label className="block text-sm font-medium mb-1">নাম</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           autoComplete="name"
//           required
//           className="w-full px-3 py-2 border rounded-md"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">ইমেইল</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoComplete="off"
//           required
//           className="w-full px-3 py-2 border rounded-md"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="new-password"
//           required
//           className="w-full px-3 py-2 border rounded-md"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50"
//       >
//         {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
//       </button>

//       <button
//         type="button"
//         onClick={handleGoogleSignUp}
//         className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
//       >
//         গুগল দিয়ে সাইন আপ করুন
//       </button>
//     </form>
//   );
// }


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut, signUp } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const next = {};
    if (!name) next.name = "নাম লিখুন।";
    
    if (!email) {
      next.email = "ইমেইল লিখুন।";
    } else if (/[A-Z]/.test(email)) {
      next.email = "ইমেইলে কোনো বড় হাতের অক্ষর থাকতে পারবে না।";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
    }

    if (password.length < 8) next.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    if (confirm !== password) next.confirm = "দুটি পাসওয়ার্ড মেলেনি।";
    
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(Object.values(next)[0], {
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error), {
        position: "top-center",
      });
      return;
    }
    
    // সফলভাবে সাইন আপ হওয়ার পর টোস্ট নোটিফিকেশন
    await signOut();
    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", {
      position: "top-center",
    });
    router.push("/signin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="নাম" name="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" error={errors.name} />
      <FormField label="ইমেইল" name="email" type="text" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" error={errors.password} />
      <FormField label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" error={errors.confirm} />

      <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <SocialButtons callbackURL="/" />

      <p className="text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="link link-primary link-hover">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}