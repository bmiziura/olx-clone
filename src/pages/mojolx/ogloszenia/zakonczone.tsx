import Footer from "@/components/Footer"
import { BrowserContent } from "@/components/ui/layout/LayoutContent"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import MobileHeader from "@/components/ui/mobile/MobileHeader"
import { NextPage } from "next"
import Head from "next/head"

import { PanelNavigation, PostsList, PostsNavigation } from ".."

const EndedPage: NextPage = () => {
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

      <main>
        <MobileHeader title="Zakończone ogłoszenia" />

        <BrowserContent>
          <div className="bg-white pt-8">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Zakończone ogłoszenia</h1>

              <PanelNavigation />
            </div>
          </div>

          <div className="mt-4 container mx-auto">
            <PostsNavigation />
          </div>
        </BrowserContent>

        <PostsList status="ENDED" />
      </main>

      <Footer mobile={false} />

      <MobileBottomNavigation />
    </>
  )
}

export default EndedPage
