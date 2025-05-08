"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignoutButton } from "./signout-button";
import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import { auth } from "@/auth";

export const NavbarLinks = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <Loading />;
    case "unauthenticated":
      return <SignedOut />;
    case "authenticated":
      return <SignedIn />;
    default:
      return null;
  }
};

const Loading = () => {
  return (
    <li>
      <Button size="sm" variant="ghost">
        <Loader2Icon className="min-w-[8ch] animate-spin" />
      </Button>
    </li>
  );
};

const SignedIn = () => {
  return (
    <>
      <li>
        <Button size="sm" asChild>
          <Link href="/profile">Profile</Link>
        </Button>
      </li>

      <li>
        <SignoutButton />
      </li>
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </li>

      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </li>
    </>
  );
};

// similar to the profile page

// t

// when importing a client component to a server component it is important not to mark the file with use server or use client

// 1) set up the file like this  const session = await auth();

//   return !!session?.user ? <SignedIn /> : <SignedOut />;
// };

// 2) then run build and identify that the pages are all dynamic

// 3) create an api route and setup post and get requests and destructure the handlers function in auth file

// 4) create providers in components

// 5) wraop the nav and children in layout in the providers

// 6) change this file to use useSession

// 7) handle the error of attempted to call useSession from the server by marking the file with useClient and removing the async from the function

// 8) check the console to verify that the data is showing up of the current session

// 9) now go over why i am using window.redirect instead of using nextjs redirect router

// 10) to demonstrate this go ton the signout user actions and change redirect false to redirectTo /

// 11) read the error in the console

// 12) change the try catch block inside the signout user action

// // 13) so changing the catch block to   if (isRedirectError(err)) {
//       throw err
//     } will work but the icons for loading state wont work unless you realod the page

//14) so i just use the window.redirect instead and set redirect: false in signout user action

// 15) explain that this is fine becasue the window.reidrect only happens once, once when we signout or signin

// 16) explain that the whole thing i did where i changed the navbar link to a client component so that all the pages wouldnt be dynamic, depending on the application it doesnt matter if all of the web pages are static or not
// changing the navbar from

// i could use the auth function instead and have one synced source of truth from where the session is coming from i could make everything a server component
// or i could seperate the sign in and sign out pages to a seperate layout in order to make them static
