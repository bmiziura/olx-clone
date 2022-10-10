import { SearchOptions } from "@/pages/search"

import { trpc } from "@/utils/trpc"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { MdFavoriteBorder } from "react-icons/md"
import { DarkButton } from "./ui/buttons/Button"

const PostCard = ({ post }: { post: any }) => {
  return (
    <Link href={`/oferta/${post.slug}`}>
      <a>
        <article className="bg-white p-4 rounded-md">
          <div className="flex gap-8">
            <div className="w-64 aspect-video bg-gray-800 text-white">Logo</div>
            <div className="flex flex-col justify-between w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg link">{post.title}</h2>
                <span className="font-bold">{post.price} zł</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-lg">{post.city}</span>

                <div className="group flex items-center gap-2">
                  <span className="hidden text-sm group-hover:block">
                    Obserwuj
                  </span>
                  <MdFavoriteBorder />
                </div>
              </div>
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

const PostFilters = ({
  searchOptions,
  setSearchOptions,
}: {
  searchOptions?: SearchOptions
  setSearchOptions?: Dispatch<SetStateAction<SearchOptions>>
}) => {
  return <div></div>
}

const PostList = ({
  searchOptions,
  setSearchOptions,
}: {
  searchOptions: SearchOptions
  setSearchOptions: Dispatch<SetStateAction<SearchOptions>>
}) => {
  const { data, isLoading, isRefetching, isError, refetch } = trpc.useQuery(
    ["search:searchPosts", { searchText: searchOptions.text }],
    {
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading || isRefetching) {
    return (
      <div className="container mx-auto">
        <PostFilters />
        <div className="mt-4 flex items-center justify-center">
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
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div className="container mx-auto">
        <PostFilters
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />

        <div className="mt-4 flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold">Wystąpił błąd!</h3>
            <span>
              Po stronie serwera wystąpił błąd! Spróbuj ponownie później!
            </span>
          </div>

          <DarkButton onClick={() => refetch()}>Spróbuj jeszcze raz</DarkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <PostFilters />
      <div className="flex flex-col gap-4">
        {!data || data.length <= 0 ? (
          <div className="flex flex-col items-center gap-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              viewBox="0 0 180 180"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="#002F34"
                  d="M106.527 120.752l-17.874-8.265 2.685-5.807 17.874 8.264zM43.558 82.6C28.18 75.49 9.95 82.192 2.84 97.57c-7.11 15.378-.407 33.608 14.97 40.72 15.379 7.11 33.61.407 40.72-14.971 7.11-15.378.407-33.608-14.97-40.719m-7.95 17.19c5.875 2.717 8.445 9.706 5.728 15.581-2.716 5.875-9.705 8.444-15.58 5.727-5.875-2.716-8.444-9.705-5.728-15.58 2.716-5.874 9.705-8.444 15.58-5.728"
                />
                <path
                  fill="#002F34"
                  d="M126.855 121.114c-15.378-7.11-33.609-.408-40.719 14.97-7.11 15.378-.408 33.608 14.97 40.719 15.378 7.11 33.608.408 40.718-14.97 7.11-15.378.408-33.608-14.97-40.719m-7.948 17.19c5.875 2.716 8.445 9.706 5.728 15.58-2.716 5.876-9.705 8.445-15.58 5.729-5.874-2.716-8.444-9.706-5.728-15.58 2.717-5.876 9.706-8.445 15.58-5.729"
                />
                <path
                  fill="#2A65EA"
                  d="M79.836 128.838l29.942 13.845-2.981-32.853-26.961 19.008zM68.778 73.505l1.197 9.06 37.788 17.473.013-.01 5.853 2.707 4.146 45.696-5.27 3.716-36.383-16.822-6.574.868-5.882-44.526-30.752 21.632-4.284-6.09 33.936-23.871-1.17-8.858 7.382-.975zm2.351 17.798l4.176 31.619 25.43-17.93-29.606-13.69z"
                />
                <path
                  fill="#23E5DB"
                  d="M64.972 129.388l16.65 7.699-3.572 7.724-16.65-7.698 3.572-7.725z"
                />
                <path
                  fill="#002F34"
                  d="M58.638 71.925a6.283 6.283 0 1112.372-2.197 6.283 6.283 0 01-12.372 2.197m63.301 32.455l-20.8-9.617 3.126-6.758 20.8 9.617z"
                />
                <path
                  fill="#FF4134"
                  d="M57.509 137.551a21.356 21.356 0 00-3.712-.33c-11.73 0-21.237 9.508-21.237 21.236 0 11.73 9.508 21.237 21.237 21.237 1.267 0 2.506-.117 3.712-.33-5.157-5.454-8.326-12.808-8.326-20.907 0-8.098 3.169-15.452 8.326-20.906"
                />
                <path
                  fill="#FFD6C9"
                  d="M75.033 158.457c0-10.461-7.567-19.148-17.525-20.906-5.156 5.454-8.325 12.808-8.325 20.906 0 8.099 3.169 15.453 8.325 20.906 9.958-1.756 17.525-10.444 17.525-20.906"
                />
                <path
                  fill="#23E5DB"
                  d="M154.789 25.887l-47.727 19.068-4.819 11.23 38.42 60.66 12.515-5 14.281-5.706 12.515-5-13.954-70.433z"
                />
                <path
                  fill="#CBF7EE"
                  d="M102.243 56.186l38.42 60.66-.842-84.979-32.76 13.088z"
                />
                <path
                  fill="#002F34"
                  d="M54.276 14.682l38.91-12.945 12.944 38.91z"
                />
                <path
                  fill="#002F34"
                  d="M92.608 0l2.316 1.16 12.944 38.91-2.558 2.215L53.455 16.32l.243-3.375L92.608 0z"
                />
                <path
                  fill="#F8DD3E"
                  d="M89.682 73.496L37.827 47.53l15.72-31.392 51.855 25.965z"
                />
                <path
                  fill="#002F34"
                  d="M68.418 40.781a6.18 6.18 0 11-11.053-5.535 6.182 6.182 0 0111.053 5.535m18.468 9.249a6.182 6.182 0 01-11.054-5.536 6.183 6.183 0 0111.054 5.535"
                />
                <path
                  fill="#002F34"
                  d="M59.584 58.424L48.53 52.89l8.835-17.643 11.053 5.535z"
                />
              </g>
            </svg>
            <div>
              <h2 className="text-3xl font-bold">Brak ogłoszeń</h2>
              <p className="text-lg">
                Nie udało się tam znaleźć żadnego ogłoszenia, które pasuje do
                Twojego wyszukiwania!
              </p>
            </div>
          </div>
        ) : (
          data?.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

export default PostList
