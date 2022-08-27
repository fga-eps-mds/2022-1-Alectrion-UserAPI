import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
import { makeGetUserController } from './factories/controllers/getUser'
import { makeDeleteUserController } from './factories/controllers/deleteUser'
const routes = Router()

routes.get('/update', adapt(makeUpdateUserController()))
routes.post('/create', adapt(makeCreateUserController()))
routes.get('/get', adapt(makeGetUserController()))
routes.delete('/delete', adapt(makeDeleteUserController()))
export default routes
