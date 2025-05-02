import { Button } from "@components/ui/button";
import { SignupForm } from "./components/signup-form";
import Link from "next/link";

export default function SignupPage() {
    return (
        <main className="mt-6 pl-16">
            <div className="container">
                <h1 className="text-3xl font-bold tracking-tight">
                    Sign Up Page
                </h1>

                <div className="bg-muted h-1 my-4" />
                <SignupForm />

                <div className="bg-muted h-1 my-4" />
                <p>
                    Already have an account? Click {""} 
                    <Button 
                    variant="link"
                    className="px-0 font-bold"
                    >
                        <Link href="/auth/signin">here</Link>
                    </Button> {""} to sign in
                </p>
            </div>
        </main>
    )
}