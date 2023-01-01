import { Router } from 'express'
import validate from './utils/validate'
import usersController from './controllers/users.controller'
import usersValidation from './validations/users.validation'

const router = Router()

router.get('/profile', usersController.getUser)
router.put(
  '/profile',
  validate(usersValidation.createOrUpdate),
  usersController.createOrUpdate,
)

export default router
