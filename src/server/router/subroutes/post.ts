import { PostStatus } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import generateString from "../../utils/generate-string"
import { createProtectedRouter } from "../protected-router"

import { prisma } from "@/server/db/client"

const generateSlug: any = async (title: string) => {
  const finalStr = `${title
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/-$/, "")}-${generateString(5)}-${generateString(5)}`

  const post = await prisma?.post.findUnique({
    where: {
      slug: finalStr,
    },
  })

  if (post) {
    const slug = await generateSlug(title)

    return slug
  }

  return finalStr
}

export const postRouter = createProtectedRouter()
  .query(":getPosts", {
    input: z.object({
      status: z.nativeEnum(PostStatus),
    }),
    async resolve({ ctx, input }) {
      const { status } = input

      const posts = await prisma?.post.findMany({
        where: {
          userId: ctx.session.user.id,
          status: status,
        },
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
      })

      return posts
    },
  })
  .mutation(":deletePost", {
    input: z.object({
      id: z.string(),
    }),

    async resolve({ ctx, input }) {
      const { id } = input

      const post = await prisma?.post.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      })

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Nie odnaleziono takiego ogłoszenia lub to ogłoszenie nie należy do Ciebie!",
        })
      }

      const posts = await prisma?.post.deleteMany({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      })

      return {
        ok: true,
        deletedPosts: posts,
      }
    },
  })
  .mutation(":changeStatus", {
    input: z.object({
      id: z.string(),
      status: z.nativeEnum(PostStatus),
    }),

    async resolve({ ctx, input }) {
      const { id, status } = input

      if (status === "ACTIVE") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Nie możesz zamieniać ogłoszenia na ten status!",
        })
      }

      const post = await prisma?.post.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      })

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Nie odnaleziono takiego ogłoszenia lub to ogłoszenie nie należy do Ciebie!",
        })
      }

      const posts = await prisma?.post.updateMany({
        where: {
          id,
          userId: ctx.session.user.id,
        },

        data: {
          status,
        },
      })

      return {
        ok: true,
        posts,
      }
    },
  })
  .mutation(":newPost", {
    input: z.object({
      title: z
        .string()
        .max(50)
        .min(10)
        .regex(new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 ]{10,50}$")),
      category: z.string().max(50).min(3),
      description: z.string().max(9000).min(80),
      city: z
        .string()
        .max(20)
        .min(3)
        .regex(new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 .]{3,20}$")),
      number: z.string().max(9).min(9).regex(new RegExp("^[0-9]{9}$")),
    }),
    async resolve({ ctx, input }) {
      const { category, title, description, city, number } = input

      const foundCategory = await prisma?.category.findUnique({
        where: {
          slug: category,
        },

        select: {
          id: true,
        },
      })

      if (!foundCategory) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie odnaleziono takiej kategorii!",
        })
      }

      const slug = await generateSlug(title)

      const post = await prisma?.post.create({
        data: {
          slug,

          title,
          description,

          city,
          phoneNumber: number,

          categoryId: foundCategory.id,
          userId: ctx.session.user.id,

          price: 0,
        },
        select: {
          slug: true,
        },
      })

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Wystapił problem po stronie serwera!",
        })
      }

      return {
        ok: true,
        createdId: post?.slug,
      }
    },
  })
