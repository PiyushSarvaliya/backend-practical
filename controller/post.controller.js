const Post = require("../models/post.schema")

const Createpost = async (req, res) => {
    try {
        let { caption } = req.body
        console.log(req.user.UserId)
        let data = {
            userId: req.user.UserId,
            caption: caption
        }

        let post = await Post.create(data)
        res.json({ msg: "post successfully created", post: post })
    } catch (error) {
        res.json(error)
    }
}

const getpost = async (req, res) => {
    try {
        let limit = req.query.limit || 3
        let skip = req.query.skip || 0

        let post = await Post.find().limit(limit).skip(skip)
        res.json(post)
    } catch (error) {
        res.json(error)
    }
}

const increaselike = async (req, res) => {
    try {
        let { id } = req.params

        let post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
        res.json(post)

        if (!post) {
            {
                res.json({ msg: "post not found" })
            }
        }
    } catch (error) {
        res.json(error)
    }
}

const Fetchuserpost = async (req, res) => {
    try {
        let {userId} = req.params

        let post = await Post.find({userId : userId})
        res.json({msg : userId , post } )
    } catch (error) {
        res.json(error)
    }
}

module.exports = { Createpost, getpost, increaselike , Fetchuserpost}