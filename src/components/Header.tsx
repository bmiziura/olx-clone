import Logo from "@/components/ui/Logo"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { IconBaseProps } from "react-icons"
import { FaChevronDown } from "react-icons/fa"

import {
  HiOutlineAnnotation,
  HiOutlineArchive,
  HiOutlineUser,
} from "react-icons/hi"
import { MdFavoriteBorder } from "react-icons/md"
import { WhiteButton } from "./ui/buttons/Button"

import { BrowserContent } from "./ui/layout/LayoutContent"

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <BrowserContent>
      <header className="h-16 bg-primary text-white">
        <div className="container mx-auto h-full flex justify-between items-center">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>

          <nav>
            <ul className="flex gap-8 items-center">
              {session?.user?.role === "ADMIN" && (
                <li>
                  <HeaderItem
                    text="ACP"
                    href="/admincp"
                    icon={<HiOutlineArchive className="w-6 h-6" />}
                  />
                </li>
              )}
              <li>
                <HeaderItem
                  text="Wiadomości"
                  href="/mojolx/wiadomosci"
                  icon={<HiOutlineAnnotation className="w-6 h-6" />}
                />
              </li>
              <li>
                <HeaderItem
                  href="/obserwowane"
                  icon={<MdFavoriteBorder className="w-6 h-6" />}
                />
              </li>
              <li>
                <HeaderItem
                  text={
                    status === "authenticated" ? "Twoje Konto" : "Zaloguj się"
                  }
                  href="/mojolx"
                  icon={<HiOutlineUser className="w-6 h-6" />}
                  isHoverable={status === "authenticated"}
                  hideText={false}
                >
                  {status === "authenticated" && (
                    <ProfileHover session={session} />
                  )}
                </HeaderItem>
              </li>
              <li>
                <Link href="/mojolx/ogloszenia/nowe">
                  <a>
                    <WhiteButton>Dodaj ogłoszenie</WhiteButton>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </BrowserContent>
  )
}

const ProfileHover = ({ session }: { session: Session }) => {
  return (
    <div className="hidden group-hover:block absolute top-full w-max z-[999999]">
      <div className="bg-white text-primary rounded-md shadow-md overflow-hidden">
        <div className="flex flex-col gap-4 pt-2 select-none">
          <div className="px-4 flex gap-4 items-center">
            <div className="relative w-8 h-8">
              <Image
                src={session.user?.image || ""}
                alt={session.user?.name || "userImage"}
                layout="fill"
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold truncate w-[10rem]">
                {session.user?.name}
              </span>
              <span className="text-[0.75rem] font-bold truncate w-[10rem]">
                Id: {session.user?.id}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-sm">
            <div className="text-md px-4 pb-2 font-bold text-primary-lg">
              Twoje Konto
            </div>
            <ProfileHoverLink href="/mojolx/ogloszenia/aktywne">
              Ogłoszenia
            </ProfileHoverLink>
            <ProfileHoverLink href="/mojolx/wiadomosci">
              Wiadomości
            </ProfileHoverLink>
            <ProfileHoverLink href="/mojolx/ustawienia">
              Ustawienia
            </ProfileHoverLink>
          </div>
          <div className="flex flex-col text-sm">
            <div className="text-md px-4 pb-2 font-bold text-primary-lg">
              Obserwowane:
            </div>
            <ProfileHoverLink href="/mojolx/obserwowane">
              Ogłoszenia
              <span className="ml-3 p-1 aspect-square bg-slate-100 rounded-full group-hover:text-primary">
                0
              </span>
            </ProfileHoverLink>
          </div>
          <div
            className="border-t-[1px] px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
            onClick={() => signOut()}
          >
            Wyloguj się
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileHoverLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <Link href={href}>
      <a className="group px-4 py-2 hover:bg-primary hover:text-white cursor-pointer">
        {children}
      </a>
    </Link>
  )
}

const HeaderItem = ({
  text,
  isHoverable = false,
  hideText = true,
  href,
  icon,
  children,
}: {
  text?: string
  isHoverable?: boolean
  hideText?: boolean
  href: string
  icon: IconBaseProps
  children?: ReactNode
}) => {
  return (
    <div className="group relative">
      <Link href={href}>
        <a className="flex items-center gap-2 text-md font-bold hover:text-primary-lg">
          <>
            {icon}
            <div className="flex gap-2 items-center">
              {text && (
                <span className={hideText ? "hidden lg:block" : ""}>
                  {text}
                </span>
              )}
              {isHoverable && <FaChevronDown />}
            </div>
          </>
        </a>
      </Link>

      {children}
    </div>
  )
}

export default Header
