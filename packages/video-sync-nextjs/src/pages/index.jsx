import React, { useState } from 'react'

import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import { firestore } from '@services/firebase'

import Layout from '@layout/Layout'
import Button from '@components/Button'

const Home = () => {
  const [roomId, updateRoomId] = useState('')

  const getRoomId = async () => {
    const { apiurl } = process.env

    const res = await fetch(`${apiurl}/rooms`)

    const data = await res.json()

    const { newRoom } = data

    let roomRef

    if (typeof window !== 'undefined') {
      roomRef = await firestore.collection('Rooms').add({
        roomId: newRoom,
        name: 'unknown',
        currentTime: 0,
      })
    }

    Router.push(`/rooms/${roomRef.id}`)
    // Router.push(`/rooms/${newRoom}`)
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex justify-center">
        <div className="text-center">
          <h2 className="w-full text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            <span className="text-indigo-600">Get the party started.</span>
          </h2>
          <form
            className="mt-8 sm:flex"
            onSubmit={() =>
              setRoomId()}
          >
            <input
              onChange={(e) =>
                updateRoomId(e.target.value)}
              value={roomId}
              aria-label="Room Id"
              type="text"
              required
              className="appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:max-w-xs"
              placeholder="Enter your room ID"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <Link
                href="/rooms/[roomId]"
                as={`/rooms/${roomId}`}>
                <a className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                  Go to room &gt;&gt;
                </a>
              </Link>
            </div>
          </form>
          <p className="my-8 ml-4">Or</p>
          <div>
            <Button onClick={getRoomId}>
              Create a room.
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
