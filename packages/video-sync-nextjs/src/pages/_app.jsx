import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import UserContext from '@contexts/UserContext'
import logout from '@utils/auth/logout'

import { withAuthUser, withAuthUserInfo } from '@utils/wrappers'

import '../styles.css'

class VideoSync extends App {
  state = {
    user: {},
  }

  render() {
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
        <Component {...pageProps} />
      </UserContext.Provider>
    )
  }
}

export default withAuthUser(withAuthUserInfo(VideoSync))
