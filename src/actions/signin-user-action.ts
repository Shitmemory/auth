"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function signinUserAction(values: unknown): Promise<Res> {
  try {
    if (
      values === null ||
      Array.isArray(values) ||
      typeof values !== "object"
    ) {
      throw new Error("Invalid JSON object");
    }

    await signIn("credentials", { redirect: false, ...values });
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignIn":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Failed sign in attempt",
            statusCode: 401,
          };
        default:
          return {
            success: false,
            error: "Something went wrong",
            statusCode: 500,
          };
      }
    }
    console.log(err);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}

// once the sign in completes we take care of the redirecting on our own

// when using typoeof at runtime i asm comparing types as strings

// had to extenmmd the types for type

// Res defines the shape of the response from the function. This is useful for type checking
// the structure of your objects ensuring the values are returned in a specific format.

// allowing the values object to be of any JSON object gives the function the flexibility
// to process a wider variety of inputs and then i can validate and transform them
// into a well defined output that conforms to the res layout.

// in nextauth v4 it is recommended to use routes instead of the signin method to provide the type of provider etc etc

// instead of using a try catch block i can simply do this throw new AuthError("CredentialsSignin", "Invalid credentials");

// the reason i am using the try catch block is that it gives me much more flexibility

// user should always be an object because i am working with a relational db and using an ORM and the users tasble returns a user as an object when querying it

// new Error is preffered for clean, readable and extendable code. using new error is best pratice because it gives us better contol over stack trace formatting and custom messages if needed
