import{
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK,
    REMOVE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

//eslint-disable-next-line
export default (state, action) =>{
    switch(action.type){
        case PROJECT_TASKS:
            return{
                ...state,
                projectTasks:action.payload
            }
        case ADD_TASK:
            return{
                ...state,
                projectTasks:[action.payload, ...state.projectTasks],
                errorTask:false
            }
        case VALIDATE_TASK:
            return{
                ...state,
                errorTask:true
            }
        case REMOVE_TASK:
            return{
                ...state,
                projectTasks:state.projectTasks.filter(task=>task._id!==action.payload)
            }
        case UPDATE_TASK:
            return{
                ...state,
                projectTasks:state.projectTasks.map(task=>task._id===action.payload._id ? 
                    action.payload:task)
            }
        case CURRENT_TASK:
            return{
                ...state,
                selectedTask:action.payload
            }
        case  CLEAN_TASK:
            return{
                ...state,
                selectedTask:null
            }
        default:
            return state
    }
}