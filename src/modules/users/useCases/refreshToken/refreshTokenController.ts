import { Request, Response } from 'express'
import { RefreshToken } from './refreshTokenUseCase'
import { Controller } from '../../../../core/infra/Controller'
import { HttpResponse, fail, ok } from '../../../../core/infra/HttpResponse'

type RefreshTokenControllerRequest = {
  refreshToken: string
}

export class RefreshTokenController implements Controller {
  constructor(private refreshTokenUseCase: RefreshToken) {}

  async handle({
    refreshToken,
  }: RefreshTokenControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.refreshTokenUseCase.execute(refreshToken)
      return ok(result)
    } catch (err: any) {
      return fail(err)
    }
  }
}
