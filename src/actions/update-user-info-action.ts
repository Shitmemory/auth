"use server";

import * as v from "valibot";
import { UpdateUserInfoSchema } from "@/validators/update-user-info-validator";

import { auth } from "@/auth";
import { users } from "@/drizzle/schema";
import db from "@/drizzle";
import { eq } from "drizzle-orm";

type Res =
  | {
      success: true;
      data: {
        id: (typeof users.$inferSelect)["id"];
        name: (typeof users.$inferSelect)["name"];
      };
    }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };
// just like in maths, the brackets come first so users type will be checked before id is accessed
// inferSelect accesses the users table in thisn case and takes the id row types from the table.
export async function updateUserInfoAction(values: unknown): Promise<Res> {
  // add ts-ignore

  const parsedValues = v.safeParse(UpdateUserInfoSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);

    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { name, id } = parsedValues.output;

  const session = await auth();

  if (!session?.user?.id || session.user.id !== id) {
    return { success: false, error: "Unauthorised", statusCode: 401 };
  } // this should never happen on the front end client but it might happen if we hit the end point through postman or curl request

  if (session.user.name === name) {
    return { success: true, data: { id, name } };
  }

  try {
    const updatedUser = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning({ id: users.id, name: users.name })
      .then((res) => res[0]); // res returns the resolved data

    return { success: true, data: updatedUser };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}

// this isnt simple to implement because we want to make sure that the actual person who is authenticated is updating themselves

// THINGS TO IMPROVE

// I probably want to abstract inferSelect to its own type then use that but this would be implementing a new types file
