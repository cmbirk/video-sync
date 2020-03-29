import React from 'react'
import App from 'next/app'
import '../styles.css'

class VideoSync extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default VideoSync
