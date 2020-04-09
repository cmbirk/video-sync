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
export const firestore = firebase.firestore()

export const getCurrentUser = () =>
  auth.currentUser

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = () =>
  auth.signOut()

export const sendPasswordResetEmail = (email) =>
  auth.sendPasswordResetEmail(email)

export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password)
