import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      content,
      categoryId,
      isPrivate,
      tags: newTags,
    } = PostValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // verify user is subscribed to passed category id
    const subscription = await db.subscription.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (!subscription) {
      return new Response("Subscribe to post", { status: 403 });
    }

    const existingTags = await Promise.all(
      newTags.map(async (newTag) => {
        const existingTag = await db.tag.findFirst({
          where: { name: newTag.title },
        });

        if (existingTag) {
          return existingTag;
        } else {
          return db.tag.create({
            data: { name: newTag.title },
          });
        }
      })
    );

    const tagIds = existingTags.map((tag) => tag.id);
    console.log(tagIds);
    // return;

    const newPost = await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        categoryId,
        isPrivate: isPrivate,
      },
    });

    const postTagsPromises = tagIds.map((tagId) => {
      return db.postTags.create({
        data: {
          postId: newPost.id,
          tagId: tagId,
        },
      });
    });

    // Teraz możemy poczekać na wszystkie te operacje asynchroniczne, aby upewnić się, że tagi zostały poprawnie dodane do tabeli PostTags.
    await Promise.all(postTagsPromises);

    return new Response("OK");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(error.message, { status: 500 });
  }
}
