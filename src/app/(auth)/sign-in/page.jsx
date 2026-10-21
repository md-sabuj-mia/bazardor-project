// "use client";
// import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
// import { signIn } from '../../../lib/auth-client';
// import React from 'react';

// const signInPage = () => {
//     const onSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const data = {};
//         // Convert FormData to plain object
//         formData.forEach((value, key) => {
//             data[key] = value.toString();
//         });
//         const { data: signinData, error } = await signIn.email({
//             email: data.email,
//             password: data.password,
//             rememberMe: true,
//             callbackURL: "/",

//         });
//         console.log(signinData, error);
//     };
//       const signInIn = async () => {
//        const data = await signIn.social({
//        provider: "google",
//        callbackURL: "/",
//      });
//      };
//     return (
//         <div className="flex justify-center">
//             <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//                 <TextField
//                     isRequired
//                     name="email"
//                     type="email"
//                     validate={(value) => {
//                         if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                             return "Please enter a valid email address";
//                         }
//                         return null;
//                     }}
//                 >
//                     <Label>Email</Label>
//                     <Input placeholder="john@example.com" />
//                     <FieldError />
//                 </TextField>
//                 <TextField
//                     isRequired
//                     minLength={8}
//                     name="password"
//                     type="password"
//                     validate={(value) => {
//                         if (value.length < 8) {
//                             return "Password must be at least 8 characters";
//                         }
//                         if (!/[A-Z]/.test(value)) {
//                             return "Password must contain at least one uppercase letter";
//                         }
//                         if (!/[0-9]/.test(value)) {
//                             return "Password must contain at least one number";
//                         }
//                         return null;
//                     }}
//                 >
//                     <Label>Password</Label>
//                     <Input placeholder="Enter your password" />
//                     <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
//                     <FieldError />
//                 </TextField>
//                 <div className="flex gap-2">
//                     <Button type="submit">

//                         Submit
//                     </Button>
//                     <Button type="reset" variant="secondary">
//                         Reset
//                     </Button>
//                 </div>
//                 <Button onClick={signInIn}>Sign in with Google</Button>
//             </Form>
//         </div>
//     );
// };

// export default signInPage;


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);

    const validateEmail = (val) => {
        setEmail(val);
        if (val && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
            setEmailError("সঠিক ইমেইল প্রবেশ করুন।");
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || !email || !password) {
            toast.error("অনুগগ্রহ করে সঠিক তথ্য দিন");
            return;
        }

        setLoading(true);
        const { data, error } = await signIn.email({
            email,
            password,
            rememberMe: true,
            callbackURL: "/",
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে!");
        } else {
            toast.success("সফলভাবে সাইন ইন হয়েছে!");
            router.push("/");
        }
    };

    const handleSocialSignIn = async (provider) => {
        setSocialLoading(true);
        try {
            await signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (err) {
            toast.error(`${provider} দিয়ে সাইন ইন করা সম্ভব হয়নি`);
            setSocialLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f5f1] px-4 py-8 font-sans">
            {/* Header Section */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-[#222222]">সাইন ইন</h1>
                <p className="mt-2 text-sm text-[#666666]">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে একাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Card Container */}
            <div className="w-full max-w-[420px] rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#222222]">ইমেইল</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 ${
                                emailError
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-emerald-600"
                            }`}
                        />
                        {emailError && (
                            <span className="text-xs text-red-600">{emailError}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-[#222222]">পাসওয়ার্ড</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                required
                                minLength={8}
                                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-emerald-600 placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    /* Eye Off Icon */
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.52 10.52 0 01-4.293 5.774M6.228 6.228L17.772 17.772M9.88 9.88a3 3 0 104.243 4.243" />
                                    </svg>
                                ) : (
                                    /* Eye Icon */
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-[#008a45] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007339] active:scale-[0.99] disabled:opacity-70"
                    >
                        {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="absolute bg-white px-3 text-xs text-gray-500">অথবা</span>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        disabled={socialLoading}
                        onClick={() => handleSocialSignIn("google")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                    >
                        {/* Google Icon */}
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>

                    <button
                        type="button"
                        disabled={socialLoading}
                        onClick={() => handleSocialSignIn("github")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                    >
                        {/* GitHub Icon */}
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                {/* Footer Register Link */}
                <p className="mt-6 text-center text-xs text-gray-600">
                    একাউন্ট নেই?{" "}
                    <Link href="/sign-up" className="font-semibold text-[#008a45] hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6">
                <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">
                    -- হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}