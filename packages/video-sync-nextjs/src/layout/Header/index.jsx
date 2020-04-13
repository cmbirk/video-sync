import React, { useState } from 'react'
import Link from 'next/link'

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
    <nav className="bg-gray-800 fixed z-20 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between items-stretch">
            <div className="flex flex-col text-gray-300 self-center flex-shrink">
              <Link href="/">
                <a>
                  <HomeIcon
                    className="self-center"
                  />
                  <h1 className="self-center">Stuck Inside</h1>
                </a>
              </Link>
            </div>
            <SignInLink
              className={`${currentUser ? 'hidden' : ''} flex-1 flex content-end`}
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
