import { Router, response } from 'express'
import { createUserController } from '../modules/users/useCases/CreateUser'
import { authenticateUserController } from '../modules/users/useCases/AuthenticateUser'

const userRouter = Router()

userRouter.post('/login', async (request, response) => {
  await authenticateUserController.handle(request, response)
})

userRouter.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

export { userRouter }
