import useLike from "@/hooks/useLike"
import { Post } from "@prisma/client"
import Link from "next/link"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"

const RecentPostItem = ({ post }: { post: Post }) => {
  const { likePost, isLiked } = useLike(post.id)

  return (
    <article className="bg-white rounded-md p-4">
      <Link href={`/oferta/${post.slug}`}>
        <a>
          <div className="w-full aspect-video bg-gray-800 text-white">Logo</div>
          <h3 className="mt-4 link break-all text-lg w-fit">{post.title}</h3>
        </a>
      </Link>
      <div className="flex justify-between items-end mt-4">
        <div className="flex flex-col">
          <span className="text-sm">{post.city}</span>
          <span className="font-bold">{post.price} zł</span>
        </div>
        <div className="cursor-pointer" onClick={likePost}>
          {isLiked ? (
            <MdFavorite className="w-6 h-6" />
          ) : (
            <MdFavoriteBorder className="w-6 h-6" />
          )}
        </div>
      </div>
      {/* <div className="mt-4 flex flex-col justify-between">
        <div>
          <span className="text-sm">{post.city}</span>
          <span className="font-bold">{post.price} zł</span>
        </div>
      </div> */}
    </article>
  )
}

const RecentPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">Wybrane dla Ciebie</h1>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <RecentPostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default RecentPosts
