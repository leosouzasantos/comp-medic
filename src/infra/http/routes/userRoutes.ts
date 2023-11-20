import express from 'express'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'

import { makeRegisterUserController } from '../factories/controllers/RegisterUserControllerFactory'

const userRouter = express.Router()

userRouter.post('/', adaptRoute(makeRegisterUserController()))

export { userRouter }
