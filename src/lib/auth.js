// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { Resend } from 'resend';

// const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI);
// const db = client.db("better-auth");
// const resend = new Resend(process.env.RESEND_API_KEY);
// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client,
//   }),
//   emailAndPassword: { 
//   enabled: true, 
//   requireEmailVerification: false, // এটি false করে টেস্ট করুন
// },

//   socialProviders: {
//         google: { 
//             clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
//             clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
//         }, 
//         github: { 
//             clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
//             clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
//         },
//     },
//     emailVerification: {
//     sendVerificationEmail: async ( { user, url, token }, request) => {
//       void resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: user.email,
//       subject: 'Verify your email',
//       html: `<p>Click the link to verify your email: ${url}</p>`
//     });
//     },
//     sendOnSignUp:true,
//     autoSignInAfterVerification: true,
//     expiresIn:60*5,
//   },
// });


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// যদি Resend ব্যবহার না করেন, তবে Resend আমদানির প্রয়োজন নেই
// import { Resend } from 'resend';

// MongoDB URI-র নাম ঠিক রাখা হয়েছে (.env.local ফাইলে যেন MONGODB_URI থাকে)
const client = new MongoClient(process.env.MONGODB_URI || process.env.BETTER_AUTH_MONGODB_URI);
const db = client.db("better-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: false, 
  },
  socialProviders: {
    google: { 
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
    }, 
    github: { 
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
    },
  },
  // ইমেইল ভেরিফিকেশন ফিচারের কোডটি আপাতত বাদ দেওয়া হলো, 
  // কারণ Resend API Key ছাড়া এটি সার্ভারে এরর তৈরি করছিল।
});