import Image from "next/image"
import { useState } from "react"
import { FiX } from "react-icons/fi"

import WarningIcon from "@/public/images/icons/warning.svg"

const Warning = ({ text }: { text: string }) => {
  const [closed, setClosed] = useState<boolean>(false)

  if (closed) return <></>

  return (
    <div className="container mx-auto my-6 bg-yellow-50">
      <div className="flex gap-4 justify-between items-center px-4 py-2">
        <div className="flex gap-4 items-center">
          <div className="relative h-8 w-8">
            <Image src={WarningIcon} alt="ErrorIcon" layout="fill" />
          </div>
          <span className="text-sm">{text}</span>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setClosed(true)
          }}
        >
          <FiX className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

export default Warning
