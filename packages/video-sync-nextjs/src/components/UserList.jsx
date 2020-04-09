import React from 'react'

import PropTypes from 'prop-types'

const UserList = ({
  hostId,
  isHost,
  handleKick,
  handleSetHost,
  users,
}) =>
  (
  <div className="mt-1 group flex flex-col px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
    <div>Users ({ users.length }):</div>
    <div>
      <ul>
        { users.map(({ online, username, id }) =>
          (
          <li
            className="group"
            key={id}
          >
            <span>{ online ? '⚡️' : '🚫'}</span>
            <span className={`${id === hostId ? 'font-bold' : ''}`}>{username}</span>
            { isHost
              ? (
                <>
                <span
                  className="invisible group-hover:visible text-gray-400 text-xs ml-4 cursor-pointer"
                >
                  <span
                    onClick={() =>
                      handleSetHost(id)}
                  >
                    Make Host
                  </span>
                  <span
                    onClick={() =>
                      handleKick(id)}
                    className="ml-4"
                  >
                    Kick 🦶
                  </span>
                </span>
                </>
              )
              : null
            }

          </li>
          ))}
      </ul>
    </div>
  </div>
  )

UserList.propTypes = {
  handleKick: PropTypes.func,
  handleSetHost: PropTypes.func,
  isHost: PropTypes.bool,
  users: PropTypes.array,
}

export default UserList
