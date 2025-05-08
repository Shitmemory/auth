import Link from "next/link";
import { Button } from "@components/ui/button";
import { SigninForm } from "./components/signin-form";

export default function SigninPage() {
  return (
    <main className="mt-6 pl-16">
      <div className="container">
        <h1 className="text-3xl tracking-tight font-bold">Sign In</h1>

        <div className="bg-muted h-1 my-4" />
        <SigninForm />

        <div className="bg-muted h-1 my-4" />
        <p>
          Don't have an account already? Click{" "}
          <Button variant="link" className="px-0">
            <Link href="auth/signup">here</Link>
          </Button>{" "}
          to sign up
        </p>
      </div>
    </main>
  );
}
