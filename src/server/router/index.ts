// src/server/router/index.ts
import superjson from "superjson"
import { createRouter } from "./context"
import { likedPostsRouter } from "./subroutes/liked-posts"
import { postRouter } from "./subroutes/post"
import { searchRouter } from "./subroutes/search"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts", postRouter)
  .merge("likedPosts", likedPostsRouter)
  .merge("search", searchRouter)

// export type definition of API
export type AppRouter = typeof appRouter
