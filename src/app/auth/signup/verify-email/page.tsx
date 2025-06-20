import { verifyCredentialsEmailAction } from "@/actions/verify-credentials-email-action";
import { findVerificationTokenByToken } from "@/resources/verification-token-queries";
import { Button } from "@components/ui/button";
import Link from "next/link";

type PageProps = { searchParams: { token: string } }; // theres a more refined way to type this out

export default async function Page({ searchParams }: PageProps) {
  // if(!searchParams.token) return <p>BAD STATE</p>
  const token = searchParams?.token;

  const verificationToken = await findVerificationTokenByToken(token);

  await new Promise((res) => setTimeout(res, 1000));

  if (!verificationToken?.expires) return <TokenIsInvalidState />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState />;

  // verify the user
  const res = await verifyCredentialsEmailAction(searchParams.token);

  if (!res.success) return <TokenIsInvalidState />;

  return (
    <main className="mt-4 pl-10 pr-10">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">Verify Email</div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded bg-green-100 p-4">
          <p>Email verified.</p>

          <span>
            Click{" "}
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/auth/signin">here</Link>
            </Button>{" "}
            to sign in.
          </span>
        </div>
      </div>
    </main>
  );
}

const TokenIsInvalidState = () => {
  return (
    <main className="mt-4 pl-10 pr-10 mx-auto">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">Verify Email</div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded-lg bg-red-100 p-4">
          <p>Token is invalid.</p>

          <span>
            Click{" "}
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/auth/signup">here</Link>
            </Button>{" "}
            to sign up again.
          </span>
        </div>
      </div>
    </main>
  );
};
