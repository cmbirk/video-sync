import React, { Component } from 'react'
import Link from 'next/link'

import Sidebar from '@layout/Sidebar'
import SidebarHeader from '@layout/SidebarHeader'

class SidebarLayout extends Component {
  state = {
    sidebarOpen: false,
  }

  toggleSidebar = () => {
    const { sidebarOpen } = this.state

    this.setState({
      sidebarOpen: !sidebarOpen
    })
  }

  render() {
    const {
      canReset,
      children,
      isConnected,
      isHost,
      resetVideoUrl,
      roomId,
      title
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
              {/*<!-- Replace with your content -->*/}
              {children}
              {/*<!-- /End replace -->*/}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default SidebarLayout
