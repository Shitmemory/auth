import { Button } from "@components/ui/button";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="mt-4 pl-10 pr-10 mx-auto">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">Verify Email</div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded-lg p-4">
          <div className="animate-pulse h-1 bg-muted" />

          <div className="animate-pulse h-20 bg-muted" />
        </div>
      </div>
    </main>
  );
}
