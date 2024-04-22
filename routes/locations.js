import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as locationsCtrl from '../controllers/locations.js'

const router = Router()


router.get('/', isLoggedIn, locationsCtrl.index)
//GET localhost:3000/locations/new
router.get('/new', isLoggedIn, locationsCtrl.new)

router.post('/', isLoggedIn, locationsCtrl.create)

router.get('/:locationId', isLoggedIn, locationsCtrl.show)

router.get('/:locationId/edit', isLoggedIn, locationsCtrl.edit)

router.put('/:locationId', isLoggedIn, locationsCtrl.update)

router.delete('/:locationId', isLoggedIn, locationsCtrl.delete)

router.post('/:locationId/comments', isLoggedIn, locationsCtrl.addComment)

router.get('/:locationId/comments/:commentId/edit', isLoggedIn, locationsCtrl.editComment)

router.put('/:locationId/comments/:commentId', isLoggedIn, locationsCtrl.updateComment)

router.delete('/:locationId/:comments/:commentId', isLoggedIn, locationsCtrl.deleteComment)

export {
  router
}