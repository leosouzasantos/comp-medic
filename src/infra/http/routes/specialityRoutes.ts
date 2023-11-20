import express from 'express'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateSpecialityController } from '../factories/controllers/CreateSpecialityController'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/Middleware/EnsureAuthenticatedMiddlewareFactory'

const specialityRouter = express.Router()

specialityRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

specialityRouter.post('/', adaptRoute(MakeCreateSpecialityController()))

export { specialityRouter }
