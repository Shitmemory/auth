import { AuthError } from "next-auth";

export class OAuthAccountAlreadyLinkedError extends AuthError {
  static type = "OAuthAccountAlreadyLinked";
}
// I have a type called OAuthAccountAlreadyLinkedError defined in a class also called OAuthAccountAlreadyLinkedError
// using static props like type within classes especially when the prop has the same name as the class is a common and recommended practice
