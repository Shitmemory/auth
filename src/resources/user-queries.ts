"use server";

import { auth } from "@/auth";
import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const findUserByEmail = async (
  email: string
): Promise<typeof users.$inferSelect | null> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then((res) => res[0] ?? null);

  return user;
};

// export const findUserById = async (
//   id: string
// ): Promise<Omit<typeof users.$inferSelect, "password">> => {
//   const { password, ...rest } = getTableColumns(users);

//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, id))
//     .then((res) => res[0] ?? null);

//   if (!user) throw new Error("User not found");

//   return user;
// }; this function passes in the id

// export const findUserByAuth = async () => {
//   const session = await auth();

//   const sessionUserId = session?.user.id;
//   if (!sessionUserId) throw new Error("Unauthorised");
//   const { password, ...rest } = getTableColumns(users);
//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, sessionUserId))
//     .then((res) => res[0] ?? null);

//   if (!user) throw new Error("User not found");

//   return user;
// }; // this function combines the best of both worlds where we get the user by the auth
// so it handles both cases, one for the user creating an account with external providers and the other case where the user created an account with their email, in both cases the user still has an email

// only ever used on the server
// different from use server this is more for server queries

// selects a user based on their email address
