import commonMiddleware from '@utils/middleware/commonMiddleware'
import verifyIdToken from '@utils/auth/verifyIdToken'

const handler = async (req, res) => {
  if (!req.body) {
    return res.status(400)
  }

  try {
    const { token } = req.body

    const decodedToken = await verifyIdToken(token)
    req.session.decodedToken = decodedToken
    req.session.token = token

    return res.status(200).json({ status: true, decodedToken })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default commonMiddleware(handler)
