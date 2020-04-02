import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import '../styles.css'
import UserContext from '../contexts/UserContext'

class VideoSync extends App {
  state = {
    user: null,
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <UserContext.Provider value={{
        user: this.state.user,
      }}>
        <Head>
          <title>Stuck Inside</title>
          <meta name="description" content="Stuck Inside? Play videos with friends!" />
          <link rel="icon" href="/replay.svg" />
        </Head>
        <Component {...pageProps} />
      </UserContext.Provider>
    )
  }
}

export default VideoSync
