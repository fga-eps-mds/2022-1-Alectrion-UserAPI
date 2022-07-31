import { Router } from 'express'
import CreateUserController from './presentation/controller/createUserController'
import UpdateUserControler from './presentation/controller/updateUserController'
const routes = Router()

routes.get('/update', UpdateUserControler.handle)
routes.post('/create', CreateUserController.handle)
export default routes
