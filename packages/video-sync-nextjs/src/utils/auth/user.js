import { get, has } from 'lodash/object'

export const createAuthUser = (firebaseUser) => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null
  }

  return {
    id: get(firebaseUser, 'uid'),
    email: get(firebaseUser, 'email'),
    emailVerified: has(firebaseUser, 'emailVerified')
      ? get(firebaseUser, 'emailVerified')
      : get(firebaseUser, 'email_verified'),
  }
}

export const createAuthUserInfo = ({
  firebaseUser = null,
  token = null,
} = {}) =>
  ({
    AuthUser: createAuthUser(firebaseUser),
    token,
  })
