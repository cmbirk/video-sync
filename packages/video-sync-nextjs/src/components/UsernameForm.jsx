import React, { useState } from 'react'

const UsernameForm = (props) => {
  const { onSubmit } = props

  const [inputs, setInputs] = useState({
    username: ''
  })

  const handleInputChange = (event) => {
    event.persist()

    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }

    onSubmit(inputs.username)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/5"></div>
      <div className="w-3/5">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Username
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="username"
              name="username"
              className="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="https://examplevideo.com"
              onChange={handleInputChange}
              value={inputs.username}
            />
          </div>
        </form>
      </div>
      <div className="w-1/5"></div>
    </div>
  )
}

export default UsernameForm
