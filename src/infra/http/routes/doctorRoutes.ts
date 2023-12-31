import express from 'express'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/Middleware/EnsureAuthenticatedMiddlewareFactory'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateDoctorController } from '../factories/controllers/DoctorControllerFactory'

const doctorRouter = express.Router()

doctorRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

doctorRouter.post('/', adaptRoute(MakeCreateDoctorController()))

export { doctorRouter }
