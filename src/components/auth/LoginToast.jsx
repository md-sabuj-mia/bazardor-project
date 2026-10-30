"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginToast() {
  useEffect(() => {
    // চেক করা যাক ইউজার মাত্র লগইন করেছে কিনা
    const hasLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (hasLoggedIn) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!", { position: "top-center" });
      sessionStorage.removeItem("justLoggedIn"); // যেন বারবার রিলোড দিলে নোটিফিকেশন না আসে
    }
  }, []);

  return null;
}