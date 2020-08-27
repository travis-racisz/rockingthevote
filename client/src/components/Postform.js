import React, { useState } from "react"



function Postform(props){ 
    const user = JSON.parse(localStorage.getItem('user'))
    const {addPost, toggle, handleEdit, post} = props
   

    const initialInputs = { 
        title: post?.title || "", 
        description: post?.description || "",
        username: user?.username, 
        date: user?.datePosted
    }

    
    const [inputs, setInputs] = useState(initialInputs)
    
 

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){ 
      e.preventDefault()
      addPost(inputs)
      setInputs(initialInputs)
  }

  const {title, description} = inputs


     return (
     <div className = "profile">
         {/* <h1>Welcome {user.username}</h1> */}
         <div className = "new-post-form">
             {/* <h2>add new post!</h2> */}
             <input type = "text" placeholder = "title" value = {title} name = "title" onChange = {handleChange} className = "post-title"></input>
             <textarea type = "text" placeholder = "description" value = {description} name = "description" onChange = {handleChange} className = "post-title" ></textarea>
             {!toggle ? 
             <button onClick = {handleSubmit}>Submit</button>
             :
             <>
             <button onClick = {() => handleEdit(post._id, inputs)}>Submit edit</button>
             </>
            }
         </div>
     </div>
     )
}

export default Postform