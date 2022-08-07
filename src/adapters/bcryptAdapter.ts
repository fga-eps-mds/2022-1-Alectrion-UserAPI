import { hashSync } from 'bcrypt'
import { Encryptor } from '../services/encryptor'

export class BcryptAdapter implements Encryptor {
  encrypt(password: string) {
    return hashSync(password, 3)
  }
}
