import React, { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import Publicposts from "./Publicposts"


function Publicpostlists(){ 
    const {allPosts, addComment, comments, sendLike, removeLike}  = useContext(UserContext)
    const sortedPosts = allPosts?.sort((a,b) => (a.likes < b.likes ? 1 : -1)) 
    return (
        <div className = "profile"> 
            {sortedPosts?.map(post => 
            <Publicposts 
            allPosts = {allPosts} 
            {...post} 
            key = {post.datePosted} 
            addComment = {addComment} 
            comments = {comments} 
            sendLike = {sendLike} 
            removeLike = {removeLike} />)}
        </div>
    )
}


export default Publicpostlists