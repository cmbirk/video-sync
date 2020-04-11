import React from 'react'

import { Button } from '@components'

import SocialFriends from '@icons/social_friends'

import { getCurrentUser } from '@services/firebase'

const IntroHero = ({ toggleSigningIn }) => {
  let ButtonContent =
    (
      <Button size="lg" onClick={() => { toggleSigningIn(true) }}>
        Sign In
      </Button>
    )

  if (getCurrentUser()) {
    ButtonContent =
      (
      <Button size="lg">
        Ready?
      </Button>
      )
  }

  return (
    <div className="relative bg-white overflow-hidden">
      <section className="pt-20">
        <div className="container mx-auto px-8 lg:flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">
              Stuck Inside?
            </h1>
            <p className="text-xl lg:text-2xl mt-6 font-light">
              Welcome to the club! That doesn&apos;t mean we can&apos;t be social.
              Grab some friends, jump on a video call, and have some fun.
            </p>
            <p className="mt-8 md:mt-12">
              {ButtonContent}
            </p>
            <p className="mt-4 text-gray-600 text-s italic">
              Only hosts have to sign in.
              <br/>
              Otherwise use the room link provided by your host
            </p>
          </div>
          <div className="lg:w-1/2">
            <SocialFriends />
          </div>
        </div>
      </section>
    </div>
  )
}

export default IntroHero
