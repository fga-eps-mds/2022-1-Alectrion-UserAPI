import { CreateUserController } from '../../presentation/controller/createUserController'
import { makeCreateUser } from '../useCases/createUser'

export const makeCreateUserController = () => {
  return new CreateUserController(makeCreateUser())
}
