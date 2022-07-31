import {Router, Request, Response} from 'express';
import UpdateUserControler from './presentation/controller/updateUserController';
const routes = Router();

routes.get('/update', UpdateUserControler.handle);

export default routes;