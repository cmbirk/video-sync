import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { createUserWithGoogleAuth, signOut } from '@services/firebase'

import '../styles.css'
import UserContext from '@contexts/UserContext'

class VideoSync extends App {
  state = {
    user: {},
  }

  logout = async () => {
    await signOut()
    this.setState({ user: {} })
  }

  login = async () => {
    const { user } = await createUserWithGoogleAuth()

    this.setState({ user })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <UserContext.Provider value={{
        user: this.state.user,
        login: this.login,
        logout: this.logout,
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

export default VideoSync
