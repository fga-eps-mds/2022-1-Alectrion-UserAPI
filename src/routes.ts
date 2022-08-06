import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
const routes = Router()

routes.get('/update', adapt(makeUpdateUserController()))
routes.post('/create', adapt(makeCreateUserController()))
export default routes
