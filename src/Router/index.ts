import router from "../Controller/AuthModel";
import e, { Router } from "express";

const routes = Router()

routes.use('/auth', router)

export default routes

