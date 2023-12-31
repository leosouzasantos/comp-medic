import { Router } from 'express'

import { sessionsRouter } from './sessionsRoutes'
import { userRouter } from './userRoutes'
import { specialityRouter } from './specialityRoutes'
import { doctorRouter } from './doctorRoutes'
import { doctorInfoRouter } from './doctorInfoRouter'
import { patientRouter } from './PatientRouter'
import { doctorScheduleRouter } from './doctorScheduleRouter'
import { appointmentRouter } from './appointmentRouter'

const router = Router()

router.use('/users', userRouter)
router.use('/refresh-token', userRouter)
router.use('/sessions', sessionsRouter)
router.use('/specialities', specialityRouter)
router.use('/doctor', doctorRouter)
router.use('/info', doctorInfoRouter)
router.use('/patient', patientRouter)
router.use('/schedules', doctorScheduleRouter)
router.use('/appointments', appointmentRouter)

export { router }
