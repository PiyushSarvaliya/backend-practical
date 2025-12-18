const {Router} = require("express")
const { Resgister, login, Profile } = require("../controller/user.controller")
const { auth } = require("../middleware/auth")
const UserRouter = Router()

UserRouter.post("/auth/register" , Resgister)
UserRouter.post("/auth/login" , login)
UserRouter.get("/auth/profile" , auth , Profile)

module.exports = UserRouter