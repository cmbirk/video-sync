import React from 'react'

const Username = () => (
    <a href="#" className="flex-shrink-0 group block focus:outline-none">
      <div className="flex items-center">
        <div>
          <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </div>
        <div className="ml-3">
          <p className="text-base leading-6 font-medium text-gray-700 group-hover:text-gray-900">
            Tom Cook
          </p>
          <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
            Edit Username
          </p>
        </div>
      </div>
    </a>
)

export default Username
