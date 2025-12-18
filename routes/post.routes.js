const {Router} = require("express")
const { auth } = require("../middleware/auth")
const { Createpost, getpost, increaselike, Fetchuserpost } = require("../controller/post.controller")
const PostRouter = Router()

PostRouter.post("/posts" , auth , Createpost)
PostRouter.get("/posts" , getpost)
PostRouter.post("/:id/like" , auth , increaselike)
PostRouter.get("/user/:userId" , Fetchuserpost)

module.exports = PostRouter