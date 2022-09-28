import { useRouter } from "next/router"
import { ReactElement } from "react"
import { MobileContent } from "../layout/LayoutContent"

import { useSession } from "next-auth/react"
import Link from "next/link"
import {
  MdAddCircleOutline,
  MdFavorite,
  MdFavoriteBorder,
  MdHome,
  MdMessage,
  MdOutlineHome,
  MdOutlineMessage,
  MdOutlinePersonOutline,
  MdPerson,
} from "react-icons/md"

const MobileBottomNavigation = () => {
  const { status } = useSession()

  const router = useRouter()

  const isMainPageActive = () => {
    const path = router.pathname

    return !path.includes("/mojolx") && !path.includes("/obserwowane")
  }

  const isPanelActive = () => {
    const path = router.pathname
    return path.includes("/mojolx") && !path.includes("/mojolx/wiadomosci")
  }

  return (
    <MobileContent>
      <div className="w-full h-16">
        <div className="fixed bottom-0 left-0 z-[9999] w-full bg-white bottom-nav h-16">
          <nav className="h-full">
            <ul className="flex justify-evenly items-center h-full">
              <Item
                icon={<MdOutlineHome className="h-6 w-6" />}
                activeIcon={<MdHome className="h-6 w-6" />}
                name="Szukaj"
                href="/"
                active={isMainPageActive()}
              />
              {status === "authenticated" && (
                <>
                  <Item
                    icon={<MdFavoriteBorder className="h-6 w-6" />}
                    activeIcon={<MdFavorite className="h-6 w-6" />}
                    name="Obserwujesz"
                    href="/obserwowane"
                  />
                  <Item
                    icon={<MdAddCircleOutline className="h-6 w-6" />}
                    activeIcon={<MdAddCircleOutline className="h-6 w-6" />}
                    name="Dodaj"
                    href="/mojolx/ogloszenia/nowe"
                    active={false}
                  />
                  <Item
                    icon={<MdOutlineMessage className="h-6 w-6" />}
                    activeIcon={<MdMessage className="h-6 w-6" />}
                    name="Wiadomości"
                    href="/mojolx/wiadomosci"
                  />
                </>
              )}
              <Item
                icon={<MdOutlinePersonOutline className="h-6 w-6" />}
                activeIcon={<MdPerson className="h-6 w-6" />}
                name={status === "authenticated" ? "Konto" : "Zaloguj się"}
                href="/mojolx"
                active={isPanelActive()}
              />
            </ul>
          </nav>
        </div>
      </div>
    </MobileContent>
  )
}

const Item = ({
  icon,
  activeIcon,
  name,
  href,
  active,
}: {
  icon: ReactElement
  activeIcon: ReactElement
  name: string
  href: string
  active?: boolean
}) => {
  const router = useRouter()

  const isActive = active ?? router.pathname.includes(href)

  return (
    <Link href={href}>
      <a className="flex flex-col items-center justify-center">
        {isActive ? activeIcon : icon}
        <span className={`text-[0.7rem] font-light`}>{name}</span>
      </a>
    </Link>
  )
}

export default MobileBottomNavigation
