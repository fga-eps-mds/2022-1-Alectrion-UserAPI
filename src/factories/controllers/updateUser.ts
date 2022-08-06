import { UpdateUserControler } from '../../presentation/controller/updateUserController'
import { makeUpdateUser } from '../useCases/updateUser'

export const makeUpdateUserController = () => {
  return new UpdateUserControler(makeUpdateUser())
}
