"use client";

import { signoutUserAction } from "@/actions/signout-user-action";
import { Button } from "./ui/button";

export const SignoutButton = () => {
  const clickHandler = async () => {
    await signoutUserAction();
    window.location.href = "/"; // this is a one time thing that happens after you sign in or sign out so it is a minor issue
  };

  return (
    <Button
      variant={"destructive"}
      size="sm"
      onClick={clickHandler}
      className="cursor-pointer"
    >
      Sign Out
    </Button>
  );
};

// i am using window.location.href instead of redirect from nextjs because tof the navbar, the state was not properly synching when i change the page
// ideally i dont want to do this i would like to use await signOut({ redirectTo: "/" });
// if i use this i will get an error because of the try catch block. The way that next redirect works is that it throws an error and we are catching the redirect error which is not what i want to do

// we aare using the window location to make sure that when we sign in or sign out the navbar links get a hard refresh
