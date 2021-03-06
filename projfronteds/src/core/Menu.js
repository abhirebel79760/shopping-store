import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'


const currentTab= (history, path) =>{
    if (history.location.pathname === path) {
        return {color: "#3ecc72"}
    } else {
        return{ color: "#FFFFFF"}
    }
}


const Menu=({ history, path }) => {
    return (
        <div>
            
            <ul className="nav nav-dark bg-dark">
            {isAuthenticated()&& (
                <Fragment>
                    <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">HOME</Link>
                </li>
                <li className="nav-item">
                <Link style={currentTab(history,"/cart")} 
                className="nav-link" to="/cart">cart</Link>
                </li>
                    <li className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")} 
                    className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>
                
                <li className="nav-item">
                    <span
                        onClick={()=>{
                            signout(() =>{
                                history.push("/")
                        })
                    }} 
                    className="nav-link text-warning">Signout
                    </span>
                    </li>
                
                
                </Fragment>
            )}
                {!isAuthenticated()&& (
                <Fragment>
                <li className="nav-item">
                <Link style={currentTab(history,"/singup")} 
                className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                <Link style={currentTab(history,"/singin")} 
                className="nav-link" to="/signin">Signin</Link>
                </li>
                </Fragment>
               )}
                
            </ul>

        </div>
    )
}


export default withRouter(Menu);