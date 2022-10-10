import Footer from "@/components/Footer"
import PostList from "@/components/PostList"
import SearchBar from "@/components/SearchBar"
import useDebounce from "@/hooks/useDebounce"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FaChevronLeft } from "react-icons/fa"

export type SearchOptions = {
  text: string
  category: string
}

const SearchPage: NextPage = () => {
  const router = useRouter()

  const { searchText = "", fromSubmit = false, category = "all" } = router.query

  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    text: searchText as string,
    category: category as string,
  })

  const debouncedOptions = useDebounce<SearchOptions>(searchOptions, 1000)

  const updateSearchPath = (options: SearchOptions, fromSubmit: boolean) => {
    router.push(
      {
        pathname: "/search",
        query: {
          searchText: options.text,
          fromSubmit,
          category: category,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    updateSearchPath(debouncedOptions, false)
  }, [debouncedOptions])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchOptions({ ...searchOptions, text: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updateSearchPath(searchOptions, true)
  }

  return (
    <>
      <Head>
        <title>Wyszukiwanie ogłoszeń - Sprzedam, kupię na OLX.pl</title>
        <meta
          name="description"
          content="Ogłoszenia - Sprzedam, kupię na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SearchBar
          text={searchOptions.text}
          autoFocus={fromSubmit !== "true"}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        >
          <Link href="/">
            <a className="pr-4 cursor-pointer md:hidden">
              <FaChevronLeft className="w-6 h-6" />
            </a>
          </Link>
        </SearchBar>

        <PostList
          searchOptions={debouncedOptions}
          setSearchOptions={setSearchOptions}
        />
      </main>

      <Footer showBusiness={false} mobile={true} />
    </>
  )
}

export default SearchPage
