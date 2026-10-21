// "use client";
// import React from 'react';
// import {
//     Button,
//     Description,
//     FieldError,
//     FieldGroup,
//     Fieldset,
//     Form,
//     Input,
//     Label,
//     TextArea,
//     TextField,
// } from "@heroui/react";
// import { signUp} from '../../../lib/auth-client';



// const SignUpPage = () => {
//     const onSubmit = async(e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const data = {};
//         // Convert FormData to plain object
//         formData.forEach((value, key) => {
//             data[key] = value.toString();
//         });
// const { data:signupData, error } = await signUp.email({
//     name:data.name,
//     email: data.email,
//     password: data.password,
//     callbackURL: "/",
// });

//    console.log(signupData,error);
//     };
//     return (
//         <div className="flex justify-center">
//             <Form className="w-full max-w-96" onSubmit={onSubmit}>
//                 <Fieldset>
//                     <Fieldset.Legend>Profile Settings</Fieldset.Legend>
//                     <Description>Update your profile information.</Description>
//                     <FieldGroup>
//                         <TextField
//                             isRequired
//                             name="name"
//                             validate={(value) => {
//                                 if (value.length < 3) {
//                                     return "Name must be at least 3 characters";
//                                 }
//                                 return null;
//                             }}
//                         >
//                             <Label>Name</Label>
//                             <Input placeholder="John Doe" />
//                             <FieldError />
//                         </TextField>
//                         <TextField isRequired name="email" type="email">
//                             <Label>Email</Label>
//                             <Input placeholder="john@example.com" />
//                             <FieldError />
//                         </TextField>
//                         <TextField
//                             isRequired
//                             minLength={8}
//                             name="password"
//                             type="password"
//                             validate={(value) => {
//                                 if (value.length < 8) {
//                                     return "Password must be at least 8 characters";
//                                 }
//                                 if (!/[A-Z]/.test(value)) {
//                                     return "Password must contain at least one uppercase letter";
//                                 }
//                                 if (!/[0-9]/.test(value)) {
//                                     return "Password must contain at least one number";
//                                 }
//                                 return null;
//                             }}
//                         >
//                             <Label>Password</Label>
//                             <Input placeholder="Enter your password" />
//                             <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
//                             <FieldError />
//                         </TextField>
//                     </FieldGroup>
//                     <Fieldset.Actions>
//                         <Button type="submit">

//                             Save changes
//                         </Button>
//                         <Button type="reset" variant="secondary">
//                             Cancel
//                         </Button>
//                     </Fieldset.Actions>
//                 </Fieldset>
//             </Form>
//         </div>
//     );
// };

// export default SignUpPage;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth-client";

const PRODUCTS_API = "https://openapi.programming-hero.com/api/bazardor/products";
const CATEGORIES_API = "https://openapi.programming-hero.com/api/bazardor/categories";

const toBengaliNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "০";
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

