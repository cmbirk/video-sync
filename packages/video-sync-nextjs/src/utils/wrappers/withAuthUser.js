/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'
import { get, set } from 'lodash/object'
import { AuthUserInfoContext, useFirebaseAuth } from '@utils/auth/hooks'
import { createAuthUser, createAuthUserInfo } from '@utils/auth/user'

export default (ComposedComponent) => {
  const WithAuthUserComp = (props) => {
    const { AuthUserInfo, ...otherProps } = props

    const { user: firebaseUser } = useFirebaseAuth()
    const AuthUserFromClient = createAuthUser(firebaseUser)
    const { AuthUser: AuthUserFromSession, token } = AuthUserInfo
    const AuthUser = AuthUserFromClient || AuthUserFromSession || null

    return (
      <AuthUserInfoContext.Provider value={{ AuthUser, token }}>
        <ComposedComponent { ...otherProps } />
      </AuthUserInfoContext.Provider>
    )
  }

  WithAuthUserComp.getInitialProps = async (ctx) => {
    const { req, res } = ctx

    let AuthUserInfo

    // If server side rendering
    if (typeof window === 'undefined') {
      // If server-side, get AuthUserInfo from the session in the request.
      // Don't include server middleware in the client JS bundle
      const { addSession } = require('@utils/middleware/cookieSession')
      addSession(req, res)
      AuthUserInfo = createAuthUserInfo({
        firebaseUser: get(req, 'session.decodedToken', null),
        token: get(req, 'session.token', null),
      })
    } else {
      // If client side, get AuthUserInfo from stored data
      try {
        const jsonData = JSON.parse(
          window.document.getElementById('__MY_AUTH_USER_INFO').textContent,
        )

        if (jsonData) {
          AuthUserInfo = jsonData
        } else {
          AuthUserInfo = createAuthUserInfo()
        }
      } catch (err) {
        AuthUserInfo = createAuthUserInfo()
      }
    }

    set(ctx, 'myCustomData.AuthUserInfo', AuthUserInfo)

    let composedInitialProps = {}
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx)
    }

    return {
      ...composedInitialProps,
      AuthUserInfo,
    }
  }

  WithAuthUserComp.displayName = `WithAuthuser(${ComposedComponent.displayName})`

  WithAuthUserComp.propTypes = {
    AuthUserInfo: PropTypes.shape({
      AuthUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        emailVerified: PropTypes.bool.isRequired,
      }),
      token: PropTypes.string,
    }).isRequired,
  }

  return WithAuthUserComp
}
