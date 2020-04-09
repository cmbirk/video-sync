import React from 'react'

import Link from 'next/link'

const SignInLink = () => {
  return (
    <Link href="/signin">
      <a
        className="text-white cursor-pointer"
      >Sign In</a>
    </Link>
  )
}

export default SignInLink
