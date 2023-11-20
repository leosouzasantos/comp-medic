import express from 'express'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeEnsureAuthenticatedMiddleware } from '../factories/Middleware/EnsureAuthenticatedMiddlewareFactory'
import { adaptRoute } from '../../../core/infra/adapters/ExpressRouteAdapter'
import { makeGetFreeSchedulesController } from '../factories/controllers/FreeSchedulesControllerFactory'
import { makeAppointmentController } from '../factories/controllers/AppointmentsControllerFactory'

const appointmentRouter = express.Router()

appointmentRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

appointmentRouter.get('/free', adaptRoute(makeGetFreeSchedulesController()))

appointmentRouter.post('/', adaptRoute(makeAppointmentController()))

export { appointmentRouter }
