import {
    PROJECT_FORM, 
    GET_PROJECT,
    ADD_PROJECTS, 
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    ERROR_PROJECT
} from '../../types'
//eslint-disable-next-line
export default (state, action)=>{
    switch(action.type){
        case PROJECT_FORM:
            return{
                ...state,
                form:true
            }
        case GET_PROJECT:
            // console.log(action.payload)
            return{
                ...state,
                projects:action.payload
            }
        case ADD_PROJECTS:
            return{
                ...state,
                projects:[...state.projects, action.payload],
                form:false,
                errorform:false
            }
        case VALIDATE_FORM:
            return{
                ...state,
                errorform:true
            }
        case CURRENT_PROJECT:
            return{
                ...state,
                project:state.projects.filter(project=> project._id===action.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects:state.projects.filter(project=> project._id!==action.payload),
                project:null
            }
        case ERROR_PROJECT:
            return{
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}