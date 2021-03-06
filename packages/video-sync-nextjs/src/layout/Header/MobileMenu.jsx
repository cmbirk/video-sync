import React from 'react'
import PropTypes from 'prop-types'

const MobileMenu = ({ className, open }) =>
  (
  <div
    className={`${open ? 'block' : 'hidden'} ${className} sm:hidden`}
  >
    <div className="px-2 pt-2 pb-3">
      <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</a>
      <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Profile</a>
    </div>
  </div>
  )

MobileMenu.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
}

export default MobileMenu
