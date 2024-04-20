import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as locationsCtrl from '../controllers/locations.js'

const router = Router()


router.get('/', isLoggedIn, locationsCtrl.index)
//GET localhost:3000/locations/new
router.get('/new', isLoggedIn, locationsCtrl.new)

router.post('/', isLoggedIn, locationsCtrl.create)

router.get('/:locationId', isLoggedIn, locationsCtrl.show)



export {
  router
}