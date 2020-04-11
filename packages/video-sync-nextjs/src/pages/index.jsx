import React, { useState } from 'react'

import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import { firestore } from '@services/firebase'

import { withAuthUser, withAuthUserInfo } from '@utils/wrappers'

import Layout from '@layout/Layout'
import IntroHero from '@components/content/IntroHero'

const Home = ({ AuthUserInfo, toggleSigningIn }) =>
  (
    <Layout user={AuthUserInfo}>
      <IntroHero
        toggleSigningIn={toggleSigningIn}
      />
    </Layout>
  )

// export default withAuthUser(withAuthUserInfo(Home))
export default Home
