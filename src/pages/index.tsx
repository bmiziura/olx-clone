import type { NextPage } from "next"
import Head from "next/head"

import Warning from "@/components/ui/Warning"
import { fetchCategories } from "@/server/db/categories"

import { CategoryList } from "@/components/CategoryList"
import Footer from "@/components/Footer"
import SearchBar from "@/components/SearchBar"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import useDebounce from "@/hooks/useDebounce"
import { Category } from "@prisma/client"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

interface HomePageProps {
  categories: Category[]
}

const HomeSearchBar = () => {
  const router = useRouter()

  const { searchFromSubmit = true } = router.query

  const [text, setText] = useState("")

  const debouncedValue = useDebounce(text, 1000)

  const redirectToSearch = (value: string, fromSubmit: boolean = false) => {
    router.push({
      pathname: "/search",
      query: {
        searchText: text,
        fromSubmit: fromSubmit,
      },
    })
  }

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 0) {
      redirectToSearch(debouncedValue)
    }
  }, [debouncedValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <SearchBar
      text={text}
      autoFocus={searchFromSubmit !== "true"}
      handleChange={handleChange}
      handleSubmit={(event) => {
        event.preventDefault()

        redirectToSearch(text, true)
      }}
    />
  )
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

      <HomeSearchBar />

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
