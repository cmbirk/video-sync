import React, { useState } from 'react'

import { getCurrentUser } from '@services/firebase'
// import Link from 'next/link'

import HomeIcon from '@icons/home'
import HeaderProfile from './HeaderProfile'
import MobileMenu from './MobileMenu'
import SignInLink from './SignInLink'

const Header = () => {
  const [open, setOpen] = useState(false)

  const currentUser = getCurrentUser()

  return (
  <>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              onClick={() =>
                setOpen(!open)
              }
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  className={`${open ? 'hidden' : 'inline-flex'}`}
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  className={`${open ? 'inline-flex' : 'hidden'}`}
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between items-stretch">
            <div className="hidden sm:block sm:ml-6 flex-1">
              <div className="flex">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</a>
                <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Profile</a>
              </div>
            </div>
            <div className="flex flex-col text-gray-300 self-center flex-1">
              <HomeIcon
                className="self-center"
              />
              <h1 className="self-center">Stuck Inside</h1>
            </div>
            <SignInLink
              className="flex-1 flex content-end"
            />
          </div>
          <HeaderProfile
            className={`${!currentUser ? 'hidden' : ''}`}
          />

        </div>
      </div>
      <MobileMenu
        open={open}
      />
    </nav>
  </>
  )
}

export default Header
