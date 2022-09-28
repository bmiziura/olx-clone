import { ReactNode } from "react"

const BorderLink = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) => {
  return (
    <div
      className="font-bold border-b-2 border-primary cursor-pointer select-none"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default BorderLink
