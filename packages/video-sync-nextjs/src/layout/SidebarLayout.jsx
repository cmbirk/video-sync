import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Sidebar from '@layout/Sidebar'
import SidebarHeader from '@layout/SidebarHeader'

class SidebarLayout extends Component {
  state = {
    sidebarOpen: false,
  }

  toggleSidebar = () => {
    const { sidebarOpen } = this.state

    this.setState({
      sidebarOpen: !sidebarOpen,
    })
  }

  render() {
    const {
      canReset,
      children,
      handleKick,
      handleRoomNameChange,
      handleSetHost,
      handleUpdateUsername,
      isHost,
      resetVideoUrl,
      room,
      user,
      users = [],
    } = this.props

    let hostId = null
    let roomName = null

    if (room) {
      ({ hostId, name: roomName } = room)
    }


    const { sidebarOpen } = this.state

    return (
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar
          canReset={canReset}
          isHost={isHost}
          resetVideoUrl={resetVideoUrl}
          sidebarOpen={sidebarOpen}
          handleKick={handleKick}
          handleSetHost={handleSetHost}
          hostId={hostId}
          toggleSidebar={this.toggleSidebar}
          handleUpdateUsername={handleUpdateUsername}
          user={user}
          users={users}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <SidebarHeader
            handleRoomNameChange={handleRoomNameChange}
            roomName={roomName}
            toggleSidebar={this.toggleSidebar}
          />
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-200 p-10" tabIndex="0">
            <div className="w-full border-l h-full">
              {/* <!-- Replace with your content --> */}
              {children}
              {/* <!-- /End replace --> */}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

SidebarLayout.propTypes = {
  canReset: PropTypes.bool,
  children: PropTypes.node,
  handleUpdateUsername: PropTypes.func,
  isConnected: PropTypes.bool,
  isHost: PropTypes.bool,
  resetVideoUrl: PropTypes.func,
  room: PropTypes.object,
  title: PropTypes.string,
  users: PropTypes.array,
}

export default SidebarLayout
