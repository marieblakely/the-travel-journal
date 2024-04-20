import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as locationsCtrl from '../controllers/locations.js'

const router = Router()


//GET localhost:3000/locations/new
router.get('/new', isLoggedIn, locationsCtrl.new)


export {
  router
}