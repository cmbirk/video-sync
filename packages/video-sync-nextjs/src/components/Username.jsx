import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Username = ({
  avatarUrl: givenAvatarUrl = 'https://api.adorable.io/avatars/400/4d14880bca122e668444062007500f9c.png',
  name,
  handleUpdateUsername,
}) => {
  const [editing, setEditing] = useState(false)
  const [username, updateUsername] = useState(name)
  const [avatarUrl, updateAvatarUrl] = useState(givenAvatarUrl)

  useEffect(() => {
    updateUsername(name)
  }, [name])

  const saveUsername = () => {
    setEditing(false)
    handleUpdateUsername(username)
  }

  return (
    <>
      <div className="flex items-center">
        <div>
          <img className="inline-block h-10 w-10 rounded-full" src={avatarUrl} alt="" />
        </div>
        { editing
          ? (
            <div className="ml-3">
              <input autoFocus type="text" onChange={(event) => {
                updateUsername(event.target.value)
              }} value={username}/>
              <p
                onClick={() => { saveUsername() }}
                className="cursor-pointer text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150"
              >
                Save Username
              </p>
            </div>
          )
          : (
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-gray-700 group-hover:text-gray-900">
                {username}
              </p>
              <p
                onClick={() => { setEditing(true) }}
                className="cursor-pointer text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150"
              >
                Edit Username
              </p>
            </div>
          )
        }
      </div>
    </>
  )
}

Username.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  handleEditUsername: PropTypes.func,
}

export default Username
