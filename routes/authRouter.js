const express = require('express')
const authRouter = express.Router()
const User = require('../model/Users.js')
const jwt = require("jsonwebtoken")


authRouter.post("/signup", (req, res, next) => { 
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => { 
        console.log("fired")
        if(err){ 
            res.status(500)
            return (next(err))
        }
        if(user){ 
            res.status(403)
            return (next(new Error("Username is already taken")))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => { 
            if(err){ 
                res.status(500)
                return (next(err))
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
    console.log("firing")
})
authRouter.post("/login", (req, res, next) => { 
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => { 
        if(err){ 
            res.status(500)
            return (next(err))
        }
        if(!user){ 
            res.status(500)
            return(next(new Error("Username or Password are incorrect")))
        }
        user.isMatch(req.body.password, (err, isMatch) => { 
            if(err){ 
                res.status(500)
                return next(err)
            }
            if(!isMatch){
                res.status(403)
                return next(new Error("Username or Password are incorrect"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            res.status(201).send({token, user: user.withoutPassword()})
        })
    })
})

module.exports = authRouter