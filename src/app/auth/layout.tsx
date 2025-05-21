import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) redirect("/profile"); // demo this and the wholle file

  return <div>{children}</div>;
}

// explain that if i dont put in redirects then the user can keep creating oauth accounts whilst signed in which is not what i want
