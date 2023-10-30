import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { logger } from '../../utils/logger'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    logger.info('User being created')
    try {
      const data = request.body

      const useCase = new CreateUserUseCase()
      const result = await useCase.execute(data)

      return response.json(result)
    } catch (err: any) {
      logger.error(err.stack)
      return response.status(400).json(err.message)
    }
  }
}
