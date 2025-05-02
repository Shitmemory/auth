// /app/api/posts/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const supabase = createServerSupabaseClient({ req });

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

// configured to work with rls