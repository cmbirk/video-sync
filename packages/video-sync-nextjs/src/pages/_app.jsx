import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import Modal from '@components/Modal'
import SigninModal from '@components/SigninModal'
import UserContext from '@contexts/UserContext'
import logout from '@utils/auth/logout'

import { withAuthUser, withAuthUserInfo } from '@utils/wrappers'

import '../styles.css'

class VideoSync extends App {
  state = {
    user: {},
    signingIn: false,
  }

  toggleSigningIn = (signingIn) => {
    if (typeof signingIn !== 'undefined') {
      return this.setState({ signingIn })
    }

    const { signingIn: stateSignedIn } = this.state

    return this.setState({ signingIn: !stateSignedIn })
  }

  render() {
    const { signingIn } = this.state

    const {
      AuthUserInfo,
      Component,
      pageProps,
    } = this.props

    return (
      <UserContext.Provider value={{
        user: AuthUserInfo,
        logout,
      }}>
        <Head>
          <title>Stuck Inside</title>
          <meta name="description" content="Stuck Inside? Play videos with friends!" />
          <link rel="icon" href="/home.svg" />
        </Head>
        <Component
          {...pageProps}
          toggleSigningIn={this.toggleSigningIn}
          AuthUserInfo={AuthUserInfo}
        />
        <Modal
          isOpen={false}
        />
        <SigninModal
          isOpen={signingIn}
        />

      </UserContext.Provider>
    )
  }
}

export default withAuthUser(withAuthUserInfo(VideoSync))
