"use server";

import { signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signoutUserAction() {
  try {
    await signOut({ redirect: false }); // specify redirect: false to ensure nextauth doesnt handle redirect
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    console.log(err);
  }
}
