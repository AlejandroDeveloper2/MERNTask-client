import {useReducer} from 'react'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'

import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    REMOVE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

import axiosClient from '../../config/axios'

const TaskState=props=>{
    const initialState={
        projectTasks:[],
        errorTask:false, 
        selectedTask:null
    }
    //Create dispatch and state
    const[state, dispatch]=useReducer(TaskReducer, initialState)
    //functions
    //Get all project's tasks
    const getTasks=async project=>{
        try{
            const response = await axiosClient.get('/api/tasks', {params:{project}})
            console.log(response)
            dispatch({
                type:PROJECT_TASKS,
                payload:response.data.tasks
            })
        }catch(error){
            console.log(error)
        }
    } 
    //Add a new task to selected project
    const addTask=async task=>{
        try{
            const response=await axiosClient.post('/api/tasks', task)
            console.log(response)

            dispatch({
                type: ADD_TASK,
                payload:task
            })
        }catch(error){
            console.log(error)
        }
    }
    //Validate and show an error
    const validateTask=()=>{
        dispatch({
            type:VALIDATE_TASK
        })
    }
    //Remove a task through id from selected project
    const removeTask=async (id, project)=>{
        try{
            await axiosClient.delete(`/api/tasks/${id}`, {params:{project}})
            dispatch({
                type: REMOVE_TASK,
                payload:id
            })

        }catch(error){
            console.log(error)
        }
    }
    //Function changes status of each task 
    // const changeStatusTask=task=>{
    //     dispatch({
    //         type: STATUS_TASK,
    //         payload:task
    //     })
    // }
    //Get a task to edit it
    const setCurrentTask=task=>{
        dispatch({
            type:CURRENT_TASK,
            payload:task
        })
    }
    //Edit a task
    const updateTask=async task=>{
        try{
            const response=await axiosClient.put(`/api/tasks/${task._id}`, task)
            console.log(response)
            dispatch({
                type:UPDATE_TASK,
                payload:response.data.task
            })
        }catch(error){
            console.log(error)
        }
    }
    //Delete the selected task
    const cleanTask=()=>{
        dispatch({
            type:CLEAN_TASK,
        })
    }
    return(
        <TaskContext.Provider
            value={{
                projectTasks:state.projectTasks,
                errorTask:state.errorTask,
                selectedTask:state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                removeTask,
                setCurrentTask,
                updateTask,
                cleanTask        
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskState