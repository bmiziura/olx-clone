import { MouseEventHandler, ReactNode } from "react"

interface ButtonProps {
  padding?: string
  width?: string
  type?: any
  border?: boolean
  onClick?: MouseEventHandler<any>
  children: ReactNode
}

export const WhiteButton = ({
  padding = "",
  type,
  width = "w-fit",
  border = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${
        padding || "p-1 px-3"
      } group bg-white text-primary rounded-sm font-bold ${width} cursor-pointer md:hover:bg-primary md:hover:text-white transition-colors duration-500 select-none ${
        border ? `border-2 border-primary` : "border-[6px] border-white"
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const SemiDarkButton = ({
  padding = "",
  type,
  width = "w-fit",
  border = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${
        padding || "p-1 px-3"
      } group bg-primary-lg text-white rounded-sm font-bold ${width} cursor-pointer md:hover:bg-transparent md:hover:text-white transition-colors duration-500 select-none ${
        border ? "border-2 border-white" : "border-[4px] border-primary-lg"
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const DarkButton = ({
  padding = "",
  type,
  width = "w-fit",
  border = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${
        padding || "p-1 px-3"
      } group bg-primary text-white rounded-sm font-bold ${width} cursor-pointer md:hover:bg-white md:hover:text-primary transition-colors duration-500 select-none ${
        border ? "border-2 border-white" : "border-[6px] border-primary"
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
