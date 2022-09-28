import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

type Action = {
  icon: ReactElement
  name: string
  onAction: (items: SelectItem[]) => void
}

export const SelectedContext = createContext<{
  items?: SelectItem[]

  setItems?: Dispatch<SetStateAction<SelectItem[]>>
}>({})

type SelectItem = {
  id: string
  selected: boolean
}

const SelectedAction = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<SelectItem[]>([])

  return (
    <SelectedContext.Provider value={{ items, setItems }}>
      <>
        <div className="flex gap-4 items-center mt-4">
          <input
            type="checkbox"
            className="w-6 h-6 accent-primary text-gray-500"
          />
          <span className="text-gray-500 text-sm">
            Zaznacz ogłoszenia, dla których chcesz wykonać akcję.
          </span>
        </div>

        {children}
      </>
    </SelectedContext.Provider>
  )
}

export default SelectedAction
