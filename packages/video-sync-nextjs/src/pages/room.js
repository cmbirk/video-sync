import React, { useState } from 'react'

import { Player, VideoForm } from '@components'

const Room = () => {
  const [videoUrl, setVideoUrl] = useState()

  const handleSubmit = (videoUrl) => {
    setVideoUrl(videoUrl)
  }

  if (videoUrl) {
    return (<Player url={videoUrl} />)
  }

  return (<VideoForm onSubmit={handleSubmit}/>)
}

export default Room
