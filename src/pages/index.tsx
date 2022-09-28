import type { NextPage } from "next"
import Head from "next/head"

import Warning from "@/components/ui/Warning"
import { fetchCategories } from "@/server/db/categories"

import { CategoryList } from "@/components/CategoryList"
import Footer from "@/components/Footer"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import { Category } from "@prisma/client"

interface HomePageProps {
  categories: Category[]
}

const Home: NextPage<HomePageProps> = ({ categories }) => {
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
        <Warning text="Nigdy nie podawaj danych karty bankowej, aby otrzymać pieniądze za przedmiot sprzedany z przesyłką OLX!" />

        <CategoryList categories={categories} />
      </main>

      <Footer showBusiness={true} />

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

export default Home
