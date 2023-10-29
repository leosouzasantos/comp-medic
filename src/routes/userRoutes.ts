import { Router } from 'express'
import { CreateUserController } from '../useCases/CreateUser/CreateUserController'

const userRouter = Router()

const createUserController = new CreateUserController()

userRouter.post('/users', createUserController.handle)

export { userRouter }
