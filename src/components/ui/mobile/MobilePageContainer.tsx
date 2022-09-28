import { ReactNode } from "react"

const MobilePageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-white md:min-h-0 md:bg-transparent">
      <main className="h-full">{children}</main>
    </div>
  )
}

export default MobilePageContainer
