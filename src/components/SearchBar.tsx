import { ChangeEvent, FormEvent, ReactNode, useRef } from "react"
import { FaSearch } from "react-icons/fa"

type SearchBarProps = {
  text: string
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void
  autoFocus?: boolean
  children?: ReactNode
}

const SearchBar = ({
  text,
  handleChange,
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  },
  autoFocus = false,
  children,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event)

    inputRef?.current?.blur()
  }

  return (
    <div className="bg-slate-100 sticky py-4 md:py-8 top-0 z-[999] md:relative">
      <div className="container mx-auto flex items-center">
        {children}
        <form className="w-full flex" onSubmit={onSubmit}>
          <div className="flex items-center bg-white rounded-l-md flex-1 p-2 py-3 md:py-5 border">
            <input
              type="string"
              enterKeyHint="search"
              placeholder="Znajdź coś dla siebie"
              className="w-full placeholder-primary-lg mx-4"
              value={text}
              onChange={handleChange}
              autoFocus={autoFocus}
              ref={inputRef}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white md:bg-white md:text-primary border border-l-0 md:hover:bg-primary md:hover:text-white transition-colors duration-200 ease-in-out px-4 rounded-r-md flex items-center gap-4"
          >
            <span className="font-bold hidden md:block">Szukaj</span>
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
  // return (
  //   <div className="bg-slate-100 sticky py-1 top-0 z-[999] md:relative">
  //     <div className="container mx-auto flex my-6">
  //       <div className="flex items-center bg-white rounded-l-md flex-1">
  //         <input placeholder="Znajdź coś dla siebie" className="mx-4 w-full" />
  //       </div>
  //       <div className="flex items-center justify-center bg-primary text-white p-4 rounded-r-md cursor-pointer">
  //         <FaSearch />
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default SearchBar
