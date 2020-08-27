import React, {useContext} from "react"
import { UserContext } from "../context/UserContext"


function Authform(props){ 
    const {handleChange, handleSubmit, btnText, inputs: {
        username, password
    } ,errMsg} = props

    const {handleToggle, toggle} = useContext(UserContext)

    
    
    
    return (
        
        <div className = "auth">
            <form onSubmit = {handleSubmit} className = "auth-form">
            <h1 style = {{color: "rgb(176, 179, 184)" , marginBottom: "35pt"}}>Rock The Vote!</h1>
                <input 
                    className = "dark-inputs"
                    type = "text"
                    placeholder = "Username"
                    name = "username" 
                    value = {username}
                    onChange ={handleChange} />

                <input 
                    type = "password"
                    placeholder = "Password"
                    name = "password"
                    value = {password}
                    onChange = {handleChange} />
                    <button onClick = {handleSubmit}>{btnText}</button>
                    <p style = {{color: "red"}}>{errMsg}</p>
                    {!toggle ? <p onClick = {handleToggle}>already a member? login</p> : <p onClick = {handleToggle}>not a member? sign up </p>}
                    
            </form>
            
        </div>
    )
}

export default Authform