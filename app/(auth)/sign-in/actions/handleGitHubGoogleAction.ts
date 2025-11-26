"use server";

import { signIn } from "@/auth";

export async function handleGitHubGoogleAction(way: string) {
  await signIn(way);
}
