import express from 'express'
import { createUserController } from '../modules/users/useCases/CreateUser'

const userRouter = express.Router()

userRouter.use()

userRouter.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

export { userRouter }
