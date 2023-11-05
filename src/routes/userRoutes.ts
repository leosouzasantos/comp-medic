import express from 'express'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeAuthenticateUserController } from '../infra/http/factories/controllers/AuthenticateUserControllerFactory'
import { makeRegisterUserController } from '../infra/http/factories/controllers/RegisterUserControllerFactory'

const userRouter = express.Router()

// userRouter.use(adaptMiddleware(makeAuthenticateUserController()))

userRouter.post('/', adaptRoute(makeRegisterUserController()))

export { userRouter }
