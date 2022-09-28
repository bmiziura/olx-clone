import { ReactNode } from "react"

import { FiX } from "react-icons/fi"

const ModalWindow = ({
  closed,
  closeWindow,
  children,
}: {
  closed: any
  closeWindow: any
  children: ReactNode
}) => {
  return (
    <div
      className={`${
        closed ? "hidden" : "block"
      } top-0 left-0 fixed w-screen h-screen z-[999999]`}
    >
      <div
        className="bg-black w-full h-full absolute opacity-50"
        onClick={() => closeWindow()}
      ></div>
      <div className="relative top-0 left-0 flex justify-center mt-8">
        <div className="relative bg-white p-4">
          <div
            className="absolute right-0 mr-8 cursor-pointer"
            onClick={() => closeWindow()}
          >
            <FiX className="w-8 h-8" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWindow
