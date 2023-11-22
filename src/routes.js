import { Router } from "express";

import { getUsers, addUser, authUser, getUser } from "./controllers/userControllers.js";
import { verificarToken } from "./middlewares/userMiddleware.js";

const routes = Router()

routes.get('/users', verificarToken, getUsers)

routes.post('/auth/signup/user', verificarToken, addUser)

routes.post('/auth/signin/user', authUser)

routes.get('/user', verificarToken, getUser)

export default routes