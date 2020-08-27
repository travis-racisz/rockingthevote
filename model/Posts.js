const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PostSchema = new Schema({ 
    title:{ 
        type: String, 
        required: true, 
    }, 
    description:{ 
        type: String, 
        required: false, 
    }, 
    datePosted: { 
        type: Date, 
        default: Date.now
    }, 
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    username: { 
        type: String, 
        required:true
    }, 
    likes: {
        type: Number, 
        default: 0
    }, 
    liked: [
        {type: Schema.Types.ObjectId, ref: "User"  } 
        
    ]
})


module.exports = mongoose.model("Posts", PostSchema)