"use server";

import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function OAuthVerifyEmailAction(email: string) {
  const existingUser = await db
    .select({ id: users.id }) // select creates a new promise
    .from(users)
    .where(
      and(
        eq(users.email, email),
        isNull(users.password), // oauth passwords typically stay null
        isNull(users.emailVerified)
      ) // so this finds a user that exists, has no password set and no email verifiedd
    )
    .then((res) => res[0] ?? null); // the then method is used to handle the result or the message returned by the select() query

  if (existingUser?.id) {
    await db
      .update(users)
      .set({ emailVerified: new Date() }) // if the user exists this updates the emailVerified row to new Date (today)
      .where(eq(users.id, existingUser.id)); // so the users id must match the existing users id and it always will
  }
}

// the set method returns a promise which allows you to wait for the db operation to complete before proceeding with the next line of code
// .then is similar to a try catch block
// .then will return the messages that were defined by new Promise, so new Promise doesnt return any values it just gets the values ready for the then method to return once the promise has resolved
