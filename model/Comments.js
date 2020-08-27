const mongoose = require("mongoose")
const Schema = mongoose.Schema


const CommentSchema = new Schema({ 
    comment: { 
        type: String, 
        required: true
    }, 
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    username: { 
        type: String, 
        required: true
    },
    post:{ 
        type: Schema.Types.ObjectId,
        ref: "Posts", 
        required: true
    },
    createdOn: { 
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model("Comments", CommentSchema)