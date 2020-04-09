import admin from 'firebase-admin'

const verifyIdToken = (token) => {
  const firebasePrivateKey = process.env.firebase_private_key

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.projectid,
        clientEmail: process.env.firebase_client_email,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.databaseurl,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err
    })
}

export default verifyIdToken
