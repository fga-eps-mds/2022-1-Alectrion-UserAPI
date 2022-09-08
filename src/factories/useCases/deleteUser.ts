import UserRepository from '../../repository/userRepository'
import { DeleteUserUseCase } from '../../useCase/deleteUser/deleteUserUseCase'

export const makeDeleteUser = () => {
  const userRepository = new UserRepository()
  return new DeleteUserUseCase(userRepository)
}
