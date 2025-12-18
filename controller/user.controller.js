const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');

const Resgister = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let data = await User.findOne({ email: email })

        if (data) {
            res.json("email is already exist")
        }
        else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.json(err)
                }
                else {
                    let fill = {
                        name: name,
                        email: email,
                        password: hash
                    }
                    const data = await User.create(fill)
                    let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
                    res.cookie("token", token).json({ msg: "user registered successfully", token: token })
                }
            })
        }
    } catch (error) {
        res.json(error)
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let data = await User.findOne({ email: email })

        if (data) {
            bcrypt.compare(password, data.password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET)
                    res.cookie("token", token).json({ msg: "login successful"  , token: token })
                }
                else {
                    res.json("password is incorrect")
                }
            })
        }
        else {
            res.json("email is not registered")
        }
    } catch (error) {
        res.json(error)
    }
}


const Profile = async (req , res) =>{
    try {
        const profile = await User.findById(req.user.UserId)
        res.json({msg: "profile " , profile :profile})
    } catch (error) {
        res.json(error)
    }
}
module.exports = { Resgister , login , Profile }    