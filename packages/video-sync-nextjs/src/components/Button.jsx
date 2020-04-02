import React from 'react'

import PropTypes from 'prop-types'

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

Button.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
}

export default Button
