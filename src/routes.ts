import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import UpdateUserControler from './presentation/controller/updateUserController'
const routes = Router()

routes.get('/update', UpdateUserControler.handle)
routes.post('/create', async (req, res) => {
  return await makeCreateUserController().handle(req, res)
})
export default routes
