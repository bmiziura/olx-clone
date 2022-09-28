import Link from "next/link"
import { useRouter } from "next/router"

type NavigationItem = {
  name: string
  href: string
  active?: boolean
}

const TabNavigation = ({
  items,
  border = false,
}: {
  border?: boolean
  items: NavigationItem[]
}) => {
  return (
    <ul className="text-sm text-gray-400 flex">
      {items.map((item) => (
        <TabNavigationItem key={item.href} item={item} border={border} />
      ))}
    </ul>
  )
}

const TabNavigationItem = ({
  item,
  border,
}: {
  border: boolean
  item: NavigationItem
}) => {
  const { name, href, active } = item

  const router = useRouter()

  const isActive = active ?? router.pathname.includes(href)

  return (
    <Link href={href}>
      <a
        className={`p-4 ${
          isActive
            ? "border-b-2 border-primary p-4 text-primary font-bold"
            : border
            ? "border-b-[1px]"
            : ""
        }`}
      >
        <li>{name}</li>
      </a>
    </Link>
  )
}

export default TabNavigation
