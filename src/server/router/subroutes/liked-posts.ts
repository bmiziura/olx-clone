import { z } from "zod"
import { createProtectedRouter } from "../protected-router"

import { prisma } from "@/server/db/client"

export const likedPostsRouter = createProtectedRouter()
  .query(":isLiked", {
    input: z.string(),

    async resolve({ ctx, input }) {
      const userLiked = await prisma?.userLiked.findFirst({
        where: {
          post: {
            id: input,
            status: "ACTIVE",
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
          post: {
            status: "ACTIVE",
          },
        },
        select: {
          id: true,
          post: {
            select: {
              id: true,
              slug: true,

              title: true,
              city: true,

              price: true,

              category: {
                select: {
                  name: true,
                },
              },
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
  .mutation(":updatePostLike", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const alreadyLiked = await prisma?.userLiked.findFirst({
        where: {
          postId: input,
          userId: ctx.session.user.id,
        },
      })

      if (alreadyLiked) {
        await prisma?.userLiked.deleteMany({
          where: {
            postId: input,
            userId: ctx.session.user.id,
          },
        })
      } else {
        await prisma?.userLiked.create({
          data: {
            postId: input,
            userId: ctx.session.user.id,
          },
        })
      }

      return {
        ok: true,
        post: {
          id: input,
          isLiked: !alreadyLiked,
        },
      }
    },
  })
