import React, { useContext } from "react"
import Posts from "./Posts"
import { UserContext } from "../context/UserContext"


function Postlist(props){ 
    // const {posts} = props
    const { posts } = useContext(UserContext)
    // console.log(posts)
    return (
    <div className = "profile"> 
        <h1 className = "title-text">Your Posts</h1>
        {posts.map(post => <Posts {...post} key = {post._id} />)}
    </div>
    )
}

export default Postlist