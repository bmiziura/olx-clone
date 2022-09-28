import { z } from "zod"
import { createProtectedRouter } from "../protected-router"

export const likedPostsRouter = createProtectedRouter()
  .query("isLiked", {
    input: z.string(),

    async resolve({ ctx, input }) {
      const userLiked = await prisma?.userLiked.findFirst({
        where: {
          post: {
            id: input,
          },
        },
      })

      return {
        isLiked: userLiked !== null,
      }
    },
  })
  .query(":getAll", {
    async resolve({ ctx, input }) {
      const likedPosts = await prisma?.userLiked.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          post: {
            select: {
              title: true,
              slug: true,

              city: true,

              price: true,
            },
          },
        },
      })

      return likedPosts
    },
  })
  .mutation(":clearAll", {
    async resolve({ ctx, input }) {
      await prisma?.userLiked.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      })

      return {
        ok: true,
      }
    },
  })
  .mutation(":clear", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      await prisma?.userLiked.deleteMany({
        where: {
          userId: ctx.session.user.id,
          postId: input.id,
        },
      })

      return {
        ok: true,
      }
    },
  })
  .mutation(":likePost", {
    input: z.object({}),
    async resolve({ ctx, input }) {
      const {} = input
    },
  })
