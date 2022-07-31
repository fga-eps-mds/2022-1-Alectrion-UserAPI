import { CreateUserController } from '../../presentation/controller/createUserController'
import { makeCreateUser } from '../useCases/createUser'

export const makeCreateUserController = () => {
  const usecase = makeCreateUser()
  console.log(usecase)

  return new CreateUserController(makeCreateUser())
}
