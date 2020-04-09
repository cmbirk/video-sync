export default (handler) =>
  (req, res) => {
    if (req.session) {
      req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    }

    handler(req, res)
  }
