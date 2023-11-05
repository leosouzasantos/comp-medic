import { sign, verify } from 'jsonwebtoken'
import { InvalidJWTTokenError } from '../../../errors/InvalidJWTTokenError'
import { auth } from '../../../config/auth'
import { User } from '../entities/UserEntity'

export interface JWTData {
  userId: string
  token: string
}

export interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string
  public readonly token: string

  private constructor({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  static decodeToken(token: string): InvalidJWTTokenError | JWTTokenPayload {
    try {
      const decode = verify(token, auth.secretKey) as JWTTokenPayload
      return decode
    } catch (err) {
      return new InvalidJWTTokenError()
    }
  }

  static createFromJWT(token: string): InvalidJWTTokenError | JWT {
    const jwtPayloadOrError = this.decodeToken(token)

    if (jwtPayloadOrError instanceof InvalidJWTTokenError) {
      return jwtPayloadOrError
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.sub })
    return jwt
  }

  static create(user: User): JWT {
    const token = sign({}, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    })

    const jwt = new JWT({ userId: user.id, token })
    return jwt
  }
}