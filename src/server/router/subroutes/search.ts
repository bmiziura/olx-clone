import { z } from "zod"
import { createRouter } from "../context"

import { prisma } from "@/server/db/client"

export const searchRouter = createRouter().query(":searchPosts", {
  input: z.object({
    searchText: z.string(),
    category: z.string(),
  }),

  async resolve({ ctx, input }) {
    const { searchText, category } = input

    const posts = await prisma?.post.findMany({
      where: {
        title: {
          startsWith: searchText,
          mode: "insensitive",
        },
        category: category === "all" ? {} : { slug: category },

        status: "ACTIVE",
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
