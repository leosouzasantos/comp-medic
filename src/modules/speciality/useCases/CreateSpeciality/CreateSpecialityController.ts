import { Request, Response } from 'express'
import { ISpecialityRepository } from '../../repositories/ISpecialityRepository'
import { logger } from '../../../../utils/logger'
import { CreateSpeciality } from './CreateSpecialityUseCase'

export class SpecialityController {
  constructor(private specialityRepository: ISpecialityRepository) {}
  async handle(request: Request, response: Response) {
    logger.info('specialty being created')
    try {
      const useCase = new CreateSpeciality(this.specialityRepository)
      const result = await useCase.execute(request.body)
      return response.json(result)
    } catch (err: any) {
      logger.error(err.stack)
      return response.status(err.statusCode || 400).json(err.message)
    }
  }
}
