import { decode } from 'jsonwebtoken'

import {
  fail,
  forbidden,
  HttpResponse,
  ok,
} from '../../../core/infra/HttpResponse'
import { Middleware } from '../../../core/infra/Middleware'
import { AccessDeniedError } from '../../errors/AcessDeniedError'

type EnsureAuthenticateMiddlewareRequest = {
  accessToken: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticateMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticateMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken) {
        try {
          const decoded = decode(accessToken) as DecodedJwt

          return ok({ userId: decoded.sub })
        } catch (err: any) {
          return forbidden(new AccessDeniedError())
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (err: any) {
      return fail(err)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
