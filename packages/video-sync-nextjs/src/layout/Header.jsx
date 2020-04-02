import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

const Header = () => (
  <>
  <header className="sticky top-0 bg-white">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8 absolute">
      <Link href="/">
        <a>
          <div className="flex items-center text-2xl">
            <span className="text-black">Power Hour 🍻</span>
          </div>
        </a>
      </Link>
      <div className="flex mt-4 sm:mt-0 text-center hidden lg:block">
      </div>
    </div>
  </header>
  </>
)

export default Header
