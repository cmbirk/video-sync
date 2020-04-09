import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

const SignInLink = ({ className = '' }) =>
  (
    <div className={`${className} flex flex-col mt-3`}>
      <Link href="/signin">
        <a
          className={'text-gray-300 cursor-pointer self-end'}
        >Sign In</a>
      </Link>
    </div>
  )

SignInLink.propTypes = {
  className: PropTypes.string,
}

export default SignInLink
