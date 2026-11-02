
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

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
      allowDangerousEmailAccountLinking: true, 
    }, 
    github: { 
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
      allowDangerousEmailAccountLinking: true,
    },
  },
  // Account linking safe korar jonno global config
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});