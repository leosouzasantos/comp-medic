import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { logger } from '../../../../utils/logger'
import { IUserRepository } from '../../repositories/IUserRepository'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/IPasswordCrypto'

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}
  async handle(request: Request, response: Response) {
    logger.info('User being created')
    try {
      const useCase = new CreateUserUseCase(
        this.userRepository,
        this.passwordCrypto
      )
      const result = await useCase.execute(request.body)

      return response.json(result)
    } catch (err: any) {
      logger.error(err.stack)
      return response.status(err.statusCode || 400).json(err.message)
    }
  }
}
