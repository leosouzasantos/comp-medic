import { Router } from 'express'

import { sessionsRouter } from './sessionsRoutes'
import { userRouter } from './userRoutes'
import { specialityRouter } from './specialityRoutes'

const router = Router()

router.use('/users', userRouter)
router.use('/sessions', sessionsRouter)
router.use('/specialities', specialityRouter)

export { router }
