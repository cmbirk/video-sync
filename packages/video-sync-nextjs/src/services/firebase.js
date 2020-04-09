import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: process.env.authdomain,
  databaseURL: process.env.databaseurl,
  projectId: process.env.projectid,
  storageBucket: process.env.storagebucket,
  messagingSenderId: process.env.messagingsenderid,
  appId: process.env.appid,
  measurementId: process.env.measurementid,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

// auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

export const firestore = firebase.firestore()

export const createUserWithGoogleAuth = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  const result = await auth.signInWithPopup(provider)
  console.log(result)
  const { accessToken } = result.credential
  const { user } = result

  console.log(user, accessToken)

  return {
    accessToken,
    user,
  }
}

export const getCurrentUser = () =>
  auth.currentUser

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () =>
  auth.signOut()

export const sendPasswordResetEmail = (email) =>
  auth.sendPasswordResetEmail(email)

export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password)

export default firebase
