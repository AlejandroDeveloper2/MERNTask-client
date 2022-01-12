import {useState, useContext, useEffect} from 'react'
import  {Link, useNavigate} from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const Login = () => {

    //Get values from context
    const alertContext =useContext(AlertContext)
    const {alert, showAlert}=alertContext
 
    const authContext=useContext(AuthContext)
    const {message, authenticated, logIn}=authContext
    const navigate=useNavigate();
    //In case of user or password don't exist'
    useEffect(()=>{
        if(authenticated){
            navigate('/projects')
        }
        if(message){
            showAlert(message.msg, message.category)
        }
    // eslint-disable-next-line
    },[message, authenticated])

    //state to log in
    const [user, setUser]=useState({
        email:'',
        password:''
    })
    //get user
    const {email, password} = user

    const onChange=e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    //when the user wants to log in
    const onSubmit=e=>{
        e.preventDefault()

        //validate the fields aren't empty
        if(email.trim()==='' || password.trim()===''){
            showAlert('All fields are required', 'alerta-error')           
        }
        //take it to action
        logIn({email, password})
    }

    return (
       <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>
               {alert.msg}
           </div>):null}
           <div className="contenedor-form">
               <h1>Login</h1>
               <form
                    onSubmit={onSubmit}
               >
                   <div className="campo-form">
                       <label htmlFor="email">
                            Email
                       </label>
                       <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={onChange}
                       />
                   </div>
                   <div className="campo-form">
                       <label htmlFor="password">
                            Password
                       </label>
                       <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={onChange}
                       />
                   </div>
                   <div className="campo-form">
                       <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="log in"
                       />

                   </div>
               </form>
               <Link to={'/new-account'} className="enlace-cuenta">
                   Create your account
               </Link>
           </div>
       </div>
    );
};

export default Login;