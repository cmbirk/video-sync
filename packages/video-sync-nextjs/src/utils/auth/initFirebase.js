import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.apikey,
  appId: process.env.appid,
  authDomain: process.env.authdomain,
  databaseURL: process.env.databaseurl,
  projectId: process.env.projectid,
}

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}
