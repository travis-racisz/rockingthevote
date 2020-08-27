import React, { useContext, useState } from "react"
import Authform from "./Authform.js"
import { UserContext } from "../context/UserContext"


function Auth(){ 
    const initalInputs = {username: "", password: ""}
    const {signUp, login, errMsg, toggle, handleToggle} = useContext(UserContext)
    const [inputs, setInputs] = useState(initalInputs)
   
    function handleLogin(e){ 
        e.preventDefault()
        login(inputs)
      
    }

    function handleSignUp(e){ 
        e.preventDefault()
        signUp(inputs)
    }

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }
    
    return(
        <div className = "login-container">
            <div>
                {!toggle ? 
                <>
                <Authform
                    handleSubmit = {handleSignUp}
                    handleChange = {handleChange}
                    btnText = {"sign up"}
                    inputs = {inputs}
                    errMsg = {errMsg}    
                />
                </>
                : 
                <>
                <Authform 
                    handleSubmit = {handleLogin}
                    handleChange = {handleChange}
                    btnText = {"login"}
                    inputs = {inputs}
                    errMsg = {errMsg}
                        />
                </>
                }
        </div>
    </div>
    )
}

export default Auth