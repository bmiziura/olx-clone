import {
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react"

export const Input = ({
  id,
  type = "text",
  label,
  placeholder,
  error = "",
  width = "max-w-fit",
  value,
  onChange,
  pattern,
  disabled = false,
  children,
}: {
  id: string
  type?: string
  label?: string
  placeholder?: string
  error?: string
  width?: string
  value: any
  onChange?: React.ChangeEventHandler<any>
  pattern?: string
  disabled?: boolean
  children?: ReactNode
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}
      <div className={`group relative h-fit ${width}`}>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`bg-gray-100 placeholder:text-primary-lg py-3 px-5 rounded-md w-full flex border-b-2 valid:focus:border-primary placeholder-shown:required:border-b-0 invalid:border-red-500 placeholder-shown:required:focus:border-b-2 focus:rounded-b-none outline-none peer disabled:cursor-not-allowed`}
          autoComplete="off"
          tabIndex={-1}
          required
          pattern={pattern}
          disabled={disabled}
        />

        <div className="hidden peer-placeholder-shown:peer-required:peer-focus-within:block text-red-500 text-sm">
          Musisz uzupełnić to pole!
        </div>

        {error && (
          <div className="peer-placeholder-shown:hidden peer-valid:hidden text-red-500 text-sm">
            {error}
          </div>
        )}

        {children && (
          <div className="hidden md:group-focus-within:block absolute right-0 top-0 translate-x-[105%] w-fit max-w-[350px] z-[99999] overflow-x-hidden">
            <div className="bg-blue-400 p-2 text-[0.7rem] leading-[0.95rem] text-white">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const TextArea = ({
  id,
  label,
  placeholder,
  error = "",
  width = "max-w-fit",
  height = "max-h-fit",
  value,
  onChange,
  maxLength,
  minLength,
  children,
}: {
  id: string
  type?: string
  label?: string
  placeholder?: string
  error?: string
  width?: string
  height?: string
  value: any
  onChange?: ChangeEventHandler<any>
  maxLength?: number
  minLength?: number
  children?: ReactNode
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}
      <div className={`group relative h-fit ${width}`}>
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`bg-gray-100 ${height} placeholder:text-primary-lg py-3 px-5 rounded-md w-full flex border-b-2 valid:focus:border-primary placeholder-shown:required:border-b-0 invalid:border-red-500 placeholder-shown:required:focus:border-b-2 focus:rounded-b-none outline-none peer resize-none disabled:cursor-not-allowed`}
          autoComplete="off"
          tabIndex={-1}
          maxLength={maxLength}
          minLength={minLength}
          required
        />

        <div className="hidden peer-placeholder-shown:peer-required:peer-focus-within:block text-red-500 text-sm">
          Musisz uzupełnić to pole!
        </div>

        {error && (
          <div className="peer-placeholder-shown:hidden peer-valid:hidden text-red-500 text-sm">
            {error}
          </div>
        )}

        {children && (
          <div className="hidden group-focus-within:block absolute right-0 top-0 translate-x-[105%] w-fit max-w-[350px]">
            <div className="bg-blue-400 p-2 text-[0.7rem] leading-[0.95rem] text-white">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const SelectInput = ({
  id,
  label,
  value,
  onChange,
  onClick,
  width = "max-w-fit",
  placeholder,
  children,
}: {
  id: string
  label?: string
  value: any
  onChange?: ChangeEventHandler<any>
  onClick?: MouseEventHandler<any>
  placeholder?: string
  width?: string
  children?: ReactNode
}) => {
  return (
    <div className="flex flex-col gap-1" onClick={onClick}>
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}

      <div className={`group relative h-fit ${width}`}>
        <div className="bg-gray-100 py-3 px-5 rounded-md">
          <select
            id={id}
            name={id}
            placeholder={placeholder}
            className="bg-gray-100"
            onChange={onChange}
            value={value}
            onClick={(event: MouseEvent) => {
              event.preventDefault()
            }}
          >
            {children}
          </select>
        </div>
      </div>
    </div>
  )
}
