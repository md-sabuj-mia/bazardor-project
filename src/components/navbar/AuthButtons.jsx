

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UserAvatar from "@/components/UserAvatar";
import { signOut, useSession } from "@/lib/auth-client";

function closeDropdown() {
  document.activeElement?.blur();
}

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="skeleton h-9 w-24 sm:h-10 sm:w-28 rounded-lg" aria-label="লোড হচ্ছে" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md rounded-lg font-semibold px-2 sm:px-4">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md rounded-lg font-semibold px-2 sm:px-4">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  const firstName = user.name?.split(" ")[0] || "প্রোফাইল";

  const handleSignOut = async () => {
    closeDropdown();
    await signOut();
    toast.success("সাইন আউট সম্পন্ন হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm sm:btn-md gap-1.5 sm:gap-2 rounded-lg px-1 sm:px-2"
        aria-label="ব্যবহারকারী মেনু"
      >
        <UserAvatar name={user.name} image={user.image} size={32} className="rounded-[10.5px] sm:size-9" />
        <span className="hidden max-w-24 truncate text-xs sm:text-sm font-medium sm:inline">{firstName}</span>
        <span aria-hidden className="text-xs">▾</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-56 sm:w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title px-3 py-2 text-base-content">
          <span className="block truncate text-sm font-normal">{user.name}</span>
          <span className="block truncate text-xs font-normal opacity-70">{user.email}</span>
        </li>
        <li>
          <Link href="/profile" onClick={closeDropdown} className="rounded-lg text-sm">
            👤 আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="rounded-lg text-sm text-error">
            ↩ সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}