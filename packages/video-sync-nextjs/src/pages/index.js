import Head from 'next/head'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '@layout/Layout'
import Button from '@components/Button'

const Home = () => {
  const getRoomId = async () => {
    const apiURL = process.env.apiURL

    console.log(apiURL)

    const res = await fetch(`${apiURL}/rooms`)

    const data = await res.json()

    const { newRoom } = data

    Router.push(`/rooms/${newRoom}`)
  }

  return (
    <Layout>
      <Head>
        <title>Happy Hour 🍻</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Button onClick={() => getRoomId()}>
              Create a new room &gt;&gt;
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
