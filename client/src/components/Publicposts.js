import React, { useState } from "react"
import Commentform from "./Commentform"



function Publicposts(props){ 
    const userId = JSON.parse(localStorage.getItem("user"))
    const {title, description, username, addComment, comments, _id, likes, sendLike, liked: likedPost} = props
    const hasLiked = likedPost.includes(userId._id)
    const [toggle, setToggle] = useState(true)
    const [liked, setLiked] = useState(hasLiked)
    
    

    function handlelike(){ 
        setLiked(prev => !prev)
        console.log(hasLiked)
        let likeObj = {likes: likes , title: title, description: description, username: username, userId: userId._id  }
        sendLike(_id, likeObj)
    }

    


    return( 
        <div className = "posts"> 
            <p>posted by</p> 
            <h2>{username}</h2>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>likes: {likes}</p>


            <button onClick = {() => setToggle(prev => !prev)}>Comment</button>
            <button onClick = {handlelike} style = {liked ? {color: "rgb(17, 132, 204)"} : {backgroundColor: "#4A4A4A"}}>Like</button>
            {!toggle ?
            <>
            <button onClick = {() => setToggle(prev => prev = !prev)}>See Comments</button>
            <Commentform addComment = {addComment} _id = {_id} comments = {comments} setToggle = {setToggle} />
            </>
            :
            <div>
                <button onClick = {() => setToggle(prev => prev = !prev)}>Hide Comments</button>
                
                {comments[0] && comments.map(comment => comment.post === _id && <p>{comment.username}: {comment.comment}</p>)}
            </div>
        }
       
        </div>
    )
}

export default Publicposts