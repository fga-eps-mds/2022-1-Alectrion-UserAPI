import { DeleteUserControler } from '../../presentation/controller/deleteUserController'
import { makeDeleteUser } from '../useCases/deleteUser'

export const makeDeleteUserController = () => {
  return new DeleteUserControler(makeDeleteUser())
}
