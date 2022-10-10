import { Post } from "@prisma/client"

const RecentPostItem = ({ post }: { post: Post }) => {
  return <article className="basis-full bg-white">{post.title}</article>
}

const RecentPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">Wybrane dla Ciebie</h1>

      <div className="mb-8 grid grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <RecentPostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default RecentPosts
