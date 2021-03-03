export default function (req, res, next) {
  const paths = ['/admin']

  if (req.originalUrl.includes(paths)) {
    res.spa = true
  }
  next()
}
