import express from 'express'
import clubs from '../controllers/clubs.js'

const router = express.Router()

// * CLUBS
router.route('/clubs')
  .get(clubs.index)
  .post(clubs.create)

router.route('/clubs/:clubId')
  .get(clubs.show)
  .delete(clubs.delete)
  .put(clubs.update)


export default router