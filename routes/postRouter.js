const express = require('express')
const postsRouter = express.Router()
const Posts = require("../../rockingthevote/model/Posts.js")
const Comment = require("../../rockingthevote/model/Comments.js")




// postsRouter.get("/users"), (req, res, next) => { 
//     Posts.find({user: req.user._id})
// }



// gets all posts, route will probably need to be updated
postsRouter.get("/posts", (req, res, next) => { 
    Posts.find((err, posts) => { 
        if(err){ 
            res.status(500)
            return(next(err))
        } res.status(200).send(posts)
    })
})

//get comments by user 
// postsRouter.get("/user/comments", (req, res, next) => { 
//     Comment.find({user: req.user._id}, (err, comments) => { 
//         if(err){ 
//             res.status(500)
//             return next(err)
//         }
//             res.status(200).send(comments)
//     })
// })


//get posts by user
postsRouter.get("/user", (req, res, next) => { 
    Posts.find({user: req.user._id}, (err, post) => { 
        if(err){ 
            res.status(500)
            return next(err)
        }
            res.status(200).send(post)
    })
})

// add a new post 
postsRouter.post("/", (req, res, next) => { 
    req.body.user = req.user._id
    const newPost = new Posts(req.body)
    newPost.save((err, savedPost) => { 
        if(err){ 
            res.status(500) 
            return(next(err))
        }
        res.status(201).send(savedPost)
    })
})
// update a post
postsRouter.put("/:postId", (req,res,next) => { 
    Posts.findOneAndUpdate({_id: req.params.postId, user: req.user._id}, 
        req.body, 
        (err, updatedPost) => { 
            if(err){ 
                res.status(500)
                return(next(err))
            } 
            return res.status(200).send(updatedPost)
    })
})
// like a post
postsRouter.put("/like/:postId", (req, res, next) => { 
    Posts.findById(req.params.postId, (err, post) => {
       const fPost = post.liked.includes(req.user._id)
        console.log(fPost)
            if(!fPost) { 
                console.log(post)
                Posts.findOneAndUpdate({_id: req.params.postId }, 
                    {$inc: {likes: 1}, $push:{liked: req.user._id}}, 
                    {new: true},
                    (err, updatedPost) => { 
                        if(err){ 
                            res.status(500)
                            return next(err)
                        } else { 
                            console.log(123, updatedPost)
                            res.status(200).send(updatedPost)
                        }
                    })
                } else if(fPost){ 
                    Posts.findOneAndUpdate({_id: req.params.postId}, 
                        {$inc: {likes: -1}, $pull: {liked: req.user._id}}, 
                        {new: true},
                        (err, updatedPost) => { 
                            if(err) {
                                res.status(500)
                                return next(err)
                            } else { 
                                console.log(111, updatedPost)
                                return res.status(200).send(updatedPost)
                            }
                        })
                }
            })
        })
    
    // postsRouter.get("/:Id", (req, res, next) => { 
    //     Posts.findById(req.params.Id, (err, posts) => { 
    //         if(err){ 
    //             res.status(500)
    //             return next(err)
    //         } else { 
    //             return res.status(200).send(posts)
    //         }
    //     })
    // })

// //dislike a post

// postsRouter.put("/dislike/:postId", (req, res, next) => { 
//     Posts.findOneAndUpdate({_id: req.params.postId}, 
//         {$inc: {likes: -1}}, 
//         (err, updatedPost) => { 
//             if(err){ 
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(updatedPost)
//         })
// })

//get comments 

postsRouter.get("/words", (req, res, next) => { 
    console.log("comments")
    Comment.find((err, comments) => { 
        if(err){ 
            console.log("error")
            res.status(500)
            return(next(err))
        }
            console.log(comments)
         return res.status(200).send(comments)
    })
})
//add a comment 

postsRouter.post("/comment", (req, res, next) => { 
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedPost) => { 
        if(err){ 
            res.status(500) 
            return(next(err))
        }
        res.status(201).send(savedPost)
    })
})

postsRouter.put("/comment/:postId", (req, res, next) => { 
    //create an updated array of comments
    Comment.findOneAndUpdate({_id: req.params.postId, user:req.user_.id}, req.body, (err, updatedPost) => { 
            if(err){ 
                res.status(500)
                return next(err)
            }
            console.log(req.body)
            return res.status(200).send(updatedPost)
        })
})
// delete a post
postsRouter.delete("/:postId", (req, res, next) => { 
    Posts.findOneAndDelete({_id: req.params.postId, user: req.user._id}, (err, deletedPost) => { 
        if(err){ 
            res.status(500)
            return(next(err))
        } 
        res.status(200).send(`successfully deleted ${deletedPost.title}`)
    })
})

module.exports = postsRouter