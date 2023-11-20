import express from 'express'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/Middleware/EnsureAuthenticatedMiddlewareFactory'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateDoctorInfoController } from '../factories/controllers/DoctorInfoControllerFactory'

const doctorInfoRouter = express.Router()

doctorInfoRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

doctorInfoRouter.post('/', adaptRoute(MakeCreateDoctorInfoController()))

export { doctorInfoRouter }
