import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

const MobileCategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="px-4 flex flex-col gap-2 pt-8">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default MobileCategoryList

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <Link href={`/kategorie/${category.slug}`}>
      <a>
        <div className="bg-red-700 bg-opacity-20 rounded-md py-4 px-4 flex justify-between items-center cursor-pointer select-none">
          <div className="flex gap-2 items-center">
            <div
              className={`relative w-12 h-12 ${category.color} p-3 rounded-full`}
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                layout="fill"
              />
            </div>
            <span>{category.name}</span>
          </div>

          <div>
            <FaChevronRight className="w-8 h-8" />
          </div>
        </div>
      </a>
    </Link>
  )
}
