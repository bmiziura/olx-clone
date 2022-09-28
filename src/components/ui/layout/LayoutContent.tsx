import React, { ReactNode } from "react"

interface ContentProps {
  children: ReactNode
}

export const MobileContent = ({ children }: ContentProps) => {
  return <div className="block md:hidden">{children}</div>
}

export const BrowserContent = ({ children }: ContentProps) => {
  return <div className="hidden md:block">{children}</div>
}
