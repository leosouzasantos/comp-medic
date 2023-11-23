import express from 'express'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'
import { makeAuthenticateUserController } from '../factories/controllers/AuthenticateUserControllerFactory'
import { makeRefreshTokeController } from '../factories/controllers/RefreshTokenControllerFactory'

const sessionsRouter = express.Router()

sessionsRouter.post('/', adaptRoute(makeAuthenticateUserController()))

sessionsRouter.post('/refresh-token', adaptRoute(makeRefreshTokeController()))

export { sessionsRouter }
