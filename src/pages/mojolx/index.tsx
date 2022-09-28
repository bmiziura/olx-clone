import Footer from "@/components/Footer"
import SelectedAction from "@/components/SelectedAction"
import { DarkButton } from "@/components/ui/buttons/Button"
import {
  BrowserContent,
  MobileContent,
} from "@/components/ui/layout/LayoutContent"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import MobileMoreContent from "@/components/ui/mobile/MobileMoreContent"
import MobileNavigation from "@/components/ui/mobile/MobileNavigation"
import MobilePageContainer from "@/components/ui/mobile/MobilePageContainer"
import TabNavigation from "@/components/ui/TabNavigation"
import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdMoreHoriz,
  MdOutlineCalendarToday,
  MdOutlinePhone,
  MdOutlinePlace,
  MdOutlineRemoveRedEye,
} from "react-icons/md"

export const MobilePanel = () => {
  const { data: session } = useSession()

  const navigationData = [
    {
      id: "posts",
      title: "Twoje ogłoszenia",

      items: [
        {
          id: "aktywne",
          name: "Aktywne",
          href: "/mojolx/ogloszenia/aktywne",
          number: 0,
        },
        {
          id: "oczekujace",
          name: "Oczekujące",
          href: "/mojolx/ogloszenia/oczekujace",
          number: 0,
        },
        {
          id: "zakonczone",
          name: "Zakończone",
          href: "/mojolx/ogloszenia/zakonczone",
          number: 0,
        },
      ],
    },
    {
      id: "messages",
      title: "Wiadomości",

      items: [
        {
          id: "aktualne",
          name: "Aktualne",
          href: "/mojolx/wiadomosci",
          number: 0,
        },
        {
          id: "kosz",
          name: "Kosz",
          href: "/mojolx/wiadomosci/kosz",
          number: 0,
        },
      ],
    },
    {
      id: "settings",
      title: "Ustawienia i funkcje",

      items: [
        {
          id: "ustawienia",
          name: "Ustawienia",
          href: "/mojolx/ustawienia",
        },
      ],
    },
  ]

  return (
    <MobileContent>
      <div className="container mx-auto pt-8">
        <h1 className="text-3xl font-bold">Cześć, {session?.user?.name}!</h1>
        <span className="text-sm">ID: {session?.user?.id}</span>

        <Link href="/mojolx/ogloszenia/nowe">
          <a>
            <div className="bg-yellow-50 flex items-center justify-center py-4 text-xl font-bold my-8 cursor-pointer">
              Dodaj ogłoszenie
            </div>
          </a>
        </Link>

        {navigationData.map((navigation) => (
          <MobileNavigation
            key={navigation.id}
            title={navigation.title}
            items={navigation.items}
          />
        ))}

        <div className="flex justify-center" onClick={() => signOut()}>
          <DarkButton>Wyloguj się</DarkButton>
        </div>
      </div>
    </MobileContent>
  )
}

export const PanelNavigation = () => {
  return (
    <TabNavigation
      items={[
        { name: "Ogłoszenia", href: "/mojolx" },
        { name: "Wiadomości", href: "/mojolx/wiadomosci" },
        { name: "Ustawienia", href: "/mojolx/ustawienia" },
      ]}
    />
  )
}

export const PostsNavigation = () => {
  const router = useRouter()
  const isMainActive = () => {
    return (
      router.pathname.endsWith("/mojolx") ||
      router.pathname.includes("/mojolx/ogloszenia/aktywne")
    )
  }
  return (
    <TabNavigation
      border={true}
      items={[
        { name: "Aktywne", href: "/mojolx", active: isMainActive() },
        { name: "Oczekujące", href: "/mojolx/ogloszenia/oczekujace" },
        { name: "Zakończone", href: "/mojolx/ogloszenia/zakonczone" },
      ]}
    />
  )
}

