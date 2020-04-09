/* eslint react/no-danger: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

class CustomDocument extends Document {
  getInitialProps = async ({ ctx }) => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, AuthUserInfo }
  }

  render() {
    const { AuthUserInfo } = this.props

    return (
      <Html>
        <Head>
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }).isRequired,
}

export default CustomDocument
