import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto flex flex-col justify-center md:items-center">
        <div className="w-full flex justify-between items-center md:justify-center border-b-[1px] pb-4 md:border-none md:pb-0">
          <h1 className="text-3xl font-bold">Kategorie główne</h1>

          <span className="md:hidden">
            <Link href="/kategorie">
              <a>
                <div className="flex items-center justify-center gap-1">
                  <span className="link">Zobacz wszystkie</span>
                </div>
              </a>
            </Link>
          </span>
        </div>

        <div className="mt-5 flex gap-4 flex-wrap overflow-x-auto overscroll-x-contain snap-x snap-mandatory md:overflow-x-visible">
          {categories.map((category) => (
            <CategoryListItem key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

const CategoryListItem = ({ category }: { category: Category }) => {
  return (
    <div className="snap-start">
      <Link href={`/kategorie/${category.slug}`}>
        <a>
          <div className="flex flex-col items-center justify-center group gap-1">
            <div
              className={`relative w-16 h-16 ${category.color} p-3 rounded-full`}
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                layout="fill"
              />
            </div>
            <span className="font-bold link-group">{category.name}</span>
          </div>
        </a>
      </Link>
    </div>
  )
}
