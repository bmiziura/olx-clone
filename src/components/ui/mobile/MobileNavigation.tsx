import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

type NavigationItem = {
  id: string
  name: string

  href: string

  number?: number
}

const MobileNavigation = ({
  title,
  items,
}: {
  title: string
  items: NavigationItem[]
}) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold">{title}</h2>

      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

const Item = ({ item }: { item: NavigationItem }) => {
  const { href, name, number } = item

  return (
    <Link href={href}>
      <a className="flex justify-between border-b-[1px] py-4 items-center">
        <span>{name}</span>

        <div className="flex gap-4 items-center">
          {number && (
            <span className="bg-slate-100 rounded-full px-2 py-1">
              {number}
            </span>
          )}

          <FaChevronRight className="w-6 h-6" />
        </div>
      </a>
    </Link>
  )
}

export default MobileNavigation
