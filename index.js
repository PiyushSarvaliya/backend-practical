const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const connect = require('./config/db');
const UserRouter = require('./routes/user.routes');
const PostRouter = require('./routes/post.routes');
app.use(cookie());
app.use(express.json())
require("dotenv").config();
app.use("/user" , UserRouter)
app.use("/post" , PostRouter)

app.listen(process.env.PORT , () =>{
    console.log("port 8090 is running");
    connect();
})