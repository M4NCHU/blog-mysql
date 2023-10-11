import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, type } = body;

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const results = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        isPrivate: type,
      },
    });

    return new Response(JSON.stringify({ type }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(error.message, { status: 500 });
  }
}
