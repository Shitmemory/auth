"use client";

import { oauthSigninAction } from "@/actions/oauth-signin-action";
import { Button } from "./ui/button";
import {
  SiGithub,
  SiGithubHex,
  SiGoogle,
  SiGoogleHex,
} from "@icons-pack/react-simple-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type OAuthSigninButtonsProps = { signup?: boolean };

export const OAuthSigninButtons = ({ signup }: OAuthSigninButtonsProps) => {
  const [errMessage, setErrMessage] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("");

  useEffect(() => {
    // the error for OAuthAccountNotLinked will never run
    if (!error) return;

    if (error === "OAuthAccountNotLinked") {
      setErrMessage("This account is already in use. Please sign in."); // so if you try to login with the same email it will show this error
    } else {
      setErrMessage("An error occured. Please try again.");
      // maybe i dont want the user to know if the account has been made before because a hacker could use this to find out info
    }
  }, [error]);

  const ClickHandler = async (provider: "google" | "github") => {
    try {
      await oauthSigninAction(provider);
    } catch (err) {
      console.log(err); //  we want it so that we can login using github google and credentials with the same email
    }
  };

  const text = signup ? "Sign up" : "Sign in";
  return (
    <div className="max-w-[400px]">
      <Button
        variant="secondary"
        className="w-full cursor-pointer"
        onClick={() => {
          ClickHandler("google");
        }}
      >
        {/* bind is a method that allows you to set the value of this inside a function and also
        present the arguments that the function will receive when it is called */}
        <SiGoogle color={SiGoogleHex} className="mt-2" />
        {text} with Google
      </Button>
      <Button
        variant="secondary"
        className="w-full mt-2 cursor-pointer"
        onClick={ClickHandler.bind(null, "github")}
      >
        <SiGithub color={SiGithubHex} className="mt-2" />
        {text} with Github
      </Button>

      {errMessage && (
        <p className="mt-2 text-sm font-medium text-red-500">{errMessage}</p>
      )}
    </div>
  );
};

// create this component for demo purposes
// explain that i have to make the buttons dynamic again to use suspense
type OAuthSigninSkeletonButtonsProps = OAuthSigninButtonsProps;

export const OAuthSigninButtonsSkeleton = ({
  signup,
}: OAuthSigninSkeletonButtonsProps) => {
  const text = signup ? "Sign up" : "Sign in";
  return (
    <div className="max-w-[400px]">
      <Button variant="secondary" className="w-full cursor-pointer">
        {/* bind is a method that allows you to set the value of this inside a function and also
      present the arguments that the function will receive when it is called */}
        <SiGoogle color={SiGoogleHex} className="mt-2" />
        {text} with Google
      </Button>
      <Button variant="secondary" className="w-full mt-2 cursor-pointer">
        <SiGithub color={SiGithubHex} className="mt-2" />
        {text} with Github
      </Button>
    </div>
  );
};

// i dont need to use a callback function before ClickHandler in onclick because i am using the reference and not calling it as soon as the page loads so the function will only execute when the button is clicked

// maybe i dont want the user to know if the account has been made before because a hacker could use this to find out info
