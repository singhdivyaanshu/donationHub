const post = require('../models/postSchema');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');



exports.createPost = async (req, res) => {
    
    const { postTitle, postContent, amountRequired,token,imageLink,docLink } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.status(401).json({
                msg: "Invalid Token", 
                errMsg: err.message
            })
        } else {
            const user = await User.findById(decoded._id);
            // console.log(decoded);
            if(user.postID===""){

                const newpost = new post({
                    userID: user._id,
                    date: new Date(),
                    imageLink,
                    docLink,
                    state: user.state,
                    postTitle,
                    postContent,
                    amountRequired,
                    amountCollected: 0
                })
                newpost.save((err, doc) => {
                    if (err) {
                        res.status(200).send({
                            msg: "Failed !",
                            errMsg: err.message
                        })
                    } else {
                        User.findByIdAndUpdate(user._id, {postID: doc._id}, (err, user) => {
                            if (err) {
                                res.status(200).send({
                                    msg: "Failed !",
                                    errMsg: err.message
                                })
                            } else {
                                res.status(200).send({
                                    msg: "Post created successfully Sucess"
                                })
                            }
                        })
                    }
                })
            }
            else{
                res.status(200).send({
                    msg: "You have already created a post ! Please update your previous post ",
                })
            }
        }
    }) 
}

exports.updatePost = async (req, res) => {
    const { postTitle, postContent, amountRequired,token,imageLink,driveLink } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.status(401).json({
                msg: "Invalid Token", 
                errMsg: err.message
            })
        } else {
            const user = await User.findById(decoded._id);
            if(user.postID===""){
                res.status(200).send({
                    msg: "You have not created a post ! Please create a post first ",
                })
            }
            else{
                post.findByIdAndUpdate(user.postID, {postTitle, postContent, amountRequired,imageLink,driveLink}, (err, doc) => {
                    if (err) {
                        res.status(200).send({
                            msg: "Failed !",
                            errMsg: err.message
                        })
                    } else {
                        res.status(200).send({
                            msg: "Post updated successfully Sucess"
                        })
                    }
                })
            }
        }
    }) 
}

exports.getuserPost = async (req, res) => {
    const {token} = req.body;
    // console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.status(401).json({
                msg: "Invalid Token", 
                errMsg: err.message
            })
        } else {
            const user = await User.findById(decoded._id);
            if(user.postID===""){
                res.status(200).send({
                    msg: "You have not created a post ! Please create a post first ",
                })
            }
            else{
                post.findById(user.postID, (err, doc) => {
                    if (err) {
                        res.status(200).send({
                            msg: "Failed !",
                            errMsg: err.message
                        })
                    } else {
                        res.status(200).send({
                            msg: "Post fetched successfully Sucess",
                            data: doc
                        })
                    }
                })
            }
        }
    }) 
}

exports.getPosts = async (req, res) => {
    const {state,amountRequired} = req.body;
    post.find({state:state,amountRequired:{$gte:amountRequired}},null,{limit:20},(err, doc) => {
        if (err) {
            res.status(200).send({
                msg: "Failed !",
                errMsg: err.message
        })}
        else{
            res.status(200).send({
                msg: "Post fetched successfully Sucess",
                data: doc
            })

        }

    })
}