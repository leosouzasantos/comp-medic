import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/CreateUser'

const userRouter = Router()

userRouter.post('/users', createUserController.handle)

export { userRouter }
