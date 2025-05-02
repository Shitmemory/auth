import { SigninForm } from "./components/signin-form";

export default function SigninPage() {
    return (
        <main className="mt-6 pl-16">
            <div className="container">
                <h1 className="font-bold text-3xl tight-tracking">
                    Sign In
                </h1>

                <div className="bg-muted h-1 my-4" />
                <SigninForm />

                {/* oauth links */}
            </div>
        </main>
    )
}