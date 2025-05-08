"use client";

import { oauthSigninAction } from "@/actions/oauth-signin-action";
import { Button } from "./ui/button";
import {
  SiGithub,
  SiGithubHex,
  SiGoogle,
  SiGoogleHex,
} from "@icons-pack/react-simple-icons";

type OAuthSigninButtonsProps = {
  signup?: boolean;
};

export const OAuthSigninButtons = ({ signup }: OAuthSigninButtonsProps) => {
  const text = signup ? "Sign up" : "Sign in";

  const ClickHandler = async (provider: "google" | "github") => {
    await oauthSigninAction(provider);
  };

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
    </div>
  );
};

// i dont need to use a callback function before ClickHandler in onclick because i am using the reference and not calling it as soon as the page loads so the function will only execute when the button is clicked
