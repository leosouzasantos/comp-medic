import { Router } from 'express'

import { sessionsRouter } from './sessionsRoutes'
import { userRouter } from './userRoutes'
import { specialityRouter } from './specialityRoutes'
import { doctorRouter } from './doctorRoutes'
import { doctorInfoRouter } from './doctorInfoRouter'

const router = Router()

router.use('/users', userRouter)
router.use('/sessions', sessionsRouter)
router.use('/specialities', specialityRouter)
router.use('/doctor', doctorRouter)
router.use('/info', doctorInfoRouter)

export { router }
