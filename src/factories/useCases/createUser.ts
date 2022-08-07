import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import UserRepository from '../../repository/userRepository'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'

export const makeCreateUser = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  return new CreateUserUseCase(encryptor, userRepository)
}
