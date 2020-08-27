const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
require("dotenv").config()
const path = require("path")

const port = process.env.PORT || 9000;



// connects to database on local machine, need to update to atlas cloud cluster
mongoose.connect(process.env.URI,{ 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true, 
    useFindAndModify:false,
}, () => console.log("Database is connected"))

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))


// need to set up routes
app.use("/auth", require("./routes/authRouter.js"))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/posts", require("./routes/postRouter.js"))

//error handler 

app.use((err, req, res, next) => {
    console.log(err.message)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => { 
    console.log("database connecting....")
})