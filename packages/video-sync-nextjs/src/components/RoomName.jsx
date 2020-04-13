import React, { useEffect, useState } from 'react'

const RoomName = ({
  handleRoomNameChange,
  roomName: givenRoomName,
}) => {
  const [editing, setEditing] = useState(false)
  const [roomName, updateRoomName] = useState(givenRoomName)

  useEffect(() => {
    updateRoomName(givenRoomName)
  }, [givenRoomName])

  const saveRoomName = () => {
    setEditing(false)
    handleRoomNameChange(roomName)
  }

  return (
    <>
      { editing ? (
          <form onSubmit={() =>
            saveRoomName()}>
            <input
              autoFocus
              type="text"
              value={roomName}
              onChange={(event) => {
                updateRoomName(event.target.value)
              }}/>
          </form>
      ) : (
          <h1
            className="text-lg italic font-bold self-center cursor-pointer"
            onClick={() => { setEditing(true) }}
          >
            {roomName}
          </h1>
      )
      }
    </>
  )
}

export default RoomName
