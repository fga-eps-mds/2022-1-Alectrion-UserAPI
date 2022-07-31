import { Router } from 'express'
import { BcryptAdapter } from './adapters/bcryptAdapter'
import CreateUserController from './presentation/controller/createUserController'
import UpdateUserControler from './presentation/controller/updateUserController'
import CreateUserUseCase from './useCase/createUser/createUserUseCase'
const routes = Router()

routes.get('/update', UpdateUserControler.handle)
routes.post('/create', async (req, res) => {
  const createUserUseCase = new CreateUserUseCase(new BcryptAdapter())
  const controller = new CreateUserController(createUserUseCase)
  return await controller.handle(req, res)
})
export default routes
