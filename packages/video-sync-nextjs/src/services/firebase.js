import firebase from 'firebase/app'

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


export default firebase
