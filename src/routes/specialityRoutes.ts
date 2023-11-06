import express from 'express'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateSpecialityController } from '../infra/http/factories/controllers/CreateSpecialityController'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../infra/http/factories/Middleware/EnsureAuthenticatedMiddlewareFactory'

const specialityRouter = express.Router()

specialityRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

specialityRouter.post('/', adaptRoute(MakeCreateSpecialityController()))

export { specialityRouter }
