import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Skip from '@icons/skip'

const closedClasses = 'w-8 cursor-pointer hover:bg-gray-500 hover:border-right'

const Sidebar = ({ className }) => {
  const [open, setOpen] = useState(true)

  const handleSidebarClick = () => {
    console.log(open)
    if (open) return false

    return setOpen(true)
  }

  return (
    <>
    <div className="relative">
      <div className="top-0 right-0 absolute">
        {open
          ? (
            <button onClick={() =>
              setOpen(false)} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
              <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : null
        }
      </div>
      <div
        className={`${className} ${open ? 'flex-1 px-10' : closedClasses} cursor bg-gray-400 min-h-full left-0`}
        onClick={() =>
          handleSidebarClick()}
      >
        <div className="pt-4">
          <a
            className={`${open ? 'hidden' : ''}`}
            onClick={() =>
              setOpen(true)}>
            <Skip
              className="mx-auto"
            />
          </a>
        </div>
        <div className={`${open ? '' : 'hidden'}`}>
          Sidebar Content
        </div>
      </div>
    </div>
    </>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
}

export default Sidebar
