import Footer from "@/components/Footer"
import { BrowserContent } from "@/components/ui/layout/LayoutContent"
import Loader from "@/components/ui/Loader"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import MobileHeader from "@/components/ui/mobile/MobileHeader"
import TabNavigation from "@/components/ui/TabNavigation"
import { trpc } from "@/utils/trpc"
import { NextPage } from "next"
import Head from "next/head"

const LikedPostsList = () => {
  const { data, isLoading, isRefetching, refetch } = trpc.useQuery(
    ["likedPosts:getAll"],
    {
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading || isRefetching) {
    return (
      <div className="min-h-[640px] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-[640px]">
      {data?.map((likedPost) => {
        const { slug, title, city, price } = likedPost.post
        return <div key={likedPost.id}>{title}</div>
      })}
    </div>
  )
}

const LikedContentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ogłoszenia - Sprzedam, kupię na OLX.pl</title>
        <meta
          name="description"
          content="Ogłoszenia - Sprzedam, kupię na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MobileHeader title="Obserwowane ogłoszenia" />

        <BrowserContent>
          <div className="bg-white pt-8">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">
                Twoje obserwowane ogłoszenia
              </h1>

              <TabNavigation
                items={[
                  {
                    name: "Obserwowane ogłoszenia (0/150)",
                    href: "/obserwowane",
                  },
                ]}
              />
            </div>
          </div>
        </BrowserContent>

        <LikedPostsList />
      </main>

      <Footer />

      <MobileBottomNavigation />
    </>
  )
}

export default LikedContentPage
