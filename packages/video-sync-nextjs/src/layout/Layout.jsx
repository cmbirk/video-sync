import React from 'react'
import PropTypes from 'prop-types'
// import Footer from './Footer'
import Header from '@layout/Header'

const Layout = ({ children }) =>
  (
    <>
      <Header />
      <div id="wrapper" className="container mx-auto flex flex-col relative justify-center">
        {/* <Header /> */}
        <main className="text-gray-900 mb-4">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  )

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
