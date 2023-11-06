import express from 'express'
import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { MakeCreateSpecialityController } from '../infra/http/factories/controllers/CreateSpecialityController'

const specialityRouter = express.Router()

specialityRouter.post('/', adaptRoute(MakeCreateSpecialityController()))

export { specialityRouter }
