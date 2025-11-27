'use client'

import { ReactNode, useState } from 'react'
import { Text, Flex } from '@radix-ui/themes'
import { Eye, EyeOff } from 'lucide-react'

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?:
  | 'number'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'password'
  | 'tel'
  | 'url'
  | 'week'
  name?: string
  autoComplete?: string
  className?: string
  icon?: ReactNode
  prefix?: string
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  maxLength?: number
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  name,
  className = '',
  icon,
  prefix,
  readonly = false,
  error = false,
  errorMessage = '',
  autoComplete = 'off',
  maxLength,
  ...rest
}) => {
  const inputId = name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  const [showPassword, setShowPassword] = useState(false)
  const isPasswordType = type === 'password'
  const actualType = isPasswordType ? (showPassword ? 'text' : 'password') : type

  return (
    <Flex direction="column" gap="2">
      {label && (
        <Text
          as="label"
          htmlFor={inputId}
          className="font-sans font-normal text-[14px] text-[#0A0A0A]"
        >
          {label}
        </Text>
      )}
      <div
        className={`flex items-center min-h-[42px] w-full rounded-lg shadow-xs bg-[#F3F3F5] px-3 gap-2 ${className}`}
      >
        {icon && !prefix && <span className="text-[#99A1AF]">{icon}</span>}
        {icon && prefix && (
          <span className="flex items-center gap-1 text-[#717182] text-sm font-medium pr-2">
            {icon}
            {prefix}
          </span>
        )}
        {!icon && prefix && <span className="text-[#717182] text-sm font-medium pr-2">{prefix}</span>}
        <input
          id={inputId}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readonly}
          className="w-full bg-transparent outline-none text-sm text-[#717182] font-normal placeholder:text-[#717182] hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
          maxLength={maxLength}
          autoComplete={autoComplete}
          {...rest}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-[#99A1AF] focus:outline-none cursor-pointer"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-red-500 text-[12px] transition-all">{errorMessage}</p>
      )}
    </Flex>
  )
}

export default CommonInput
