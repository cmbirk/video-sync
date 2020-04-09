import cookieSession from 'cookie-session'

export const addSession = (req, res) => {
  if (!process.env.session_secret_current && process.env.session_secret_previous) {
    throw new Error('Session secrets must be set.')
  }

  const sessionSecrets = [
    process.env.session_secret_current,
    process.env.session_secret_previous,
  ]

  const includeSession = cookieSession({
    keys: sessionSecrets,
    maxAge: 604800000, // week
    httpOnly: true,
    overwrite: true,
  })

  includeSession(req, res, () => {})
}

export default (handler) =>
  (req, res) => {
    try {
      addSession(req, res)
    } catch (e) {
      return res.status(500).json({ error: 'Could not get user session.' })
    }

    return handler(req, res)
  }
