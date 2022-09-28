import { CategoryList } from "@/components/CategoryList"
import Footer from "@/components/Footer"
import MobileCategoryList from "@/components/MobileCategoryList"
import {
  BrowserContent,
  MobileContent,
} from "@/components/ui/layout/LayoutContent"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import MobileHeader from "@/components/ui/mobile/MobileHeader"
import MobilePageContainer from "@/components/ui/mobile/MobilePageContainer"
import { fetchCategories } from "@/server/db/categories"
import { Category } from "@prisma/client"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

type Props = {
  categories: Category[]
}

const CategoriesPage: NextPage<Props> = ({ categories }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Lista kategorii - OLX.PL</title>
        <meta
          name="description"
          content="Ogłoszenia - Sprzedam, kupię na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobilePageContainer>
        <MobileHeader title="Wybierz kategorię" />

        <MobileContent>
          <MobileCategoryList categories={categories} />
        </MobileContent>

        <BrowserContent>
          <CategoryList categories={categories} />
        </BrowserContent>
      </MobilePageContainer>

      <Footer showBusiness={false} mobile={false} />

      <MobileBottomNavigation />
    </>
  )
}

export const getServerSideProps = async () => {
  const categories = await fetchCategories()

  return {
    props: {
      categories,
    },
  }
}

export default CategoriesPage
