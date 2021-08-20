import jwt from 'jsonwebtoken'
import { secret } from ''
import User from ''
import { Unauthorized } from './errors.js'

export default async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      throw new Unauthorized()
    }
    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, secret)

    const user = await User.findById(payload.sub)

    if (!user) {
      throw new Unauthorized()
    }

    next()
  } catch (err) {
    next(err)
  }
}