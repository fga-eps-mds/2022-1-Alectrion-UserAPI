import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
import { makeGetUserController } from './factories/controllers/getUser'
import { makeAuthenticateUserController } from './factories/controllers/authenticateUser'
import { IsUserAuthenticated } from './middlewares/isUserAuthenticated'
const routes = Router()

routes.put('/update', adapt(makeUpdateUserController()))
routes.post('/create', adapt(makeCreateUserController()))
routes.get('/get', IsUserAuthenticated, adapt(makeGetUserController()))
routes.post('/login', adapt(makeAuthenticateUserController()))
export default routes
