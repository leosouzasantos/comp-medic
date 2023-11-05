import { Router } from 'express'

// import { sessionsRouter } from './sessionsRoutes'
import { userRouter } from './userRoutes'

const router = Router()

router.use('/users', userRouter)
// router.use('/sessions', sessionsRouter)

export { router }
