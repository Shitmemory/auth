// types/auth-error.d.ts

import { ErrorType } from "next-auth"; // Import ErrorType if you're extending next-auth types

declare module "next-auth" {
  // Extending the `AuthError` class to include the custom 'type' and 'kind' properties
  interface AuthError {
    type: ErrorType | "CustomError"; // Your custom error type here
    kind?: "signIn" | "error"; // You can extend or modify this if needed
    cause?: Record<string, unknown> & { err?: Error }; // You can modify the 'cause' property
  }
}
