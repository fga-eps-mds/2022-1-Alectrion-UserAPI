import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import UpdateUserControler from './presentation/controller/updateUserController'
import { adaptExpressRoute as adapt } from './adapters/express-router'
const routes = Router()

routes.get('/update', UpdateUserControler.handle)
routes.post('/create', adapt(makeCreateUserController()))
export default routes
