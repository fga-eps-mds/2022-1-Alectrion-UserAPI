import { sign, Secret } from 'jsonwebtoken'
import { Token } from '../services/tokenGenerator'

export class CreateToken implements Token {
  generateToken(payload: object, secret: Secret, options: object): string {
    const token = sign(payload, secret, options)

    return token
  }
}
