export const auth = {
  secretKey: process.env.SECRET_KEY_TOKEN || '',
  expiresIn: process.env.EXPIRES_IN,
}
