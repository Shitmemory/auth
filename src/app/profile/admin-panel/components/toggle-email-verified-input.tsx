"use client";

import { toggleEmailVerifiedAction } from "@/actions/admin/toggle-verified-email-action";
import { users } from "@/drizzle/schema";
import { startTransition, useTransition } from "react";

type ToggleEmailVerifiedInputProps = {
  email: (typeof users.$inferSelect)["email"];
  emailVerified: (typeof users.$inferSelect)["emailVerified"];
  isAdmin: boolean;
};

export const ToggleEmailVerifiedInput = ({
  email,
  emailVerified,
  isAdmin,
}: ToggleEmailVerifiedInputProps) => {
  const [isPending, startTransition] = useTransition(); // useTransition hook

  const clickHandler = async (email: string, isCurrentlyVerified: boolean) => {
    startTransition(async () => {
      await toggleEmailVerifiedAction(email, isCurrentlyVerified);
    });
  };

  return (
    <input
      disabled={isAdmin} // we arent going to let admins edit other admins via the dashboard
      type="checkbox"
      checked={!!emailVerified}
      className="scale-150 enabled:cursor-pointer disabled:opacity-50"
      readOnly
      onClick={clickHandler.bind(null, email, !!emailVerified)}
    />
  );
};

// if clickHandler is async and toggleEmailVerifiedAction is inside it why do i need another async?
// just becasue an async function wraps another function doesnt mean that the inner function is also async
// the callback must be marked with async independently because its not running inside clickhandlers await context
