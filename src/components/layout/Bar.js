import {useNavigate} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import AuthContext from "../../context/authentication/authContext"

const Bar = () => {
    
    //get authenticated user data
    const authContext=useContext(AuthContext)
    const {user, getAuthenticatedUser, logOut}=authContext
  
    useEffect(()=>{
        getAuthenticatedUser()
        // eslint-disable-next-line
    },[])

    const navigate=useNavigate()
    //close session
    const closeSession=()=>{
        logOut()
        navigate('/')
    }
    
    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hello <span>{user.name}</span>
            </p>: null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={closeSession}
                >
                    Log out
                </button>
            </nav>
        </header>
    );
};

export default Bar;