import { auth } from "@/auth";
// import { findUserById, findUserByAuth } from "@/resources/user-queries";
import { SignoutButton } from "@components/signout-button";
import { Button } from "@components/ui/button";
import { type User } from "next-auth"; // this extracts the type assigned to user without including the functionality
import Link from "next/link";
import { UpdateUserInfoForm } from "./components/update-user-info-form";
import { redirect } from "next/navigation";
import { USER_ROLES } from "@/lib/constants";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth();
  const isAdmin = session?.user?.role === USER_ROLES.ADMIN; // get the role from the db

  // pulling the session token from the cookie (next.auth.session-token)
  // it verifies and decodes the JWT using the nextauth secret in env
  // it populates a session object based on the decoded token via the callbacks.jwt() gets an instance of the token

  if (!session?.user) {
    redirect("/auth/signin");
  } // demo this, i dont need this because the same logic is declared in middleware

  console.log(session?.user);

  // dont want to store all the info in the session so get the user from the db instead of the session

  // Access user info from database via session user id

  // const sessionUserId = session?.user.id;
  // let databaseUser;
  // if (sessionUserId) {
  //   databaseUser = await findUserById(sessionUserId);
  // } this is a way of getting the infiormation from the db isnbtead of session. I can go to auth file and adjust it so that i am only passing in the id even in the credentials and just return the id and then i can get the id from session then access all info from the id by querying the db.

  // Access user info from database via auth

  // const databaseUser = await findUserByAuth();
  // console.log(databaseUser)

  return (
    <main className="mt-16 pl-8">
      <div className="container">
        <h1 className="text-3xl tracking-tight">Profile</h1>
        {isAdmin && <AdminPanelButton />}
        <div className="bg-muted h-1 my-4" />
        {!!session?.user ? (
          <SignedIn user={session.user} />
        ) : (
          <SignedOut />
        )}{" "}
        {/* we get the user session then displaying the profile based on if we are signed in or signed out */}
        {/* !! ensures that the value is treated as a boolean it isnt nessesary*/}
      </div>
    </main>
  );
}

const SignedIn = async ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Information</h2>
        <UpdateUserInfoForm user={user} />
      </div>

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-gray-50 px-6 py-3 text-start">id</th>
            <th className="bg-gray-50 px-6 py-3 text-start">name</th>
            <th className="bg-gray-50 px-6 py-3 text-start">email</th>
            {/* th are bold by default  */}
          </tr>
        </thead>

        <tbody>
          <tr className="divide-x">
            <td className="px-6 py-3">{user.id}</td>
            <td className="px-6 py-3">{user.name || "NULL"}</td>
            <td
              className={cn("px-6 py-3", {
                "opacity-50": user.name === null,
              })}
            >
              {user.name ?? "NULL"}
            </td>
            <td className="px-6 py-3">{user.email}</td>
            <td className="px-6 py-3 uppercase">{user.role}</td>
          </tr>
        </tbody>
      </table>

      <div className="my-2 h-1 bg-muted" />
      {/* Sign out button */}
      <SignoutButton />
    </>
  );
}; // trhe first part is destructuring the user prop  from the object that gets passed into the signed in function
// the second part is specifying the type of the entire object thats passed to signedIn. I am saying I expect the argument to be an object with a property user and user should be of type User

const SignedOut = () => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">User not Signed In</h2>

      <div className="my h-1 bg-muted" />

      <Button asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
    </>
  );
};

const AdminPanelButton = () => {
  return (
    <Button size="lg" asChild>
      <Link href="/profile/admin-panel">
        <LockIcon className="mr-2" />
        Admin Panel
      </Link>
    </Button>
  );
};

// the signedIn and signedOut functions are inspiration from clerk

// the auth function provides the user with the session