export const PostsList = ({ status = "ACTIVE" }: { status: any }) => {
  const { data, isLoading, isRefetching, isError, refetch } = trpc.useQuery(
    ["posts:getPosts", { status }],
    {
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading || isRefetching) {
    return (
      <div className="container mx-auto mt-4 flex items-center justify-center">
        <svg
          aria-hidden="true"
          role="status"
          className="inline mr-3 w-8 h-8 text-primary animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div className="container mx-auto mt-4 flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold">Wystąpił błąd!</h3>
          <span>
            Po stronie serwera wystąpił błąd! Spróbuj ponownie później!
          </span>
        </div>

        <DarkButton onClick={() => refetch()}>Spróbuj jeszcze raz</DarkButton>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-4">
      <BrowserContent>Filters</BrowserContent>

      {data.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold">Brak ogłoszeń!</h3>
            <span>Dodaj ogłoszenia lub zmień kryteria wyszukiwania</span>
          </div>

          <Link href="/mojolx/ogloszenia/nowe">
            <a>
              <DarkButton>Dodaj ogłoszenie</DarkButton>
            </a>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <SelectedAction>
            {data.map((post) => {
              return (
                <article key={post.id} className="bg-white p-4 rounded-md">
                  <div className="flex gap-8">
                    <div className="w-64 aspect-video bg-gray-800 text-white">
                      Logo
                    </div>
                    <div className="w-full md:border-b-[1px] md:pb-4">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <h1 className="md:text-xl md:font-bold">
                          <Link href={`/oferta/${post.slug}`}>
                            <a className="hover:underline">{post.title}</a>
                          </Link>
                        </h1>
                        <span className="text-xl font-bold">
                          {post.price + " zł"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div className="hidden md:flex flex-col gap-3">
                          <span className="text-sm text-gray-500">
                            {post.category?.name}
                          </span>
                          <div className="flex gap-1 items-center">
                            <MdOutlinePlace className="w-5 h-5" />
                            <span className="text-gray-500 text-sm">
                              {post.city}
                            </span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <MdOutlineCalendarToday className="w-5 h-5" />
                            <span className="text-gray-500 text-sm">
                              11.02.2022
                            </span>
                          </div>
                        </div>
                        <div className="flex self-end gap-4">
                          <div className="flex gap-4 bg-slate-100 p-2 px-4 rounded-md items-center">
                            <div className="flex gap-2 items-center">
                              <MdOutlineRemoveRedEye className="w-5 h-5" />
                              <span>0</span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <MdFavoriteBorder className="w-5 h-5" />
                              <span>0</span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <MdOutlinePhone className="w-5 h-5" />
                              <span>0</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center text-gray-500 border-2 rounded-md px-6 py-2">
                            <MdChatBubbleOutline className="w-5 h-5" />
                            <span className="font-bold text-sm">0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-between mt-6 md:mt-2">
                    <span className="hidden md:block text-sm text-gray-500">
                      ID: {post.id}
                    </span>
                    <div className="flex gap-8 w-full md:w-fit items-center md:items-start justify-between md:justify-start">
                      <DarkButton width="w-full md:w-fit">Edytuj</DarkButton>
                      <DarkButton width="hidden md:block">Usuń</DarkButton>
                      <div className="md:hidden">
                        <MobileMoreContent
                          icon={<MdMoreHoriz className="w-8 h-8" />}
                        >
                          <div>Usuń</div>
                        </MobileMoreContent>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </SelectedAction>
        </div>
      )}
    </div>
  )
}

const PanelPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Panel użytkownika - OLX.pl</title>
        <meta
          name="description"
          content="Ogłoszenia - Sprzedam, kupię na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobilePageContainer>
        <MobilePanel />

        <BrowserContent>
          <div className="bg-white pt-8">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Twoje ogłoszenia</h1>

              <PanelNavigation />
            </div>
          </div>

          <div className="mt-4 container mx-auto">
            <PostsNavigation />
          </div>

          <PostsList status="ACTIVE" />
        </BrowserContent>
      </MobilePageContainer>

      <Footer mobile={false} />

      <MobileBottomNavigation />
    </>
  )
}

export default PanelPage
