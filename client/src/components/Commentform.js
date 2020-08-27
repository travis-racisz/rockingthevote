import React, { useState } from "react"


function Commentform(props){ 
    const { addComment, _id, setToggle } = props
    const user = JSON.parse(localStorage.getItem('user'))
    
    
    const initState = { 
        comment: [],
        username: user.username,
        user: user._id,
        post: _id
    }
    
    const [inputs, setInputs] = useState(initState)


    function handleChange(e){ 
      const  {name, value} = e.target
      setInputs(prev => ({ 
        ...prev, 
        [name]: value
      }))
}

    function handleEdit(_id, inputs){ 
        addComment(inputs)
        setInputs(initState)
        setToggle((prev) => prev = !prev)
    }

    const { comment } = inputs
    

    return(
        <div className = "auth">
            <input type = "text" placeholder = "comment" name = "comment" value ={comment} onChange ={handleChange} onSubmit = {addComment}></input>
            <button onClick = {() => handleEdit(_id, inputs)}>Submit</button>
        </div> 
    )
}

export default Commentform