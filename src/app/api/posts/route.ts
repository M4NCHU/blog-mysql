import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();
  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map(
      ({ category }) => category.id
    );
  }

  try {
    const { categoryName, limit, page, tagId, filter } = z
      .object({
        limit: z.string(),
        page: z.string(),
        filter: z.string(),
        categoryName: z.string().nullish().optional(),
        tagId: z.string().nullish().optional(),
      })
      .parse({
        categoryName: url.searchParams.get("categoryName"),
        tagId: url.searchParams.get("tag"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        filter: url.searchParams.get("filter"),
      });

    let whereClause = {};
    let sort = {};

    console.log(filter);

    if (!filter || filter === "") {
      sort = {
        createdAt: "desc",
      };
    } else if (filter === "asc") {
      sort = {
        createdAt: "asc",
      };
    } else if (filter === "desc") {
      sort = {
        createdAt: "desc",
      };
    }

    if (categoryName) {
      whereClause = {
        category: {
          name: categoryName,
        },
      };
    } else if (tagId) {
      whereClause = {
        tags: {
          some: {
            tag: {
              id: tagId,
            },
          },
        },
      };
    } else if (session) {
      whereClause = {
        category: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: sort,
      include: {
        category: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not read posts. Please try later", {
      status: 500,
    });
  }
}
