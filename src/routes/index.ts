import { Router } from 'express'

// import { sessionsRouter } from './sessionsRoutes'
import { userRouter } from './userRoutes'
import { specialityRouter } from './specialityRoutes'

const router = Router()

router.use('/users', userRouter)
router.use('/specialities', specialityRouter)
// router.use('/sessions', sessionsRouter)

export { router }
