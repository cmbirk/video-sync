import React from 'react'
import PropTypes from 'prop-types'
// import Footer from './Footer'
import Header from '@layout/Header'

const Layout = ({ children, hasSidebar = false }) =>
  (
    <>
      <Header />
      <div
        id="wrapper"
        className="container mx-auto flex flex-col relative justify-center py-10 bg-gray-200">
        <main className="text-gray-900 mb-4">{children}</main>
      </div>
    </>
  )

Layout.propTypes = {
  children: PropTypes.node,
  hasSidebar: PropTypes.bool,
}

export default Layout
