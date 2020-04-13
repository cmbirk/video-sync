import {
  createContext, useContext, useEffect, useState,
} from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from './initFirebase'
import setSession from './firebaseSessionHandler'
import { createAuthUserInfo } from './user'

initFirebase()

export const AuthUserInfoContext = createContext(createAuthUserInfo())

export const useAuthUserInfo = () =>
  useContext(AuthUserInfoContext)

export const useFirebaseAuth = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser

    return {
      initializing: !user,
      user,
    }
  })

  const onChange = (user) => {
    setState({ initializing: false, user })

    setSession(user)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)

    return () =>
      unsubscribe()
  }, [])

  return state
}
