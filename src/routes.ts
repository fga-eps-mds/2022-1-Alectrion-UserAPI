import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
import { makeGetUserController } from './factories/controllers/getUser'
const routes = Router()

routes.get('/update', adapt(makeUpdateUserController()))
routes.post('/create', adapt(makeCreateUserController()))
routes.get('/get', adapt(makeGetUserController()))
export default routes
