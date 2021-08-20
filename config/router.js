import express from 'express'
import secureRoute from '../lib/secureRoute'
import auth from '../controllers/auth.js'
import clubs from '../db/data/clubs.js'
import pubs from '' 
import otherAttractions from ''
// import users from ''

const router = express.Router()

// USERS

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

// PROFILES need to add 'users.' in here users.userProfile

router.route('/profile')
  .put(secureRoute)

router.route('/update-profile')
  .put(secureRoute)



// CLUBS

router.route('/clubs')
  .get(clubs.index)
  .post(secureRoute, clubs.create)


router.route('/clubs/:clubId')
  .get(clubs.show)
  .put(secureRoute, clubs.update)
  .delete(secureRoute, clubs.delete)

// PUBS

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:pubId')
  .get(pubs.show)
  .put(secureRoute, pubs.update)
  .delete(secureRoute, pubs.delete)

// OTHER ATTRACTIONS

router.route('/other-attractions')
  .get(otherAttractions.index)
  .post(secureRoute, otherAttractions.create)

router.route('/other-attractions/:other-attractionsId')
  .get(otherAttractions.show)
  .put(secureRoute, otherAttractions.update)
  .delete(secureRoute, otherAttractions.delete)

// COMMENTS 

router.route('/pubs/:pubId/comments')
  .post(secureRoute, pubs.create)

router.route('/pubs/:pubId/comments/:commentId')
  .delete(secureRoute, pubs.delete)

router.route('/other-attractios/:other-attractionsId/comments')
  .post(secureRoute, pubs.create)

router.route('/other-attractions/:other-attractionsId/comments/:commentId')
  .delete(secureRoute, pubs.delete)

export default router