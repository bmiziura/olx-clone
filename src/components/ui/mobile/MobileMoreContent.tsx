import { ReactElement, ReactNode, useState } from "react"

const MobileMoreContent = ({
  icon,
  children,
}: {
  icon: ReactElement
  children: ReactNode
}) => {
  const [isOpened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(!isOpened)
  }

  return (
    <div className="relative">
      <div onClick={handleOpen} className="cursor-pointer">
        {icon}
      </div>
      <div
        className={`${
          isOpened ? "absolute" : "hidden"
        } bg-white shadow-md translate-x-[-50%] px-2 py-1 rounded-sm w-max`}
      >
        {children}
      </div>
    </div>
  )
}

export default MobileMoreContent
