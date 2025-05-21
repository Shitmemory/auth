"use server";

import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { USER_ROLES } from "@/lib/constants";
import { findUserByEmail } from "@/resources/user-queries";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Res = any | null;

// Admin Panel Action
export async function toggleEmailVerifiedAction(
  email: (typeof users.$inferSelect)["email"],
  isCurrentlyVerified: boolean
): Promise<Res> {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error("Unauthorised");
  }

  const existingUser = await findUserByEmail(email);

  //   if (!existingUser || existingUser.role === USER_ROLES.ADMIN) return
  if (!existingUser) return;
  if (existingUser.role === USER_ROLES.ADMIN) return;

  const emailVerified = isCurrentlyVerified ? null : new Date();

  await db
    .update(users)
    .set({ emailVerified })
    .where(eq(users.id, existingUser.id));

  revalidatePath("/profile.admin-panel");
}
