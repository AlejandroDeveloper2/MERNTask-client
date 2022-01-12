import {useContext} from 'react'
import taskContext from '../../context/tasks/taskContext'
import projectContext from '../../context/projects/projectContext'

const Task = ({task}) => {

    //Get form's state
    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    //Array destructuring for getting the current project
    const[currentProject]=project

    const tasksContext = useContext(taskContext)
    const{removeTask, getTasks,updateTask ,setCurrentTask}=tasksContext

    //Function to remove task selected
    const deleteTask=id=>{
        removeTask(id, currentProject._id)
        getTasks(currentProject.id)
    }
    //Function for changing the status of a  selected task
    const changeStatus=task=>{
        if(task.status){
            task.status=false
        }else{
            task.status=true
        }
        updateTask(task)
    }
    //Add a Current Task when the user needs to update it
    const selectTask=task=>{
        setCurrentTask(task)
    }
    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {
                task.status 
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=>changeStatus(task)}
                        >
                            Done
                        </button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=>changeStatus(task)}
                        >
                            Uncomplete
                        </button>
                    )
                        
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>selectTask(task)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>deleteTask(task._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;