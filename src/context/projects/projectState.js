import {useReducer} from 'react'

import projectContext from "./projectContext"
import projectReducer from "./projectReducer"
import {
    PROJECT_FORM, 
    GET_PROJECT, 
    ADD_PROJECTS, 
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    ERROR_PROJECT
} from '../../types'

import axiosClient from '../../config/axios'

const ProjectState=props=>{

    const initialState={
        projects:[],
        form:false,
        errorform:false,
        project:null,
        message:null
    }
    //Dispatch to run the actions
    const [state, dispatch] = useReducer(projectReducer, initialState)
    //Set of fuctions for CRUD
    const showForm =()=>{
        dispatch({
            type: PROJECT_FORM
        })
    }
    //Get projects
    const getProjects =async()=>{
       try{
            const response = await axiosClient.get('/api/projects')

            dispatch({
                type:GET_PROJECT,
                payload:response.data.projects
            })
        }catch(error){
            const alert={
                msg:'An error occurred while getting',
                category:'alerta-error'
            }
            dispatch({ 
                type:ERROR_PROJECT,
                payload:alert
            })
        }
    }
    //Add new project
    const addProject =async project=>{
        try{
            const response=await axiosClient.post('api/projects', project);
            //console.log(response)
            // Insert project  in the state
            dispatch({
                type:ADD_PROJECTS,
                payload:response.data
            })
        }catch(error){
            const alert={
                msg:'An error occurred while adding',
                category:'alerta-error'
            }
            dispatch({ 
                type:ERROR_PROJECT,
                payload:alert
            })
        }
        
    }
     //validate the form
    const showError =()=>{
       dispatch({
           type:VALIDATE_FORM
       })
    }
    //Select project which user clicked
    const selectCurrentProject =projectId=>{
        dispatch({
            type:CURRENT_PROJECT,
            payload:projectId
        })
    }
    //Delete a project
    const deleteProject =async projectId=>{
        try{
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type:DELETE_PROJECT,
                payload:projectId
            })
        }catch(error){
            const alert={
                msg:'An error occurred while deleting',
                category:'alerta-error'
            }
            dispatch({ 
                type:ERROR_PROJECT,
                payload:alert
            })
        }
    }
    return(
        <projectContext.Provider
            value={{
                projects:state.projects,
                form:state.form,
                errorform:state.errorform,
                project:state.project,
                message:state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                selectCurrentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
export default ProjectState