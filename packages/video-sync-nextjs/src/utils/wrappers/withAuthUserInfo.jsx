import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import { AuthUserInfoContext } from '@utils/auth/hooks'

export default (ComposedComponent) => {
  const WithAuthUserInfoComp = (props) => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props
    return (
      <AuthUserInfoContext.Consumer>
        {(AuthUserInfo) =>
          (
            <ComposedComponent
              {...otherProps}
              AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession}
            />
          )}
      </AuthUserInfoContext.Consumer>
    )
  }

  WithAuthUserInfoComp.getInitialProps = async (ctx) => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)

    let composedInitialProps = {}

    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx)
    }

    return {
      ...composedInitialProps,
      AuthUserInfo,
    }
  }

  WithAuthUserInfoComp.displayName = `WithAuthUserInfo(${ComposedComponent.displayName})`

  WithAuthUserInfoComp.propTypes = {
    AuthUserInfo: PropTypes.shape({
      AuthUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        emailVerified: PropTypes.bool.isRequired,
      }),
      token: PropTypes.string,
    }),
  }

  WithAuthUserInfoComp.defaultProps = {}

  return WithAuthUserInfoComp
}
