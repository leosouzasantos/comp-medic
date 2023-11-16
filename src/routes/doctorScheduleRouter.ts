import express from 'express'
import { adaptMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../infra/http/factories/Middleware/EnsureAuthenticatedMiddlewareFactory'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateDoctorScheduleController } from '../infra/http/factories/controllers/DoctorScheduleControllerFactory'

const doctorScheduleRouter = express.Router()

doctorScheduleRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

doctorScheduleRouter.post('/', adaptRoute(MakeCreateDoctorScheduleController()))

export { doctorScheduleRouter }
