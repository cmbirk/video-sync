import React from 'react'

import Link from 'next/link'

const SignInLink = ({ className = ''}) => {
  return (
    <div className={`${className} flex flex-col mt-3`}>
      <Link href="/signin">
        <a
          className={`text-gray-300 cursor-pointer self-end`}
        >Sign In</a>
      </Link>
    </div>
  )
}

export default SignInLink
