import {useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'

import axiosClient from '../../config/axios'
import tokenAuth from '../../config/token'

import { 
    SUCCESS_REGISTER,
    ERROR_REGISTER,
    GET_USER,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOG_OUT
 } from "../../types"

 const AuthState=props=>{
    const initialState={
        token:localStorage.getItem('token'),
        authenticated:false,
        user:null,
        message:null,
        loading:true
    }
    const [state, dispatch]=useReducer(AuthReducer, initialState)

    //Functions
    const registerUser=async data=>{
        try{
            const response=await axiosClient.post(`/api/users`, data)
            // console.log(response.data)

            dispatch({
                type:SUCCESS_REGISTER,
                payload:response.data
            })
            //Get user 
            getAuthenticatedUser()
        }catch(error){
           // console.log(error.response.data.msg)
            const alert={
                msg:error.response.data.msg,
                category:'alerta-error'
            }

            dispatch({
                type:ERROR_REGISTER,
                payload:alert
            })
        }
    }
    //return  authenticated user
    const getAuthenticatedUser=async() => {
        const token =localStorage.getItem('token')
        if(token){
            //send token
            tokenAuth(token)
        }
        try{
          const response =await axiosClient.get(`/api/auth`)
          console.log(response)
          dispatch({
            type:GET_USER,
            payload:response.data.user
          })   
        }catch(error){
            dispatch({
                type:ERROR_LOGIN
            })
        }
    }
    //When the user logs in
    const logIn = async data => {
        try{
            const response=await axiosClient.post(`/api/auth`, data)
            dispatch({
                type:SUCCESS_LOGIN,
                payload: response.data
            })
            //Get user 
            getAuthenticatedUser()        
        }catch(error){
            console.log(error.response.data.msg)
            const alert={
                msg:error.response.data.msg,
                category:'alerta-error'
            }

            dispatch({
                type:ERROR_LOGIN,
                payload:alert
            })
        }
    }
    //Close the session
    const logOut=()=>{
        dispatch({
            type:LOG_OUT
        })
    }
    return(
        <AuthContext.Provider
            value={{
                token:state.token,
                authenticated:state.authenticated,
                user:state.user,
                message:state.message,
                loading:state.loading,
                registerUser,
                logIn,
                getAuthenticatedUser,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
 }
 export default AuthState