export default function SignUpPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [prodRes, catRes] = await Promise.all([
                    fetch(PRODUCTS_API),
                    fetch(CATEGORIES_API),
                ]);

                const prodData = await prodRes.json();
                const catData = await catRes.json();

                setProducts(prodData?.data || []);
                setCategories(catData?.data || []);
            } catch (err) {
                console.error("API Fetch Error:", err);
                toast.error("ডাটা লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        const { data, error } = await signUp.email({ name, email, password, callbackURL: "/" });
        setAuthLoading(false);

        if (error) {
            toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে!");
        } else {
            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            router.push("/sign-in");
        }
    };

    const handleSocialSignIn = async (provider) => {
        setSocialLoading(true);
        try {
            await signIn.social({ provider, callbackURL: "/" });
        } catch (err) {
            toast.error(`${provider} দিয়ে সাইন আপ সম্ভব হয়নি`);
            setSocialLoading(false);
        }
    };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((p) => {
            const cat = p.category || p.category_name || p.category_slug || "";
            return cat.toLowerCase() === selectedCategory.toLowerCase();
        });

    const topRisers = [...products].filter((p) => (p.change_percentage || p.change || 0) > 0).slice(0, 6);
    const topFallers = [...products].filter((p) => (p.change_percentage || p.change || 0) < 0).slice(0, 6);

    return (
        <div className="min-h-screen bg-[#f4f7f4] font-sans text-gray-800">
            {/* 1. Product Category Bar (Under Navbar) */}
            <div className="border-b border-gray-200 bg-white py-3 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 text-xs font-bold text-gray-700 whitespace-nowrap scrollbar-none">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`flex items-center gap-1.5 pb-1 transition ${
                            selectedCategory === "all" ? "text-emerald-700 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"
                        }`}
                    >
                        <span>🛒</span> সব পণ্য
                    </button>
                    {categories.map((cat, idx) => {
                        const catName = cat.name || cat.title || "ক্যাটাগরি";
                        const catSlug = cat.slug || cat.id || catName;
                        return (
                            <button
                                key={cat.id || idx}
                                onClick={() => setSelectedCategory(catSlug)}
                                className={`flex items-center gap-1.5 pb-1 transition ${
                                    selectedCategory === catSlug ? "text-emerald-700 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"
                                }`}
                            >
                                <span>{cat.emoji || "📦"}</span> {catName}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Moveable Nav / Price Ticker Marquee */}
            <div className="overflow-hidden bg-white py-2.5 border-b border-gray-200 shadow-inner">
                <div className="inline-flex whitespace-nowrap animate-marquee gap-8 text-xs font-semibold text-gray-700">
                    {products.map((item, index) => {
                        const priceVal = item.price || item.current_price || 0;
                        const changeVal = item.change_percentage || 0;
                        const isUp = changeVal > 0;
                        const isDown = changeVal < 0;
                        return (
                            <span key={index} className="inline-flex items-center gap-1.5">
                                <span>{item.emoji || "📦"}</span>
                                <span>{item.name}:</span>
                                <span>{toBengaliNumber(priceVal)} টাকা/{item.unit || "কেজি"}</span>
                                <span className={isUp ? "text-emerald-600" : isDown ? "text-rose-600" : "text-gray-500"}>
                                    {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliNumber(Math.abs(changeVal))}%
                                </span>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* 3. Hero Banner Section */}
            <section className="mx-auto my-6 max-w-7xl px-4">
                <div className="flex flex-col-reverse items-center justify-between rounded-2xl bg-white p-6 md:p-10 shadow-sm md:flex-row border border-gray-100">
                    <div className="mt-6 md:mt-0 md:max-w-xl">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            আজকের বাজার দর
                        </span>
                        <h2 className="mt-3 text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            নিত্যপ্রয়োজনীয় জিনিসপত্রের নাম এবং দাম জানুন
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            প্রতিদিনের প্রয়োজনীয় পণ্যের সঠিক ও আপডেট বাজার দর এক নজরে পরখ করুন।
                        </p>
                    </div>
                    <div className="flex items-center justify-center text-7xl md:text-9xl">
                        🧺
                    </div>
                </div>
            </section>

            {/* 4. Product Grid Sections */}
            <main className="mx-auto max-w-7xl px-4 py-4 space-y-10">
                {topRisers.length > 0 && (
                    <section>
                        <h3 className="mb-4 text-lg font-bold text-emerald-700">আজ দাম বেড়েছে ▲</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {topRisers.map((item, idx) => (
                                <ProductCard key={idx} item={item} />
                            ))}
                        </div>
                    </section>
                )}

                {topFallers.length > 0 && (
                    <section>
                        <h3 className="mb-4 text-lg font-bold text-rose-700">আজ দাম কমেছে ▼</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {topFallers.map((item, idx) => (
                                <ProductCard key={idx} item={item} />
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">সব পণ্য</h3>
                        <span className="text-xs text-gray-500">মোট {toBengaliNumber(filteredProducts.length)} টি পণ্য</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {filteredProducts.map((item, idx) => (
                            <ProductCard key={item.id || idx} item={item} />
                        ))}
                    </div>
                </section>
            </main>

            {/* 5. Sign Up Form Section at Bottom */}
            <section className="mt-16 bg-emerald-50/60 py-12 border-t border-gray-200">
                <div className="mx-auto max-w-md px-4">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
                        <p className="mt-1 text-xs text-gray-600">বাজার দর ব্যবহারের জন্য রেজিস্ট্রেশন সম্পূর্ণ করুন</p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-700">নাম</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="আপনার নাম লিখুন"
                                    required
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-700">ইমেইল</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-700">পাসওয়ার্ড</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="কমপক্ষে ৮ অক্ষর"
                                        required
                                        minLength={8}
                                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 pr-10 text-xs outline-none focus:border-emerald-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={authLoading}
                                className="mt-2 w-full rounded-xl bg-[#008a45] py-2.5 text-xs font-bold text-white shadow hover:bg-[#007339] transition"
                            >
                                {authLoading ? "সাইন আপ হচ্ছে..." : "সাইন আপ করুন"}
                            </button>
                        </form>

                        <div className="relative my-5 flex items-center justify-center">
                            <div className="w-full border-t border-gray-200"></div>
                            <span className="absolute bg-white px-3 text-[10px] text-gray-500">অথবা</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                disabled={socialLoading}
                                onClick={() => handleSocialSignIn("google")}
                                className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 px-2 text-[11px] font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                🌐 Google
                            </button>
                            <button
                                type="button"
                                disabled={socialLoading}
                                onClick={() => handleSocialSignIn("github")}
                                className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 px-2 text-[11px] font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                🐙 GitHub
                            </button>
                        </div>

                        <p className="mt-5 text-center text-[11px] text-gray-600">
                            ইতিমধ্যে একাউন্ট আছে?{" "}
                            <Link href="/sign-in" className="font-bold text-[#008a45] hover:underline">
                                সাইন ইন করুন
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ProductCard({ item }) {
    const priceVal = item.price || item.current_price || 0;
    const changeVal = item.change_percentage || 0;
    const isUp = changeVal > 0;
    const isDown = changeVal < 0;

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition">
            <div className="text-3xl text-center mb-1">{item.emoji || "📦"}</div>
            <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
            <p className="text-[10px] text-gray-500">{item.unit || "কেজি"}</p>
            <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="font-bold text-gray-900">{toBengaliNumber(priceVal)} টাকা</span>
                <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${isUp ? "bg-emerald-50 text-emerald-600" : isDown ? "bg-rose-50 text-rose-600" : "bg-gray-100 text-gray-500"}`}>
                    {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliNumber(Math.abs(changeVal))}%
                </span>
            </div>
        </div>
    );
}