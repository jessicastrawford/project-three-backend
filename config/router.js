import express from 'express'
import clubs from '../controllers/clubs.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// * CLUBS
router.route('/clubs')
  .get(clubs.index)
  .post(secureRoute, clubs.create)

router.route('/clubs/:clubId')
  .get(clubs.show)
  .delete(secureRoute, clubs.delete)
  .put(secureRoute, clubs.update)

// * PUBS
router.route('/clubs/:clubId/pubs')
  .post(clubs.pubCreate)

router.route('/clubs/:clubId/pubs/:pubId')
  .delete(clubs.pubDelete) 

// * USERS
router.post('/register', auth.register)
router.post('/login', auth.login)


export default router