import Link from "next/link";
import { SignupForm } from "./components/signup-form";
import { Button } from "@components/ui/button";
import {
  OAuthSigninButtons,
  OAuthSigninButtonsSkeleton,
} from "@components/oauth-signin-buttons";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main className="mt-6 mx-auto pl-16">
      <div className="">
        <h1 className="tracking-tight font-bold text-4xl">Sign Up</h1>

        <div className="bg-muted h-1 my-4" />
        <SignupForm />

        <div className="bg-muted h-1 my-4" />
        <Suspense fallback={<OAuthSigninButtonsSkeleton signup />}>
          {" "}
          {/* Demo the loading skeleton  */}
          <OAuthSigninButtons signup />
        </Suspense>
        <p>
          Already have an account? Click
          <Button className="p-1" variant="link">
            <Link href={"/auth/signin"}>here</Link>
          </Button>
          to sign in
        </p>
      </div>
    </main>
  );
}
