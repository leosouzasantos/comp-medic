import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/CreateUser'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'

const userRouter = Router()

userRouter.use()

userRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

userRouter.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

export { userRouter }
