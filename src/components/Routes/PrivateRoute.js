//import {useContext} from 'react'
import { useLocation, Navigate } from "react-router-dom"
//import AuthContext from'../../context/authentication/authContext'

const PrivateRoute = ({ children }) => {
   
    let token = localStorage.getItem("token")
    let location=useLocation()
    if(!token){
      return (
        <Navigate to="/" state={{ from: location }}/>
      );
    }
    return children;
  };
  
  export default PrivateRoute;