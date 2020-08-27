import React, { useContext } from "react"
import "../css/styles.css"
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext"

function Navbar(){ 
    const {logout} = useContext(UserContext)
    return( 
            <div className = "nav-buttons">
                <Link className = "nav-links" exact to = "/profile" >Profile</Link>
                <Link className = "nav-links" exact to = "/public">Public</Link>
                <button onClick = {logout}>Logout</button>
            </div>
        )
}


export default Navbar