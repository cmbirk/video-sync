import fetch from 'isomorphic-unfetch'

export default async (user) => {
  if (user) {
    const token = await user.getIdToken()

    return fetch('/api/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ token }),
    })
  }

  return fetch('/api/logout', {
    method: 'POST',
    credentials: 'same-origin',
  })
}
