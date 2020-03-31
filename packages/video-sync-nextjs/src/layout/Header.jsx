import React from 'react'

import Link from 'next/Link'

const Header = () => (
  <header className="sticky top-0 bg-white shadow">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
      <Link href="/">
        <a>
          <div className="flex items-center text-2xl">
            <span className="text-black">Happy Hour 🍻</span>
          </div>
        </a>
      </Link>
      <div className="flex mt-4 sm:mt-0 text-center hidden lg:block">
      </div>
    </div>
  </header>
)

export default Header
