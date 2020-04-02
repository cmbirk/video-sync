import React from 'react'

import BrokenLink from '@icons/brokenLink'

const SidebarHeader = ({ isConnected, roomId, title, toggleSidebar }) => {
  return (
    <div className="border-b flex justify-between">

      <button onClick={() => toggleSidebar()} className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      { isConnected ? null :
        (
          <div className="mt-3 pr-4 blinking">
            <BrokenLink />
          </div>
        )
      }
    </div>
  )
}

export default SidebarHeader
