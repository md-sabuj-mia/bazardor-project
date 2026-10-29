import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession(path) {
  let currentPath = path;
  if (!currentPath) {
    const headersList = await headers();
    const referer = headersList.get("referer");
    if (referer) {
      try {
        const url = new URL(referer);
        currentPath = url.pathname + url.search;
      } catch {
        currentPath = "/";
      }
    } else {
      currentPath = "/";
    }
  }

  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(currentPath)}&reason=protected`);
  }
  return session;
}