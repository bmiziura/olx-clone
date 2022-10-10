import { trpc } from "@/utils/trpc"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

function useLike(id: string) {
  const { data } = useSession()

  const { data: likedData, refetch } = trpc.useQuery(
    ["likedPosts:isLiked", id],
    {
      refetchOnWindowFocus: false,
    }
  )

  const { data: mutateData, mutate: likePost } = trpc.useMutation(
    "likedPosts:updatePostLike"
  )

  useEffect(() => {
    refetch()
  }, [mutateData])

  const router = useRouter()

  const likePostHandler = async () => {
    if (!data?.user) {
      router.push("/login")
      return
    }

    await likePost(id)
  }

  return {
    isLiked: likedData?.isLiked ?? false,
    likePost: likePostHandler,
  }
}

export default useLike
