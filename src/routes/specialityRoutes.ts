import { Router } from 'express'
import { specialityController } from '../modules/speciality/useCases/CreateSpeciality'

const specialityRouter = Router()

specialityRouter.post('/specialities', async (request, response) => {
  await specialityController.handle(request, response)
})

export { specialityRouter }
