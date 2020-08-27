import React, { useContext } from 'react';
import Navbar from "./components/navbar.js"
import {Switch, Route, Redirect} from "react-router-dom"
import Profile from "./components/Profile.js"
import Auth from "./components/Auth.js"
import { UserContext } from './context/UserContext';
import Public from "./components/Public"

function App() {
  const {token} = useContext(UserContext)
  return (
    <div>
       {token && <Navbar /> }
        <Switch>
                <Route exact path = "/" render ={() => token ? <Redirect to = "/profile/" /> : <Auth />} /> 
                <Route exact path = "/profile" render = {() => !token ? <Redirect to ="/" /> : <Profile />} />
                <Route exact path = "/public" render = {() => !token ? <Redirect to = "/" /> : <Public />} />
                
            </Switch>
    </div>
  );
}

export default App;
