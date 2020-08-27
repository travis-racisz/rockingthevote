import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Postform from "./Postform"



function Posts(props){ 
    const {title, description, _id} = props
    const { deletePost, editPost } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)

    // useEffect(() => { 
    //     console.log("fired")
    // },[posts])

 


  //function handleEdit(_id, inputs){ 
   //   editPost(_id, inputs)
    //   console.log(_id ,inputs)
 // }
 

    return(
        <div className ="posts">
            <h1 className = "title-text">{title}</h1>
            <h3>{description}</h3>
            <button onClick = {() => deletePost(_id)} style = {{color: "red"}}>Delete</button>
            {!toggle ? 
            <button onClick = {() => setToggle(prev => !prev)}>Edit</button>
            :
            <>
             {/* <input type = "text" placeholder = "title" value = {title} name = "title" onChange = {handleChange} ></input>
             <input type = "text" placeholder = "description" value = {description} name = "description" onChange = {handleChange} ></input> */}
             <Postform handleEdit = {editPost} toggle = {toggle} post = {{title, description, _id}} />
             <button style = {{color: "red"}} onClick = {() => setToggle(prev => !prev)}>X</button>
             
            </>
            }
        </div>
    )
}

export default Posts