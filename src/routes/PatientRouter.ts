import express from 'express'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreatePatientController } from '../infra/http/factories/controllers/CreatePatientControllerFactory'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../infra/http/factories/Middleware/EnsureAuthenticatedMiddlewareFactory'

const patientRouter = express.Router()

patientRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))
patientRouter.post('/', adaptRoute(MakeCreatePatientController()))

export { patientRouter }
