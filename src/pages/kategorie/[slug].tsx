import Footer from "@/components/Footer"
import PostList from "@/components/PostList"
import SearchBar from "@/components/SearchBar"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import { NextPage } from "next"
import Head from "next/head"

type Props = {}

const CategoryPostsPage: NextPage<Props> = ({}) => {
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

      <main className="container mx-auto">
        <SearchBar />
        <PostList />
      </main>

      <Footer showBusiness={false} mobile={false} />

      <MobileBottomNavigation />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const { slug } = context.query

  console.log(slug)
  //   const categories = await fetchCategories()

  return {
    props: {
      //   categories,
    },
  }
}

export default CategoryPostsPage
