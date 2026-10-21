// 'use client';
// import { useState } from "react";
// import { Link, Button } from "@heroui/react";
// import { authClient } from "../lib/auth-client";
// import { useRouter } from "next/navigation";


// export default function Nasbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const router = useRouter()
//   const { data: session } = authClient.useSession()

// const handleLogout = async () => {
//   await authClient.signOut({
//   fetchOptions: {
//     onSuccess: () => {
//       router.push("/sign-in"); 
//     },
//   },
// });
// };



// console.log(session);
//   return (
//     <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
//       <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//             aria-expanded={isMenuOpen}
//           >
//             <span className="sr-only">Menu</span>
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//           <div className="flex items-center gap-3">
      
//             <p className="font-bold">Home</p>
//           </div>
//         </div>
//         <ul className="hidden items-center gap-4 md:flex">
//           {
//             session?.user&&<li>
//             <Link href="/feature">Features</Link>
//           </li>
//           }
//           {
//             session?.user&&<li>
//             <Link href="/dashboard" className="font-medium text-accent" aria-current="page">
//               Dashboard
//             </Link>
//           </li>
//           }
//           {
//             session?.user && <li>
//             <Link href="/profile">Profile</Link>
//           </li>
//           }
//         </ul>
//         <div className="hidden items-center gap-4 md:flex">
//         {
//             session?.user?
//             <><Button onClick={handleLogout}>Sign Out</Button></>
//             :<>  <Link href="/sign-in">Login</Link>
//                  <Link href="/sign-up"><Button>Sign Up</Button></Link>
//              </>
//         }
//         </div>
//       </header>
//       {isMenuOpen && (
//         <div className="border-t border-separator md:hidden">
//           <ul className="flex flex-col gap-2 p-4">
//             <li>
//               <Link href="#" className="block py-2">
//                 Features
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2 font-medium text-accent">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2">
//                 Pricing
//               </Link>
//             </li>
//             <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
//               <Link href="/sign-in" className="block py-2">
//                 Login
//               </Link>
//               <Link href="/sign-up" className="block py-2"><Button>Sign Up</Button></Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }
import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";
import CategoryLinks from "./CategoryLinks";
import CategoryNav from "./CategoryNav";

export default async function Navbar() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    // API unavailable — show the navbar without category links
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর — হোম">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg">
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
            <BanglaDate className="text-[11px] sm:text-xs" />
          </span>
        </Link>

        <AuthButtons />
      </div>

      {/* usePathname() needs a Suspense boundary in Next 16; the fallback is the
          same chip row without the active highlight */}
      <Suspense fallback={<CategoryLinks categories={categories} activeHref={null} />}>
        <CategoryNav categories={categories} />
      </Suspense>
    </header>
  );
}