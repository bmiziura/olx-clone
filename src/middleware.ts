import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.url.includes("/admincp")) {
          return token?.role === "ADMIN"
        }

        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/mojolx/:path*", "/admincp/:path*", "/obserwowane/:path*"],
}
