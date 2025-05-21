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
  const [isPending, startTransaction] = useTransition(); // useTransition hook

  const clickHandler = async (email: string, isCurrentlyVerified: boolean) => {
    startTransition(() => {
      toggleEmailVerifiedAction(email, isCurrentlyVerified);
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
