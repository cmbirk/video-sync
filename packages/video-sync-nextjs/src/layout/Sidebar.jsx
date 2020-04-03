import React from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'

import { Username } from '@components'

const Sidebar = ({
  canReset,
  handleUpdateUsername,
  isHost,
  resetVideoUrl,
  roomId,
  sidebarOpen,
  toggleSidebar,
  users,
}) => (
    <>
      {/* <!-- Off-canvas menu for mobile --> */}
      <div className={`${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 z-30 transition-opacity ease-linear duration-300">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <div className="fixed inset-0 flex z-40">
          <div x-show="sidebarOpen" className="flex-1 flex flex-col max-w-xs w-full bg-white transform ease-in-out duration-300 ">
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                onClick={() => toggleSidebar()}
                x-show="sidebarOpen"
                aria-label="Close sidebar"
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
              >
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="italic">Room Id: <br /><span className="text-xs italic text-gray-600">{roomId}</span></span>
              </div>
              <nav className="mt-5 px-2">
                <Link href="/">
                  <a className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                    <svg className="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"/>
                    </svg>
                    Home
                  </a>
                </Link>
                <span className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                  <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  Host: {isHost ? '✅' : '🚫'}
                    { canReset
                      ? (<a
                          className="cursor-pointer text-xs italic ml-4"
                          onClick={() => {
                            resetVideoUrl()
                            toggleSidebar()
                          }}
                        >Reset Video Url</a>
                      )
                      : null
                   }
                </span>
                <div className="mt-1 group flex flex-col px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                  <div>Users ({ Object.keys(users).length }):</div>
                  <div>
                    <ul>
                      { Object.keys(users).map((id) => (
                        <li key={id}>{users[id]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Username
                handleUpdateUsername={handleUpdateUsername}
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* <!-- Force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>
    </>
)

Sidebar.propTypes = {
  canReset: PropTypes.bool,
  isHost: PropTypes.bool,
  resetVideoUrl: PropTypes.func,
  roomId: PropTypes.string,
  sidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
}

export default Sidebar
