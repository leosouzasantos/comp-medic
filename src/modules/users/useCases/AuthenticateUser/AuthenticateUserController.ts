import { Request, Response } from 'express'
import { AuthenticateUser } from './AuthenticatecaseUserUseCase'
import { IUserRepository } from '../../repositories/IUserRepository'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/IPasswordCrypto'

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body

      const useCase = new AuthenticateUser(
        this.userRepository,
        this.passwordCrypto
      )

      const result = await useCase.execute(data)
      return response.json(result)
    } catch (err: any) {
      return response.status(err.statusCode).json(err.message)
    }
  }
}
