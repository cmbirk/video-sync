import React, { useState } from 'react'

import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import { firestore } from '@services/firebase'

import Layout from '@layout/Layout'
import Button from '@components/Button'
import IntroHero from '@components/content/IntroHero'

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
      <IntroHero />
    </Layout>
  )
}

export default Home
