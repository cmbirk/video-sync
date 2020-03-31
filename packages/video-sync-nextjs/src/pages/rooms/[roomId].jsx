import React, { Component, useState } from 'react'
import { withRouter } from 'next/router'

import { Player, VideoForm } from '@components'

class Room extends Component {
  state = {
    videoUrl: '',
  }

  handleSubmit = (videoUrl) => {
    this.setState({ videoUrl })
  }

  render() {
    const { router } = this.props
    const { videoUrl } = this.state
    const { roomId } = router.query

    if (videoUrl) {
      return (<Player url={videoUrl} />)
    }

    return (<VideoForm onSubmit={this.handleSubmit}/>)
  }
}

export default withRouter(Room)
