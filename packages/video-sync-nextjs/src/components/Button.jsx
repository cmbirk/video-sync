import React from 'react'

const sizes = {
  default: 'py-3 px-8',
  lg: 'py-4 px-12',
  xl: 'py-5 px-16 text-lg',
}

const Button = ({
  alt, children, className = '', onClick, size = 'default',
}) => (
    <button
      type="button"
      onClick={onClick}
      alt={alt}
      className={`
        ${sizes[size]}
        ${className}
        bg-primary
        hover:bg-primary-darker
        rounded
        text-white
      `}
    >
      {children}
    </button>
)

export default Button
