import { Router } from "express";

import { getUsers, addUser, authUser } from "./controllers/userControllers.js";

const routes = Router()

routes.get('/users', getUsers)

routes.post('/auth/signup/user', addUser)

routes.post('/auth/signin/user', authUser)

routes.get('/user/:id', )

export default routes