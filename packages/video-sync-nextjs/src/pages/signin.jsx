import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '@utils/auth/initFirebase'

initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
}

const Signin = () => {
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])

  return (
    <div>
      { renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null }
    </div>
  )
}


export default Signin
