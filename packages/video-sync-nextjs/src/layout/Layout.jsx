import React from 'react'
import PropTypes from 'prop-types'

import Header from '@layout/Header'
import { Sidebar } from '@components'

const Layout = ({ children, hasSidebar = false }) =>
  (
    <>
      <Header />
      <div
        id="wrapper"
        className="pt-16 w-full flex flex-row relative justify-start bg-gray-200"
      >
        <Sidebar
          className={`${hasSidebar ? '' : 'hidden'}`}
        />
        <main className="text-gray-900 mb-4 p-10">
          {children}
        </main>
      </div>
    </>
  )

Layout.propTypes = {
  children: PropTypes.node,
  hasSidebar: PropTypes.bool,
}

export default Layout
