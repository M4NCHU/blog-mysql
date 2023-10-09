import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CategorySubscriptionValidator } from "@/lib/validators/category";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { categoryId } = CategorySubscriptionValidator.parse(body);

    // check if user has already subscribed to category
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists) {
      return new Response("You've already subscribed to this category", {
        status: 400,
      });
    }

    // create category and associate it with the user
    await db.subscription.create({
      data: {
        categoryId,
        userId: session.user.id,
      },
    });

    return new Response(categoryId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not subscribe to category at this time. Please try later",
      { status: 500 }
    );
  }
}
