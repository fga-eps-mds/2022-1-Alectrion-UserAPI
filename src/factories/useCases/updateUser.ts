import UserRepository from '../../repository/userRepository'
import { UpdateUserUseCase } from '../../useCase/updateUser/updateUserUseCase'

export const makeUpdateUser = () => {
  const userRepository = new UserRepository()
  return new UpdateUserUseCase(userRepository)
}
