import bcrypt from 'bcryptjs'
import { IPasswordCrypto } from './IPasswordCrypto'

export class PasswordBcrypt implements IPasswordCrypto {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
