"use client";

import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// children serves as the actual children and not just a placeholder
// so when i use this component i can put anything inbetween the tags as children
// its recommended to mark the sessionprovider with use client
