import {useState, useContext, useEffect} from 'react'
import  {Link, useNavigate} from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const NewAccount = () => {

    //Get values from context
    const alertContext =useContext(AlertContext)
    const {alert, showAlert}=alertContext

    const authContext=useContext(AuthContext)
    const {message, authenticated, registerUser}=authContext
    const navigate=useNavigate();

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
        name:'',
        email:'',
        password:'',
        confirm:''
    })
    //get user
    const {name, email, password, confirm} = user

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
        if(name.trim()==='' || email.trim()==='' || password.trim()==='' ||
        confirm.trim()===''){
            showAlert('All fields are required', 'alerta-error')
            return
        }
        //Password must be 6 characters at least
        if(password.length < 6){
            showAlert('Password must be at least 6 characters', 'alerta-error')
            return
        }
        //verify  passwords are the same
        if(password !== confirm){
            showAlert('The passwords do not match', 'alerta-error')
            return
        }

        //take it to action
        registerUser({
            name,
            email,
            password
        })


    }

    return (
       <div className="form-usuario">
           {alert ? (<div className={`alerta ${alert.category}`}>
               {alert.msg}
           </div>):null}
           <div className="contenedor-form">
               <h1>New Account</h1>
               <form
                    onSubmit={onSubmit}
               >
                   <div className="campo-form">
                       <label htmlFor="name">
                            Name
                       </label>
                       <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={name}
                            onChange={onChange}
                       />
                   </div>
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
                       <label htmlFor="comfirm">
                           Confirm Password
                       </label>
                       <input
                            type="password"
                            id="comfirm"
                            name="confirm"
                            placeholder="Confirm your password"
                            value={confirm}
                            onChange={onChange}
                       />
                   </div>
                   <div className="campo-form">
                       <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Register"
                       />

                   </div>
               </form>
               <Link to={'/'} className="enlace-cuenta">
                   Go back to log in
               </Link>
           </div>
       </div>
    );
};

export default NewAccount;