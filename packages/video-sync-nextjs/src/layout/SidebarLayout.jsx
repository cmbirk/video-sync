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
      handleUpdateUsername,
      isConnected,
      isHost,
      resetVideoUrl,
      roomId,
      title,
      users,
    } = this.props

    const { sidebarOpen } = this.state

    return (
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar
          canReset={canReset}
          isHost={isHost}
          resetVideoUrl={resetVideoUrl}
          roomId={roomId}
          sidebarOpen={sidebarOpen}
          toggleSidebar={this.toggleSidebar}
          handleUpdateUsername={handleUpdateUsername}
          users={users}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <SidebarHeader
            isConnected={isConnected}
            roomId={roomId}
            title={title}
            toggleSidebar={this.toggleSidebar}
          />
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
            <div className="w-full bg-tiled border-l h-full">
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
  isConnected: PropTypes.bool,
  isHost: PropTypes.bool,
  resetVideoUrl: PropTypes.func,
  roomId: PropTypes.string,
  title: PropTypes.string,
}

export default SidebarLayout
