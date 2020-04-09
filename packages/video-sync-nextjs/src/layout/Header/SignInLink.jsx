import React from 'react'
import PropTypes from 'prop-types'

import UserContext from '@contexts/UserContext'

const SignInLink = ({ className = '' }) =>
  (
    <div className={`${className} flex flex-col mt-3`}>
      <UserContext.Consumer>
      { ({ user, login }) => {
        return (
          <a
            className={'text-gray-300 cursor-pointer self-end'}
            onClick={() =>
              login()}
          >Sign In</a>
        )
      }}
      </UserContext.Consumer >
    </div>
  )

SignInLink.propTypes = {
  className: PropTypes.string,
}

export default SignInLink
