import { GetUserController } from '../../presentation/controller/getUserController'
import { makeGetUser } from '../useCases/getUser'

export const makeGetUserController = () => {
  return new GetUserController(makeGetUser())
}
