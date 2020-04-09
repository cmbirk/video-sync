import firebase from 'firebase/app'
import 'firebase/auth'

export default async () => {
  try {
    await firebase
      .auth()
      .signOut()

    if (typeof window !== 'undefined') {
      // Remove the server-side rendered user data element.

      try {
        const elem = window.document.getElementById('__MY_AUTH_USER_INFO')
        elem.parentNode.removeChild(elem)
      } catch (e) {
        console.error(e)
      }
    }

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
