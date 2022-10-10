import { z } from "zod"
import { createRouter } from "../context"

export const searchRouter = createRouter().query(":searchPosts", {
  input: z.object({
    searchText: z.string(),
  }),

  async resolve({ ctx, input }) {
    const { searchText } = input
    const posts = await prisma?.post.findMany({
      where: {
        title: {
          startsWith: searchText,
        },
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
