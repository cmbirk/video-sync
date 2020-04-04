import React from 'react'

const UserList = ({ isHost, handleSetHost, users }) => (
  <div className="mt-1 group flex flex-col px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
    <div>Users ({ users.length }):</div>
    <div>
      <ul>
        { users.map(({ username, id }) => (
          <li
            className="group"
            key={id}
          >
            {username}
            { isHost ?
              (
                <span
                  className="invisible group-hover:visible text-gray-400 text-xs ml-4 cursor-pointer"
                  onClick={() => handleSetHost(id)}
                >
                  Make Host
                </span>
              )
              : null
            }

          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default UserList
