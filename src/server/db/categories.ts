import { prisma } from "./client"

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      slug: true,
      name: true,
      color: true,
      imageUrl: true,
    },
  })

  return categories
}
