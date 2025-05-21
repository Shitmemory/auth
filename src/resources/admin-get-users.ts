import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { USER_ROLES } from "@/lib/constants";
import { desc, getTableColumns } from "drizzle-orm";

export async function findAllUsers() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error("Unauthorised");
  }

  const { password, ...rest } = getTableColumns(users);

  const allUsers = await db
    .select({ ...rest })
    .from(users)
    .orderBy(desc(users.role));

  return allUsers;
}
