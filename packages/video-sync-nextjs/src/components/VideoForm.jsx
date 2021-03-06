import React, { useState } from 'react'

import PropTypes from 'prop-types'

const VideoForm = (props) => {
  const { className, onSubmit } = props

  const [inputs, setInputs] = useState({
    videoUrl: '',
  })

  const handleInputChange = (event) => {
    event.persist()

    setInputs((formInputs) =>
      ({ ...formInputs, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }

    onSubmit(inputs.videoUrl)
  }

  return (
    <div className={`${className} flex items-center justify-center h-full`}>
      <div className="w-1/5"></div>
      <div className="w-3/5">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Video Url
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="videoUrl"
              name="videoUrl"
              className="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="https://examplevideo.com"
              onChange={handleInputChange}
              value={inputs.videoUrl}
            />
          </div>
        </form>
      </div>
      <div className="w-1/5"></div>
    </div>
  )
}

VideoForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default VideoForm
