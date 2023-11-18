import express from 'express'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../infra/http/factories/Middleware/EnsureAuthenticatedMiddlewareFactory'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { makeGetFreeSchedulesController } from '../infra/http/factories/controllers/FreeSchedulesControllerFactory'

const appointmentRouter = express.Router()

appointmentRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

appointmentRouter.get('/free', adaptRoute(makeGetFreeSchedulesController()))

export { appointmentRouter }
