import React from 'react'
// import Footer from './Footer'
// import Header from './Header'

const Layout = ({ children }) => (
  <div id="wrapper" className="container mx-auto flex flex-col min-h-screen relative justify-center">
    {/* <Header /> */}
    <main className="text-gray-900 mb-4">{children}</main>
    {/* <Footer /> */}
  </div>
)

export default Layout
