import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"
import Postform from "./Postform"
import Postslist from "./Postslist.js"

function Profile(){ 
    const {addPost, posts} = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem('user'))

   return ( 
       <div  className = "profile">
        <h1 className = "title-text">Welcome {user?.username} </h1>
        <h2 className = "title-text">Add a new Post</h2>
            <Postform addPost = {addPost} /> 
            <Postslist posts = {posts} />
       </div>
   )
}

export default Profile