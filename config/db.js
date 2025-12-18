const mongoose = require("mongoose");

const connect = async() =>{
    await mongoose.connect(process.env.DB_LINK)
    console.log("connected to db");
}

module.exports = connect;