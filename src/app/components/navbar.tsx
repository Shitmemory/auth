import Link from "next/link";
import { Button } from "./ui/button";
import { NavbarLinks } from "./navbar-links";
// import { NavbarLinks } from "./navbar-links";

export const Navbar = () => {
  return (
    <nav className="h-14 border-b pl-16">
      <div className="h-full container flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href="/">Authy</Link>
        </h3>

        <ul className="flex items-center gap-x-4">
          <NavbarLinks />
        </ul>
      </div>
    </nav>
  );
};

// we want to display sign in sign up only when we are logged out
// in next.js every component is a client component
// i want the nav links to be client components
